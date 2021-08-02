const ExcelJS = require('exceljs');
const searcher = require('./searcher')
const path = require('path')
const readXlsxFile = require('read-excel-file/node')
const History = require('../../models/histories')


const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const getPreview = async (fileObj) => {
	const baseFolder = __dirname
	let filePath = path.normalize(`${baseFolder}/../../${fileObj.data.path}`)
	//const path = fileObj.data.path
	// const path = fs(fileObj.data.path)
	/*   console.log(path.dirrname(fileObj.data.path))*/
	const workbook = new ExcelJS.Workbook();
	const output = await workbook.xlsx.readFile(`${filePath}`)
		.then(function () {
			const numberOfWorksheets = workbook.worksheets.length
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
					data: getPreviewData(worksheet)
				})


			}
			return output
			// console.log(worksheets.columns)

		})
	return output

}






/**
 * input is worksheet object, returns first 6 rows including header to preview this
 */
const getPreviewData = (worksheet) => {
	//console.log(worksheet.columns)
	const output = []
	for (let index = 1; index < 6; index++) {
		const row = worksheet.getRow(index);
		const rowData = []
		for (let index = 1; index < worksheet.columnCount + 1; index++) {
			rowData.push(row.getCell(index).value)

		}
		output.push(rowData)

	}
	return output

}


const compareStructure = async (files) => {

	let allFilesToProcess = []

	for (let index = 0; index < files.length; index++) {
		const element = files[index];
		const file = await History.findOne({
			'data.filename': element.data.filename
		})
		const result = await getPreview(file)
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

			if(!equals(columnTitleCheck,sheet.data[0])){
				return { next: false, message: 'Sloupce mají různé názvy!' }
			}

		}

	}
	const resultData = await getPreview(files[0])
	return { next: true, data: resultData }

}



module.exports = { getPreview, compareStructure }