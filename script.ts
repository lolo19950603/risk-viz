import * as path from 'path';
import Excel from 'exceljs';
import prisma from './prisma/client';

const filePath = path.resolve('public', 'dataset.xlsx');

const getCellValue = (row:  Excel.Row, cellIndex: number) => {
  const cell = row.getCell(cellIndex);
  
  return cell.value ? cell.value.toString() : '';
};

const main = async () => {
  const workbook = new Excel.Workbook();
  const content = await workbook.xlsx.readFile(filePath);

  const worksheet = content.worksheets[0];
  const rowStartIndex = 2;
  const numberOfRows = worksheet.rowCount - 1;

  const rows = worksheet.getRows(rowStartIndex, numberOfRows) ?? [];

  rows.forEach(async (row) => {
    const data = await prisma.asset.create({
      data: {
        name: getCellValue(row, 1),
        lat: parseInt(getCellValue(row, 2)),
        long: parseInt(getCellValue(row, 3)),
        category: getCellValue(row, 4),
        riskRating: parseInt(getCellValue(row, 5)),
        riskFactor: JSON.parse(getCellValue(row, 6)),
        year: parseInt(getCellValue(row, 7))
      },
    })
    console.log(data)
  });
}