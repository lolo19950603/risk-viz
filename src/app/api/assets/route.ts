import prisma from '../../../../prisma/client'
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const data = await prisma.asset.findMany()
        return NextResponse.json(data)
    } catch(error) {
        return NextResponse.json(error)
    }
}

import * as path from 'path';
import Excel from 'exceljs';

const filePath = path.resolve('public', 'dataset.xlsx');

const getCellValue = (row:  Excel.Row, cellIndex: number) => {
  const cell = row.getCell(cellIndex);
  
  return cell.value ? cell.value.toString() : '';
};

export async function POST(request: Request) {
    await prisma.asset.deleteMany({});
    const workbook = new Excel.Workbook();
    const content = await workbook.xlsx.readFile(filePath);
  
    const worksheet = content.worksheets[0];
    const rowStartIndex = 2;
    const numberOfRows = worksheet.rowCount - 1;
  
    const rows = worksheet.getRows(rowStartIndex, numberOfRows) ?? [];
  
    const dataset = rows.map((row) => (
        {
            name: getCellValue(row, 1),
            lat: Number(getCellValue(row, 2)),
            long: Number(getCellValue(row, 3)),
            category: getCellValue(row, 4),
            riskRating: Number(getCellValue(row, 5)),
            riskFactor: JSON.parse(getCellValue(row, 6)),
            year: Number(getCellValue(row, 7))
        }
    ))
  
    const final = await prisma.asset.createMany({
        data: dataset,
    })
    return NextResponse.json({id:'1', name:"sucess"})
}
