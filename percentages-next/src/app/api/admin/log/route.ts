import { NextRequest, NextResponse } from 'next/server';
import { logActivity } from '@/lib/logger';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { message, metadata } = body;

        if (!message) {
            return NextResponse.json({ error: "Missing required message field" }, { status: 400 });
        }

        await logActivity(message, metadata || {});

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
}
