import prisma from "../../../../prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    var data = await prisma.$queryRaw<any[]>`
        SELECT AVG("riskRating"), "year", "name"
        FROM "Asset"
        GROUP BY "year", "name"
        ORDER BY "year" ASC
      `;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
