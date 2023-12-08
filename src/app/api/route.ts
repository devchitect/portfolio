import { cookies } from 'next/headers'

export async function GET(Request) {
    return new Response("This is a new API route");
}

export async function POST(Request) {}
export async function PUT(Request) {}
export async function DELETE(Request) {}

