import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client"

export async function GET(request: Request, { params }: {
    params: { decade: string }
  }) {
    try {
        const decade = params.decade;
        const data = await prisma.asset.findMany({
            where: {year: Number(decade)}
        })
        return NextResponse.json(data)
    } catch(error) {
        return NextResponse.json(error)
    }
  }