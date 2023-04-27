import type { NextApiRequest, NextApiResponse } from "next";
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
  
  
  