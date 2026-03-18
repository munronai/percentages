/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { POST } from './route';
import { logActivity } from '@/lib/logger';

// Mock the logger utility
jest.mock('@/lib/logger', () => ({
    logActivity: jest.fn().mockResolvedValue(undefined)
}));

describe('POST /api/admin/log', () => {
    it('returns 200 and logs the activity', async () => {
        const req = new NextRequest('http://localhost:3000/api/admin/log', {
            method: 'POST',
            body: JSON.stringify({
                message: 'Player Login',
                metadata: { playerName: 'Alex' }
            })
        });

        const response = await POST(req);
        expect(response.status).toBe(200);

        expect(logActivity).toHaveBeenCalledWith('Player Login', { playerName: 'Alex' });
    });

    it('returns 400 when missing message', async () => {
        const req = new NextRequest('http://localhost:3000/api/admin/log', {
            method: 'POST',
            body: JSON.stringify({
                metadata: { playerName: 'Alex' }
            })
        });

        const response = await POST(req);
        expect(response.status).toBe(400);
    });
});
