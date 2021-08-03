const ExcelJS = require('exceljs');
const searcher = require('./searcher')
const path = require('path')
const readXlsxFile = require('read-excel-file/node')
const History = require('../../models/histories')
const { getPreview } = require('./index')

module.exports.duplicityProcess = async (data) => {
    // console.log(data)
    const filesToProcess = await getFilesContent(data)


    //files are all the files in aray of objects
    const params = paramMerge(data.params)
    const rawDuplicityObject = duplicityMarker(filesToProcess, params.columns)
    return filesToProcess
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
 * 
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
                    console.log(isUniqueValue)

                    if (isUniqueValue === true) {
                        const save = {
                            data: row,
                            file: file,
                            sheet: sheet,
                            occurrenceNum: 1
                        }
                        nonDuplicates.push(save)

                    } else {
                        console.log('saving duplicate')
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
     console.log(`nonDuplicates :`)
      console.log(nonDuplicates)
      console.log(`duplicates :`)
     console.log(duplicates) 
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
        console.log(`${nonDuplicateText} - ${rowText}`)
        if (nonDuplicateText === rowText) {
            console.log('duplicate')
            return false
        }
    }

/* 
    nonDuplicates.forEach(element => {
        const nonDuplicateText = comparisionString(element.data, columns)
        console.log(`${nonDuplicateText} - ${rowText}`)
        if (nonDuplicateText === rowText) {
            console.log('duplicate')
            result = false
        }

    }) */
    return true

}


const comparisionString = (dataArray, columnArray) => {
    const compArray = []
    columnArray.map(el => {
        const text = String(dataArray[parseInt(el)])
        compArray.push(text.trim())

    })
    return JSON.stringify(compArray)
}


