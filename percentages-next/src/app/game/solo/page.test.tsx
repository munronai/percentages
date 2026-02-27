import { render, screen, waitFor, act } from '@testing-library/react';
import GamePage from './page';

// Mock the global fetch
global.fetch = jest.fn();

describe('Game Page - Solo Mode', () => {
    beforeEach(() => {
        (global.fetch as jest.Mock).mockClear();
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
});
