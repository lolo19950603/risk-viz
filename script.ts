import * as path from "path";
import Excel from "exceljs";
import prisma from "./prisma/client";

const filePath = path.resolve("public", "dataset.xlsx");

const getCellValue = (row: Excel.Row, cellIndex: number) => {
  const cell = row.getCell(cellIndex);

  return cell.value ? cell.value.toString() : "";
};

const main = async () => {
  await prisma.asset.deleteMany({});
  const workbook = new Excel.Workbook();
  const content = await workbook.xlsx.readFile(filePath);

  const worksheet = content.worksheets[0];
  const rowStartIndex = 2;
  const numberOfRows = worksheet.rowCount - 1;

  const rows = worksheet.getRows(rowStartIndex, numberOfRows) ?? [];

  const dataset = rows.map((row) => ({
    name: getCellValue(row, 1),
    lat: Number(getCellValue(row, 2)),
    long: Number(getCellValue(row, 3)),
    category: getCellValue(row, 4),
    riskRating: Number(getCellValue(row, 5)),
    riskFactor: JSON.parse(getCellValue(row, 6)),
    year: Number(getCellValue(row, 7)),
  }));

  const final = await prisma.asset.createMany({
    data: dataset,
  });
};
