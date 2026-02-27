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

export default function GamePage() {
    const router = useRouter();
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [question, setQuestion] = useState<Question | null>(null);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(60);

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

    useEffect(() => {
        if (!loading && question) {
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
    }, [loading, question]);

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

            <div className="text-xl font-mono bg-black/30 px-6 py-3 rounded-full border border-gray-700 shadow-inner">
                Time: <span className={timeLeft <= 10 ? 'text-red-500 font-bold' : 'text-green-400'}>{timeLeft}s</span>
            </div>

            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-2xl w-full text-center border border-gray-700">
                <span className="text-sm text-purple-400 font-semibold mb-2 block tracking-wider uppercase">
                    Difficulty: {question.difficulty}%
                </span>
                <p className="text-2xl font-medium mb-8 leading-relaxed">
                    {question.text}
                </p>
                {/* For debugging/testing only right now */}
                <span className="text-xs text-gray-500 opacity-0">{question.correctAnswer}</span>
            </div>
        </div>
    );
}
