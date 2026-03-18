import { saveSession, getSession, clearSession, GameSession } from './session';

describe('Game Session Utility', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    const mockSession: GameSession = {
        sessionId: 'test-session-id',
        question: {
            questionId: 'q1',
            text: 'Test Question?',
            imageUrl: null,
            correctAnswer: 'A',
            difficulty: 90
        },
        timeLeft: 45,
        score: 0,
        history: [],
        status: 'playing',
        timestamp: Date.now()
    };

    describe('saveSession', () => {
        it('should save the session data to localStorage correctly serialized as JSON', () => {
            saveSession(mockSession);
            const stored = localStorage.getItem('game_session');
            expect(stored).toBeDefined();
            const parsed = JSON.parse(stored!);
            expect(parsed).toEqual(mockSession);
        });
    });

    describe('getSession', () => {
        it('should return null if no session exists in localStorage', () => {
            expect(getSession()).toBeNull();
        });

        it('should return the parsed session if it exists', () => {
            saveSession(mockSession);
            const retrieved = getSession();
            expect(retrieved).toEqual(mockSession);
        });

        it('should return null if the session data is corrupted/invalid JSON', () => {
            localStorage.setItem('game_session', 'invalid JSON {');
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            expect(getSession()).toBeNull();
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
        });
    });

    describe('clearSession', () => {
        it('should remove the session data from localStorage', () => {
            saveSession(mockSession);
            clearSession();
            expect(localStorage.getItem('game_session')).toBeNull();
        });
    });
});
