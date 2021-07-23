const ExcelJS = require('exceljs');

const getSearchArray = async(hakKlient) =>{
    const workbook = new ExcelJS.Workbook()
    //const hakKlient = 'hak_klient.xlsx'
    const readFileHak = workbook.xlsx.readFile(hakKlient)
    const output = readFileHak.then(function() {
        //  const worksheet = workbook.getWorksheet([0]);
        const worksheet = workbook.worksheets[0];
        const outputObject = Array();
            for (let index = 0; index < worksheet.rowCount; index++) {
                const element = worksheet.getRow(index);
                let x = element.getCell(2).value
                let y = element.getCell(3).value
                let output = {'admin' : x,
                                'client' : y}
                
                outputObject.push(output)
            }
            return outputObject
        })

        return output;
     
    

}


const searchFor = (searchObjekt,searchString)=> {
    let returnObject = Array()
    searchObjekt.forEach(element => {
        if(searchString == element.client){
            returnObject.push(element.admin)
        }    
    });
    //remove duplicities
    returnObject = [...new Set(returnObject)];
    return returnObject
}


const nextChar = (character,increase) => {
    return String.fromCharCode(character.charCodeAt(0) + increase);
}


exports.nextChar = nextChar;
exports.searchFor = searchFor;
exports.getSearchArray = getSearchArray;