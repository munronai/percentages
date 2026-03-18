import { render, screen } from '@testing-library/react';
import GameReviewPage from './page';
import { useRouter } from 'next/navigation';
import { getSession } from '@/lib/session';

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}));

// Mock session handling
jest.mock('@/lib/session', () => ({
    getSession: jest.fn(),
}));

describe('Game Review Page', () => {
    let mockPush: jest.Mock;

    beforeEach(() => {
        mockPush = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        (getSession as jest.Mock).mockClear();
    });

    it('displays all questions and answers from history', () => {
        const mockHistory = [
            {
                question: { questionId: 'q1', text: 'Question 1 Content', correctAnswer: 'Ans1', difficulty: 90, imageUrl: null },
                submittedAnswer: 'Ans1',
                isCorrect: true
            },
            {
                question: { questionId: 'q2', text: 'Question 2 Content', correctAnswer: 'Ans2', difficulty: 80, imageUrl: null },
                submittedAnswer: 'Wrong',
                isCorrect: false
            }
        ];

        (getSession as jest.Mock).mockReturnValue({
            sessionId: 'test',
            history: mockHistory,
            score: 1,
            question: {},
            timeLeft: 0
        });

        render(<GameReviewPage />);

        expect(screen.getByText('Question 1 Content')).toBeInTheDocument();
        // Correct answer and submitted answer are both 'Ans1', so should find 2
        expect(screen.getAllByText('Ans1')).toHaveLength(2);

        expect(screen.getByText('Question 2 Content')).toBeInTheDocument();
        expect(screen.getByText('Wrong')).toBeInTheDocument();
        expect(screen.getByText('Ans2')).toBeInTheDocument();
    });

    it('displays "Timed Out" if no answer was submitted', () => {
        const mockHistory = [
            {
                question: { questionId: 'q1', text: 'Time Out Question Content', correctAnswer: 'Ans1', difficulty: 90, imageUrl: null },
                submittedAnswer: null,
                isCorrect: false
            }
        ];

        (getSession as jest.Mock).mockReturnValue({ history: mockHistory });

        render(<GameReviewPage />);

        expect(screen.getByText('Time Out Question Content')).toBeInTheDocument();
        expect(screen.getByText('Timed Out')).toBeInTheDocument();
    });

    it('displays message if no history found', () => {
        (getSession as jest.Mock).mockReturnValue(null);

        render(<GameReviewPage />);

        expect(screen.getByText(/No game history found/i)).toBeInTheDocument();
    });
});
