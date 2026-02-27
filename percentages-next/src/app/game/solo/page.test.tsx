import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GamePage from './page';
import { useRouter } from 'next/navigation';
import { getSession, saveSession, clearSession } from '@/lib/session';

// Mock the global fetch
global.fetch = jest.fn();

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}));

// Mock session handling
jest.mock('@/lib/session', () => ({
    getSession: jest.fn(),
    saveSession: jest.fn(),
    clearSession: jest.fn(),
}));

describe('Game Page - Solo Mode', () => {
    let mockPush: jest.Mock;

    beforeEach(() => {
        mockPush = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        (global.fetch as jest.Mock).mockClear();
        (getSession as jest.Mock).mockClear();
        (saveSession as jest.Mock).mockClear();
        (clearSession as jest.Mock).mockClear();
        (getSession as jest.Mock).mockReturnValue(null); // Default to no session
    });

    it('shows a loading state while fetching the first question', async () => {
        // Delay the resolution of fetch to test loading state
        (global.fetch as jest.Mock).mockImplementation(() =>
            new Promise(resolve => setTimeout(resolve, 100))
        );

        render(<GamePage />);

        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('displays the question text and correct answer after fetching', async () => {
        const mockQuestion = {
            questionId: "q-90-001",
            text: "Adding what single letter to the word 'CONTACT' makes it smaller?",
            imageUrl: null,
            correctAnswer: "R",
            difficulty: 90
        };

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockQuestion,
        });

        render(<GamePage />);

        // Wait for the loading to finish and question to appear
        expect(await screen.findByText(/Adding what single letter/i)).toBeInTheDocument();

        // Assert the mock API was called correctly
        expect(global.fetch).toHaveBeenCalledWith('/api/questions?percentage=90&next=true');
    });

    it('starts a 60-second timer upon data load', async () => {
        jest.useFakeTimers();

        const mockQuestion = {
            questionId: "q-90-001",
            text: "Adding what single letter to the word 'CONTACT' makes it smaller?",
            imageUrl: null,
            correctAnswer: "R",
            difficulty: 90
        };

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockQuestion,
        });

        render(<GamePage />);

        // Wait for the data to load
        await screen.findByText(/Adding what single letter/i);

        // Timer should start at 60
        expect(screen.getByText(/60s/i)).toBeInTheDocument();

        // Advance timer by 1 second
        act(() => {
            jest.advanceTimersByTime(1000);
        });

        // Timer should update to 59
        // Need to wrap in waitFor because state updates from setTimeout/setInterval are asynchronous in React 18 tests sometimes
        await waitFor(() => {
            expect(screen.getByText(/59s/i)).toBeInTheDocument();
        });

        jest.useRealTimers();
    });

    it('loads existing session if present instead of fetching', async () => {
        const mockSession = {
            sessionId: 'existing-session',
            question: {
                questionId: 'q-90-002',
                text: 'Test question from session?',
                imageUrl: null,
                correctAnswer: 'X',
                difficulty: 80
            },
            timeLeft: 35
        };

        (getSession as jest.Mock).mockReturnValue(mockSession);

        render(<GamePage />);

        // Should not call fetch
        expect(global.fetch).not.toHaveBeenCalled();

        // Should immediately show the question and time left
        expect(await screen.findByText(/Test question from session?/i)).toBeInTheDocument();
        expect(screen.getByText(/35s/i)).toBeInTheDocument();
    });

    it('saves a session when a new question is fetched', async () => {
        const mockQuestion = {
            questionId: "q-90-003",
            text: "New fetched question?",
            imageUrl: null,
            correctAnswer: "Y",
            difficulty: 70
        };

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockQuestion,
        });

        render(<GamePage />);

        await screen.findByText(/New fetched question?/i);

        expect(saveSession).toHaveBeenCalledWith(expect.objectContaining({
            sessionId: expect.any(String),
            question: mockQuestion,
            timeLeft: 60,
        }));
    });

    it('clears session and routes home when Quit Game is clicked', async () => {
        const mockSession = {
            sessionId: 'existing-session',
            question: {
                questionId: 'q-90-002',
                text: 'Test question from session?',
                imageUrl: null,
                correctAnswer: 'X',
                difficulty: 80
            },
            timeLeft: 35
        };

        (getSession as jest.Mock).mockReturnValue(mockSession);

        render(<GamePage />);

        // Wait to load
        await screen.findByText(/Test question from session?/i);

        // Find and click Quit button
        const quitButton = screen.getByRole('button', { name: /quit game/i });
        await userEvent.click(quitButton);

        expect(clearSession).toHaveBeenCalled();
        expect(mockPush).toHaveBeenCalledWith('/');
    });
});
