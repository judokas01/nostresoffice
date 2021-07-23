const ExcelJS = require('exceljs');
const searcher = require('./searcher')
const path = require('path')
const readXlsxFile = require('read-excel-file/node')


module.exports.getPreview = async (fileObj) =>{
    const baseFolder = __dirname
    let filePath = path.normalize(`${baseFolder}/../../${fileObj.data.path}`)
    //const path = fileObj.data.path
   // const path = fs(fileObj.data.path)
 /*   console.log(path.dirrname(fileObj.data.path))*/
   const workbook = new ExcelJS.Workbook(); 
  const redMe = await workbook.csv.readFile(`${filePath}`);
  //const redMe = await workbook.xlsx.readFile(`${filePath}`);
  console.log(redMe);
/*   readXlsxFile(`${filePath}`).then((rows) => {
    console.log(rows)
  }) */

  //await workbook.xlsx.readFile('uploads/6d1611e04387915711cea5d68d9467f6');
}