const ExcelJS = require('exceljs');
const path = require('path')
const readXlsxFile = require('read-excel-file/node')
const Task = require('../../models/tasks')
const { getPreview } = require('./index')

module.exports.duplicityProcess = async (data,username) => {
    const filesToProcess = await getFilesContent(data)
    

    //files are all the files in aray of objects

    const params = paramMerge(data.params)
    //divide 
    const rawDuplicityObject = await duplicityMarker(filesToProcess, params.columns)
    rawDuplicityObject.filesdata = filesAndSheetsData(filesToProcess)
    const newFiles = createFiles(rawDuplicityObject, params,username)

    return newFiles
}



/**
 * does the params for argumen
 */
const paramMerge = (params) => {
    const result = { columns: [] }
    for (const param in params) {

        if (param.search('column-') === 0) {
            let columnNumber = parseInt(param.replace('column-', ''))
            result.columns.push(columnNumber)
        } else {
            result[param] = params[param]
        }
    }
    return result
}

/**
 * returns the object of every file
 */

const getFilesContent = async (data) => {
    const Completedfiles = []
    const { files } = data
    for (let index = 0; index < files.length; index++) {
        const element = files[index];
        const sheet = await (getPreview(element))
        Completedfiles.push(sheet)
    }

    return Completedfiles
}


/**
 * returns object {unique,duplicates} with array of processed objects
 */
const duplicityMarker = async (files, colums) => {
    const nonDuplicates = []
    const duplicates = []
    var header = []
    files.map(file => {
        file.sheets.map((sheet) => {

            sheet.data.map((row, index) => {
                if (index == 0) {
                    //assing header
                    header = row
                } else {
                    const isUniqueValue = isDuplicate(nonDuplicates, row, colums)


                    if (isUniqueValue === true) {
                        const save = {
                            data: row,
                            file: file,
                            sheet: sheet,
                            occurrenceNum: 1
                        }
                        nonDuplicates.push(save)

                    } else {

                        const save = {
                            data: row,
                            file: file,
                            sheet: sheet,
                            occurrenceNum: isUniqueValue
                        }
                        duplicates.push(save)
                    }

                }

            })


        })


    })
    return {
        unique: nonDuplicates,
        duplicates: duplicates,
        header: header
    }

}

/**
 * accepts nonDuplicates array, row data, colums
 * returns true, if this row is not duplicate yet
 */

const isDuplicate = (nonDuplicates, row, columns) => {
    const rowText = comparisionString(row, columns)

    if (nonDuplicates.length == 0) return true

    for (let index = 0; index < nonDuplicates.length; index++) {
        const element = nonDuplicates[index];
        const nonDuplicateText = comparisionString(element.data, columns)

        if (nonDuplicateText === rowText) {
            return false
        }
    }

    return true

}

/**
 * makes string for colums suppose to be evaluated
 */

const comparisionString = (dataArray, columnArray) => {
    const compArray = []
    columnArray.map(el => {
        const text = String(dataArray[parseInt(el)])
        compArray.push(text.trim())

    })
    return JSON.stringify(compArray)
}




/**
 * handles the processed file creation
 */
const createFiles = async (dataObj, params,username) => {
    //basic workbook info
    const returnFiles = []
    const fileName = `${username}_${Math.floor(Date.now() / 1000)}`
    const filePath = './public/downloads/'
    const uniqueFileName = `${filePath}${fileName}.xlsx`
    const duplicitiesFileName = `${filePath}${fileName}_duplicity.xlsx`

    //unique files
    const workbook = newWB()
    const worksheet = workbook.addWorksheet('Sheet');
    worksheet.addRow(dataObj.header);
    dataObj.unique.forEach(element => {
        worksheet.addRow(element.data);
    });

    await workbook.xlsx.writeFile(uniqueFileName);
    returnFiles.push(uniqueFileName)

    //extra duplicity file
    if (params.mode == 'duplicities-extra-file') {

        const workbook = newWB()
        const worksheet = workbook.addWorksheet('Sheet');
        worksheet.addRow(dataObj.header);
        dataObj.duplicates.forEach(element => {
            worksheet.addRow(element.data);
        });

        await workbook.xlsx.writeFile(duplicitiesFileName);
        returnFiles.push(duplicitiesFileName)

    }
    const downloadLinks = returnFiles.map(el => {
        return el.replace('./public','')
    })
    return downloadLinks


}

/**
 * creates new workbook with properties
 */

const newWB = () => {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'No stress Office';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();
    return workbook
}

/**
 * creates data structure
 */
const filesAndSheetsData = (obj) => {

    const returnObj = []
    obj.map(el => {
        const objToPush = {
            fileid: el.fileid,
            originalName: el.originalName,
            sheets: []
        }
        el.sheets.map(sheet => {
            objToPush.sheets.push(sheet.sheetname)
        })
        returnObj.push(objToPush)
    })
    return returnObj
}