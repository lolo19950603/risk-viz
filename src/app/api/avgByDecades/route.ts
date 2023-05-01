import prisma from "../../../../prisma/client";
import { NextResponse } from "next/server";
import type { Asset } from '@prisma/client'

export async function GET(request: Request) {
  try {
    var data1 = await prisma.$queryRaw<any[]>`
      SELECT AVG("riskRating"), "year", "location"
      FROM "Asset"
      GROUP BY "year", "location"
      ORDER BY "year" ASC
    `
    for (const row of data1) {
      const data = await prisma.$queryRaw<Asset[]>`
        SELECT *
        FROM "Asset"
        WHERE "year" = ${row.year}
        AND "lat" = ${Number(row.location[0])}
      `
      row.data = data
    }
    return NextResponse.json(data1);
  } catch (error) {
    return NextResponse.json(error);
  }
}
