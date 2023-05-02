import prisma from "../../../../prisma/client";
import { NextResponse } from "next/server";
import type { Asset } from "@prisma/client";

export async function GET(request: Request) {
  try {
    var data = await prisma.$queryRaw<any[]>`
        SELECT AVG("riskRating"), "year", "category"
        FROM "Asset"
        GROUP BY "year", "category"
        ORDER BY "year" ASC
      `;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
