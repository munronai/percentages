/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { POST } from './route';

describe('POST /api/game/answer', () => {
    it('returns 200 and success with correct evaluation when answer matches', async () => {
        const req = new NextRequest('http://localhost:3000/api/game/answer', {
            method: 'POST',
            body: JSON.stringify({
                sessionId: 'session-123',
                questionId: 'q-90-001',
                submittedAnswer: 'R' // Correct answer for q-90-001
            })
        });

        const response = await POST(req);
        expect(response.status).toBe(200);

        const data = await response.json();
        expect(data).toEqual({
            success: true,
            isCorrect: true,
            correctAnswer: 'R',
            isEliminated: false
        });
    });

    it('returns 200 and evaluation failure when answer does not match', async () => {
        const req = new NextRequest('http://localhost:3000/api/game/answer', {
            method: 'POST',
            body: JSON.stringify({
                sessionId: 'session-123',
                questionId: 'q-90-001',
                submittedAnswer: 'Wrong Answer'
            })
        });

        const response = await POST(req);
        expect(response.status).toBe(200);

        const data = await response.json();
        expect(data).toEqual({
            success: true,
            isCorrect: false,
            correctAnswer: 'R',
            isEliminated: true // For MVP, any wrong answer eliminates the player
        });
    });

    it('returns 400 when missing required fields', async () => {
        const req = new NextRequest('http://localhost:3000/api/game/answer', {
            method: 'POST',
            body: JSON.stringify({
                sessionId: 'session-123'
            })
        });

        const response = await POST(req);
        expect(response.status).toBe(400);
    });
});
