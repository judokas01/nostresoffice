const ExcelJS = require('exceljs');
const path = require('path')
const readXlsxFile = require('read-excel-file/node')
const History = require('../../models/histories')


const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/**
 * gets preview for excel files
 * @param {*} fileObj 
 * @returns 
 */
const getPreview = async (fileObj,numberOfLines) => {

	const baseFolder = __dirname
	let filePath = path.normalize(`${baseFolder}/../../${fileObj.data.path}`)
	const workbook = new ExcelJS.Workbook();

	const output = await workbook.xlsx.readFile(`${filePath}`)
		.then(function () {

			const worksheets = workbook.worksheets
			const output = {
				fileid: fileObj.data.filename,
				originalName: fileObj.data.originalname,
				sheets: []
			}
			for (let index = 0; index < worksheets.length; index++) {

				const worksheet = worksheets[index];

				//output
				output.sheets.push({

					sheetname: worksheet.name,
					columns: worksheet.columnCount,
					rows: worksheet.rowCount,
					data: getPreviewData(worksheet, numberOfLines)
				})

			}
			return output

		})
	return output

}






/**
 * input is worksheet object, returns first 6 rows including header to preview this
 */
const getPreviewData = (worksheet, numberOfLines = worksheet.actualRowCount) => {

	const output = []
	for (let index = 1; index < numberOfLines; index++) {
		//console.log(`row : ${index}`)
		const row = worksheet.getRow(index);
		const rowData = []
		for (let index = 1; index < worksheet.columnCount + 1; index++) {
			//	console.log(`colum : ${index}`)
			rowData.push(row.getCell(index).value)

		}
		output.push(rowData)

	}
	return output

}

/**
 * compares if all givven file object has the same structure (number of columns and columns has the same column names)
 */
const compareStructure = async (files) => {

	let allFilesToProcess = []



	for (let index = 0; index < files.length; index++) {
		const element = files[index];
		const file = await History.findOne({
			'data.filename': element.data.filename
		})
		const result = await getPreview(file,6)
		allFilesToProcess.push(result)
	}

	let columnCheck = 0
	let columnTitleCheck = []



	for (let index = 0; index < allFilesToProcess.length; index++) {
		const file = allFilesToProcess[index];

		for (let index = 0; index < file.sheets.length; index++) {
			const sheet = file.sheets[index];
			if (columnCheck == 0) {
				columnCheck = sheet.columns
			}

			//column size check
			if (columnCheck != sheet.columns && sheet.columns != 0) {
				return { next: false, message: 'Listy mají rozdílný počet sloupců!' }
			}

			if (!columnTitleCheck[0]) {
				columnTitleCheck = sheet.data[0]
			}

			if (!equals(columnTitleCheck, sheet.data[0])) {
				return { next: false, message: 'Sloupce mají různé názvy!' }
			}

		}


	}


	const resultData = allFilesToProcess[0]

	return { next: true, data: resultData }

}




module.exports = { getPreview, compareStructure }