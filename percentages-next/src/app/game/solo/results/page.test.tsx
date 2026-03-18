import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResultsPage from './page';
import { useRouter } from 'next/navigation';
import { getSession, clearSession } from '@/lib/session';

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}));

// Mock session handling
jest.mock('@/lib/session', () => ({
    getSession: jest.fn(),
    clearSession: jest.fn(),
}));

describe('Results Page', () => {
    let mockPush: jest.Mock;

    beforeEach(() => {
        mockPush = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        (getSession as jest.Mock).mockClear();
        (clearSession as jest.Mock).mockClear();
    });

    it('displays the final score from the session', () => {
        (getSession as jest.Mock).mockReturnValue({
            sessionId: 'test-session',
            score: 12,
            question: { difficulty: 90 },
            timeLeft: 0
        });

        render(<ResultsPage />);

        expect(screen.getByText(/Final Score/i)).toBeInTheDocument();
        expect(screen.getByText('12')).toBeInTheDocument();
    });

    it('displays score of 0 if no session or score found', () => {
        (getSession as jest.Mock).mockReturnValue(null);

        render(<ResultsPage />);

        expect(screen.getByText(/Final Score/i)).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('clears session and redirects to home on Play Again', async () => {
        (getSession as jest.Mock).mockReturnValue({ score: 5 });

        render(<ResultsPage />);

        const playAgainBtn = screen.getByRole('button', { name: /Play Again/i });
        await userEvent.click(playAgainBtn);

        expect(clearSession).toHaveBeenCalled();
        expect(mockPush).toHaveBeenCalledWith('/');
    });

    it('shows Review Game link', () => {
        render(<ResultsPage />);
        expect(screen.getByText(/Review Game/i)).toBeInTheDocument();
    });
});
