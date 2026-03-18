import React from 'react';
import { render, waitFor } from '@testing-library/react';
import AutoResume from './AutoResume';
import { useRouter } from 'next/navigation';
import { saveSession } from '../lib/session';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}));

describe('AutoResume Component', () => {
    let mockPush: jest.Mock;

    beforeEach(() => {
        mockPush = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        localStorage.clear();
        jest.clearAllMocks();
    });

    it('should route to /game/solo if an active session exists', async () => {
        saveSession({
            sessionId: 'test1',
            question: { questionId: 'q1', text: '1', imageUrl: null, correctAnswer: '1', difficulty: 50 },
            timeLeft: 30,
            score: 0,
            history: [],
            status: 'playing'
        });

        render(<AutoResume />);

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/game/solo');
        });
    });

    it('should not route if session is ended', async () => {
        saveSession({
            sessionId: 'test1',
            question: { questionId: 'q1', text: '1', imageUrl: null, correctAnswer: '1', difficulty: 50 },
            timeLeft: 0,
            score: 10,
            history: [],
            status: 'ended'
        });

        render(<AutoResume />);

        await new Promise(resolve => setTimeout(resolve, 50));

        expect(mockPush).not.toHaveBeenCalled();
    });

    it('should not route if no active session exists', async () => {
        render(<AutoResume />);

        await new Promise(resolve => setTimeout(resolve, 50));

        expect(mockPush).not.toHaveBeenCalled();
    });
});
