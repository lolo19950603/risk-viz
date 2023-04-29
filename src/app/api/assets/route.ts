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

export async function POST(request: Request) {
    return NextResponse.json({id:'1', name:"sucess"})
}
