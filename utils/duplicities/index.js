const ExcelJS = require('exceljs');
const searcher = require('./searcher')
const path = require('path')
const readXlsxFile = require('read-excel-file/node')


module.exports.getPreview = async (fileObj) => {
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
      const output = []
      for (let index = 0; index < worksheets.length; index++) {

        const worksheet = worksheets[index];

        //output
        output.push({
          fileid: fileObj.data.filename,
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
      for (let index = 1; index < worksheet.columnCount+1; index++) {
        rowData.push(row.getCell(index).value)
        
      }
      output.push(rowData)

  }
  return output

}