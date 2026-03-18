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
            imageUrl: "https://placehold.co/600x400/purple/white?text=Hidden+Face+Puzzle",
            correctAnswer: "Hidden Face",
            difficulty: 80
        }, { status: 200 });
    }

    if (percentage === '70' && next === 'true') {
        return NextResponse.json({
            questionId: "q-70-001",
            text: "Which of these is NOT a logic puzzle?",
            imageUrl: null,
            correctAnswer: "Crossword",
            difficulty: 70
        }, { status: 200 });
    }

    if (percentage === '10' && next === 'true') {
        return NextResponse.json({
            questionId: "q-10-001",
            text: "The ultimate logic puzzle?",
            imageUrl: null,
            correctAnswer: "Answer",
            difficulty: 10
        }, { status: 200 });
    }

    return NextResponse.json({ error: "Not found" }, { status: 404 });
}
