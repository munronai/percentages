export interface Question {
    questionId: string;
    text: string;
    imageUrl: string | null;
    correctAnswer: string;
    difficulty: number;
}

export interface SessionHistoryItem {
    question: Question;
    submittedAnswer: string | null;
    isCorrect: boolean;
}

export interface GameSession {
    sessionId: string;
    question: Question;
    timeLeft: number;
    score: number;
    history: SessionHistoryItem[];
    status: 'playing' | 'ended';
    timestamp?: number;
}

const SESSION_KEY = 'game_session';

export function saveSession(session: GameSession): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
}

export function getSession(): GameSession | null {
    if (typeof window === 'undefined') return null;

    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;

    try {
        return JSON.parse(stored) as GameSession;
    } catch (error) {
        console.error('Failed to parse game session', error);
        return null;
    }
}

export function clearSession(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(SESSION_KEY);
    }
}
