"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, saveSession, clearSession } from "@/lib/session";

interface Question {
    questionId: string;
    text: string;
    imageUrl: string | null;
    correctAnswer: string;
    difficulty: number;
}

type FeedbackState = 'none' | 'correct' | 'incorrect' | 'timeOut';

export default function GamePage() {
    const router = useRouter();
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [question, setQuestion] = useState<Question | null>(null);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(60);
    const [answer, setAnswer] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // GF6 UI state
    const [feedback, setFeedback] = useState<FeedbackState>('none');
    const [backendCorrectAnswer, setBackendCorrectAnswer] = useState("");

    useEffect(() => {
        const initGame = async () => {
            const existingSession = getSession();

            if (existingSession) {
                setSessionId(existingSession.sessionId);
                setQuestion(existingSession.question);
                setTimeLeft(existingSession.timeLeft);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('/api/questions?percentage=90&next=true');
                if (response.ok) {
                    const data = await response.json();
                    setQuestion(data);

                    const newSessionId = crypto.randomUUID();
                    setSessionId(newSessionId);
                    saveSession({
                        sessionId: newSessionId,
                        question: data,
                        timeLeft: 60
                    });
                } else {
                    console.error("Failed to fetch question");
                }
            } catch (error) {
                console.error("Error fetching question:", error);
            } finally {
                setLoading(false);
            }
        };

        initGame();
    }, []);

    // TimeOut Effect (GF6 Trigger)
    useEffect(() => {
        if (timeLeft === 0 && feedback === 'none' && !isSubmitting) {
            setFeedback('timeOut');
            if (question) {
                setBackendCorrectAnswer(question.correctAnswer);
            }
        }
    }, [timeLeft, feedback, isSubmitting, question]);

    // Elimination Routing Effect (GF5)
    useEffect(() => {
        if (feedback === 'incorrect' || feedback === 'timeOut') {
            const timer = setTimeout(() => {
                router.push('/game/solo/results');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [feedback, router]);

    useEffect(() => {
        if (!loading && question && timeLeft > 0) {
            const timerId = setInterval(() => {
                setTimeLeft((prev) => {
                    const newTime = prev - 1;
                    if (sessionId) {
                        saveSession({
                            sessionId,
                            question,
                            timeLeft: newTime
                        });
                    }
                    return newTime;
                });
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [loading, question, timeLeft, sessionId]);

    const handleQuit = () => {
        clearSession();
        router.push('/');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!answer.trim() || timeLeft === 0 || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/game/answer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId,
                    questionId: question?.questionId,
                    submittedAnswer: answer.trim()
                })
            });

            if (response.ok) {
                const data = await response.json();

                if (data.isCorrect) {
                    setFeedback('correct');
                } else {
                    setFeedback('incorrect');
                    setBackendCorrectAnswer(data.correctAnswer);
                }
            } else {
                console.error("Failed to submit answer");
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error("Error submitting answer:", error);
            setIsSubmitting(false);
        }
    };

    const isInputDisabled = timeLeft === 0 || isSubmitting || feedback !== 'none';

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <p className="text-xl animate-pulse">Loading first question...</p>
            </div>
        );
    }

    if (!question) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white gap-4">
                <p className="text-xl text-red-500">Error loading question.</p>
                <button
                    onClick={handleQuit}
                    className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700"
                >
                    Return Home
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8 space-y-6 relative">
            <button
                onClick={handleQuit}
                className="absolute top-8 left-8 px-4 py-2 text-sm font-medium text-gray-400 bg-gray-800 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
            >
                Quit Game
            </button>

            <h1 className="text-3xl font-bold">Solo Game</h1>

            <div className="text-xl font-mono bg-black/30 px-6 py-3 rounded-full border border-gray-700 shadow-inner flex items-center gap-3">
                <span>Time:</span>
                <span className={`inline-block w-12 text-center ${timeLeft <= 10 ? 'text-red-500 font-bold animate-pulse' : 'text-green-400'}`}>
                    {timeLeft}s
                </span>
                {timeLeft === 0 && (
                    <span className="text-red-500 font-bold ml-2 animate-bounce uppercase tracking-widest text-sm bg-red-500/10 px-3 py-1 rounded">Time&apos;s Up!</span>
                )}
            </div>

            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-2xl w-full text-center border border-gray-700 flex flex-col items-center">
                <span className="text-sm text-purple-400 font-semibold mb-2 block tracking-wider uppercase">
                    Difficulty: {question.difficulty}%
                </span>
                {question.imageUrl && (
                    <div className="mb-6 w-full max-w-md mx-auto">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={question.imageUrl}
                            alt="Question Image"
                            className="w-full h-auto rounded-lg object-contain shadow-md"
                        />
                    </div>
                )}
                <p className="text-2xl font-medium mb-8 leading-relaxed max-w-full break-words">
                    {question.text}
                </p>
                {/* For debugging/testing only right now */}
                <span className="text-xs text-gray-500 opacity-0">{question.correctAnswer}</span>

                <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4 max-w-sm mx-auto w-full">
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Enter your answer"
                        disabled={isInputDisabled}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-center text-lg placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    />
                    <button
                        type="submit"
                        disabled={isInputDisabled || !answer.trim()}
                        className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform transition-all active:scale-[0.98]"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </form>

                {/* Feedback Overlay (GF6) */}
                {feedback !== 'none' && (
                    <div className="absolute inset-x-0 bottom-0 top-[120px] bg-gray-900/95 flex flex-col items-center justify-center p-8 rounded-b-xl backdrop-blur-sm z-10 transition-all duration-300">
                        {feedback === 'correct' && (
                            <div className="text-center animate-bounce">
                                <h2 className="text-5xl font-black text-green-400 mb-4 tracking-wider uppercase drop-shadow-lg">Correct!</h2>
                                <p className="text-lg text-green-200">Spot on!</p>
                            </div>
                        )}

                        {(feedback === 'incorrect' || feedback === 'timeOut') && (
                            <div className="text-center animate-pulse">
                                <h2 className="text-5xl font-black text-red-500 mb-6 tracking-wider uppercase drop-shadow-lg">
                                    {feedback === 'incorrect' ? 'Incorrect!' : 'Out of Time!'}
                                </h2>
                                <div className="bg-red-500/20 px-8 py-6 rounded-xl border border-red-500/30">
                                    <p className="text-red-200 text-lg uppercase tracking-widest font-semibold mb-2">The correct answer was:</p>
                                    <p className="text-4xl font-bold text-white drop-shadow-md">{backendCorrectAnswer}</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
