import XLSX from 'xlsx';

export class ExcelHelper {
    static readExcel(filePath: string, sheetName?: string){
       const workbook = XLSX.readFile(filePath);
      const sheet = workbook.Sheets[sheetName || workbook.SheetNames[0]]
      XLSX.utils.sheet_to_json< Record<string, string>>(sheet)
    }
}