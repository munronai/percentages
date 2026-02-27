/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { GET } from './route';

describe('GET /api/questions', () => {
    it('returns the mock 90% difficulty question when percentage=90&next=true', async () => {
        const req = new NextRequest('http://localhost:3000/api/questions?percentage=90&next=true');
        const response = await GET(req);

        expect(response.status).toBe(200);

        const data = await response.json();

        expect(data).toEqual({
            questionId: "q-90-001",
            text: "Adding what single letter to the word 'CONTACT' makes it smaller?",
            imageUrl: null,
            correctAnswer: "R",
            difficulty: 90
        });
    });

    it('returns the mock 80% difficulty question with an image when percentage=80&next=true', async () => {
        const req = new NextRequest('http://localhost:3000/api/questions?percentage=80&next=true');
        const response = await GET(req);

        expect(response.status).toBe(200);

        const data = await response.json();

        expect(data).toEqual({
            questionId: "q-80-001",
            text: "What do you see in this picture?",
            imageUrl: "https://example.com/mock-image.png",
            correctAnswer: "Hidden Face",
            difficulty: 80
        });
    });

    it('returns a 400 error if parameters are missing', async () => {
        const req = new NextRequest('http://localhost:3000/api/questions');
        const response = await GET(req);

        expect(response.status).toBe(400);
    });
});
