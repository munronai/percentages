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
            new Promise(resolve => setTimeout(() => resolve({ ok: true, json: async () => ({}) }), 100))
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

        (global.fetch as jest.Mock).mockImplementation(async (url) => {
            if (url.includes('/api/questions')) {
                return { ok: true, json: async () => mockQuestion };
            }
            return { ok: false };
        });

        render(<GamePage />);

        // Wait for the loading to finish and question to appear
        expect(await screen.findByText(/Adding what single letter/i)).toBeInTheDocument();

        // Assert no image is rendered
        expect(screen.queryByRole('img')).not.toBeInTheDocument();

        // Assert the mock API was called correctly
        expect(global.fetch).toHaveBeenCalledWith('/api/questions?percentage=90&next=true');
    });

    it('displays the question text and an image when imageUrl is present', async () => {
        const mockQuestionWithImage = {
            questionId: "q-80-001",
            text: "What do you see in this picture?",
            imageUrl: "https://example.com/mock-image.png",
            correctAnswer: "Hidden Face",
            difficulty: 80
        };

        (global.fetch as jest.Mock).mockImplementation(async (url) => {
            if (url.includes('/api/questions')) {
                return { ok: true, json: async () => mockQuestionWithImage };
            }
            return { ok: false };
        });

        render(<GamePage />);

        expect(await screen.findByText(/What do you see in this picture?/i)).toBeInTheDocument();

        const image = screen.getByRole('img', { name: "Question Image" });
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', "https://example.com/mock-image.png");
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

        (global.fetch as jest.Mock).mockImplementation(async (url) => {
            if (url.includes('/api/questions')) {
                return { ok: true, json: async () => mockQuestion };
            }
            return { ok: false };
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
        await waitFor(() => {
            expect(screen.getByText(/59s/i)).toBeInTheDocument();
        });

        // Fast forward to 10 seconds left
        act(() => {
            jest.advanceTimersByTime(49000);
        });

        await waitFor(() => {
            const timeSpan = screen.getByText(/10s/i);
            expect(timeSpan).toBeInTheDocument();
            expect(timeSpan).toHaveClass('text-red-500', 'animate-pulse');
        });

        // Fast forward to 0 seconds
        act(() => {
            jest.advanceTimersByTime(10000);
        });

        // Should stop at 0 and display Time's Up
        await waitFor(() => {
            expect(screen.getByText(/0s/i)).toBeInTheDocument();
            expect(screen.getByText(/Time's Up!/i)).toBeInTheDocument();
        });

        // Advance more, should not go below 0
        act(() => {
            jest.advanceTimersByTime(1000);
        });

        await waitFor(() => {
            expect(screen.getByText(/0s/i)).toBeInTheDocument();
        });

        jest.useRealTimers();
    });
    it('renders correct feedback overlay and waits without routing yet', async () => {
        const mockQuestion = {
            questionId: "q-90-001",
            text: "Testing submission",
            imageUrl: null,
            correctAnswer: "Test",
            difficulty: 90
        };

        (global.fetch as jest.Mock).mockImplementation(async (url) => {
            if (url.includes('/api/questions')) {
                return { ok: true, json: async () => mockQuestion };
            }
            if (url.includes('/api/game/answer')) {
                return {
                    ok: true, json: async () => ({
                        success: true,
                        isCorrect: true,
                        correctAnswer: 'Test',
                        isEliminated: false
                    })
                };
            }
            return { ok: false };
        });

        render(<GamePage />);
        await screen.findByText(/Testing submission/i);

        const input = screen.getByPlaceholderText(/Enter your answer/i);
        const submitBtn = screen.getByRole('button', { name: /Submit/i });

        await userEvent.type(input, "Test");
        await userEvent.click(submitBtn);

        // Assert feedback overlay appears
        expect(await screen.findByText(/Correct!/i)).toBeInTheDocument();

        // Assert form inputs are disabled
        expect(input).toBeDisabled();
        expect(submitBtn).toBeDisabled();
    });

    it('renders incorrect feedback and correct answer on failed submission, then routes to results', async () => {
        jest.useFakeTimers();
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

        const mockQuestion = {
            questionId: "q-90-001",
            text: "Testing submission",
            imageUrl: null,
            correctAnswer: "Real Answer",
            difficulty: 90
        };

        (global.fetch as jest.Mock).mockImplementation(async (url) => {
            if (url.includes('/api/questions')) {
                return { ok: true, json: async () => mockQuestion };
            }
            if (url.includes('/api/game/answer')) {
                return {
                    ok: true, json: async () => ({
                        success: true,
                        isCorrect: false,
                        correctAnswer: 'Real Answer',
                        isEliminated: true
                    })
                };
            }
            return { ok: false };
        });

        render(<GamePage />);
        await screen.findByText(/Testing submission/i);

        const input = screen.getByPlaceholderText(/Enter your answer/i);
        const submitBtn = screen.getByRole('button', { name: /Submit/i });

        await user.type(input, "Wrong Answer");
        await user.click(submitBtn);

        // Assert feedback overlay appears
        expect(await screen.findByText(/Incorrect!/i)).toBeInTheDocument();
        expect(screen.getByText(/The correct answer was/i)).toBeInTheDocument();
        const correctAnswerDisplay = screen.getByText('Real Answer', { selector: 'p.text-4xl' });
        expect(correctAnswerDisplay).toBeInTheDocument();

        expect(input).toBeDisabled();

        // GF5: Test 3s timeout to Results page
        act(() => {
            jest.advanceTimersByTime(3000);
        });

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/game/solo/results');
        });

        jest.useRealTimers();
    });

    it('renders answer input and handles submission to the API', async () => {
        const mockQuestion = {
            questionId: "q-90-001",
            text: "Testing submission",
            imageUrl: null,
            correctAnswer: "Test",
            difficulty: 90
        };

        (global.fetch as jest.Mock).mockImplementation(async (url) => {
            if (url.includes('/api/questions')) {
                return { ok: true, json: async () => mockQuestion };
            }
            if (url.includes('/api/game/answer')) {
                return { ok: true, json: async () => ({ success: true, message: "Answer received" }) };
            }
            return { ok: false };
        });

        render(<GamePage />);
        await screen.findByText(/Testing submission/i);

        const input = screen.getByPlaceholderText(/Enter your answer/i);
        const submitBtn = screen.getByRole('button', { name: /Submit/i });

        expect(input).toBeInTheDocument();
        expect(input).not.toBeDisabled();
        expect(submitBtn).toBeInTheDocument();
        // Submit button should be disabled initially because answer is empty
        expect(submitBtn).toBeDisabled();

        await userEvent.type(input, "My Answer");
        // Submit button should be enabled after typing
        expect(submitBtn).not.toBeDisabled();

        await userEvent.click(submitBtn);

        expect(global.fetch).toHaveBeenCalledWith('/api/game/answer', expect.objectContaining({
            method: 'POST',
            body: expect.stringContaining('"submittedAnswer":"My Answer"')
        }));

        // The input should be disabled after submission (for MVP)
        expect(input).toBeDisabled();
        expect(submitBtn).toBeDisabled();
    });

    it('disables input when time is up', async () => {
        jest.useFakeTimers();

        const mockSession = {
            sessionId: 'existing-session',
            question: {
                questionId: 'q-90-002',
                text: 'Wait for time out',
                imageUrl: null,
                correctAnswer: 'X',
                difficulty: 80
            },
            timeLeft: 2 // Only 2 seconds left
        };

        (getSession as jest.Mock).mockReturnValue(mockSession);

        render(<GamePage />);
        await screen.findByText(/Wait for time out/i);

        const input = screen.getByPlaceholderText(/Enter your answer/i);
        expect(input).not.toBeDisabled();

        act(() => {
            jest.advanceTimersByTime(2000);
        });

        await waitFor(() => {
            expect(screen.getByText(/Time's Up!/i)).toBeInTheDocument();
        });

        expect(input).toBeDisabled();

        // Also assert that the timeout feedback overlay appears
        expect(await screen.findByText(/Out of Time!/i)).toBeInTheDocument();
        expect(screen.getByText(/The correct answer was/i)).toBeInTheDocument();
        const correctAnswerDisplay = screen.getByText('X', { selector: 'p.text-4xl' });
        expect(correctAnswerDisplay).toBeInTheDocument();

        // GF5 Test: Wait 3 seconds to test routing to Results page
        act(() => {
            jest.advanceTimersByTime(3000);
        });

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/game/solo/results');
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

        (global.fetch as jest.Mock).mockImplementation(async (url) => {
            if (url.includes('/api/questions')) {
                return { ok: true, json: async () => mockQuestion };
            }
            return { ok: false };
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
        const quitButton = await screen.findByRole('button', { name: /quit game/i });
        await userEvent.click(quitButton);

        expect(clearSession).toHaveBeenCalled();
        expect(mockPush).toHaveBeenCalledWith('/');
    });
});
