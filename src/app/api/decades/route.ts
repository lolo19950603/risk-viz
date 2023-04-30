import prisma from '../../../../prisma/client'
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const data = await prisma.asset.groupBy({
            by: ['year']
        })
        return NextResponse.json(data)
    } catch(error) {
        return NextResponse.json(error)
    }
}
