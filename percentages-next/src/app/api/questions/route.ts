import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const percentage = searchParams.get('percentage');
    const next = searchParams.get('next');

    if (!percentage || !next) {
        return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    if (percentage === '90' && next === 'true') {
        return NextResponse.json({
            questionId: "q-90-001",
            text: "Adding what single letter to the word 'CONTACT' makes it smaller?",
            imageUrl: null,
            correctAnswer: "R",
            difficulty: 90
        }, { status: 200 });
    }

    if (percentage === '80' && next === 'true') {
        return NextResponse.json({
            questionId: "q-80-001",
            text: "What do you see in this picture?",
            imageUrl: "https://example.com/mock-image.png",
            correctAnswer: "Hidden Face",
            difficulty: 80
        }, { status: 200 });
    }

    return NextResponse.json({ error: "Not found" }, { status: 404 });
}
