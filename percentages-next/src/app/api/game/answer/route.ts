import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { sessionId, questionId, submittedAnswer } = body;

        if (!sessionId || !questionId || submittedAnswer === undefined) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // For MVP, basic mock validation.
        let isCorrect = false;
        let correctAnswer = 'Unknown';

        // Lookup correct answer based on mocked question IDs
        if (questionId === 'q-90-001') {
            correctAnswer = 'R';
        } else if (questionId === 'q-80-001') {
            correctAnswer = 'Hidden Face';
        } else if (questionId === 'q-90-002') {
            correctAnswer = 'X';
        }

        if (submittedAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
            isCorrect = true;
        }

        const isEliminated = !isCorrect;

        return NextResponse.json({
            success: true,
            isCorrect,
            correctAnswer,
            isEliminated
        }, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
}
