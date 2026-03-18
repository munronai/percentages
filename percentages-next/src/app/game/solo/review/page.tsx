"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSession, SessionHistoryItem } from "@/lib/session";

export default function GameReviewPage() {
    const [history, setHistory] = useState<SessionHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const session = getSession();
        if (session && session.history) {
            setHistory(session.history);
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
                <p className="text-xl animate-pulse">Loading history...</p>
            </div>
        );
    }

    if (history.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8 gap-6">
                <h1 className="text-3xl font-bold">No game history found.</h1>
                <Link href="/" className="px-6 py-3 bg-purple-600 rounded-lg font-bold hover:bg-purple-500 transition-colors">
                    Return Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8 pb-24">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-extrabold tracking-tight">Game Review</h1>
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                        Done
                    </Link>
                </div>

                <div className="space-y-6">
                    {history.map((item, index) => (
                        <div key={`${item.question.questionId}-${index}`} className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg relative overflow-hidden">
                            <div className={`absolute top-0 left-0 w-2 h-full ${item.isCorrect ? 'bg-green-500' : 'bg-red-500'}`} />
                            
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Question {index + 1}</span>
                                <span className="text-xs font-semibold text-purple-400">{item.question.difficulty}% Difficulty</span>
                            </div>

                            <p className="text-xl font-medium mb-6 leading-relaxed">
                                {item.question.text}
                            </p>

                            {item.question.imageUrl && (
                                <div className="mb-6">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img 
                                        src={item.question.imageUrl} 
                                        alt="Question" 
                                        className="max-h-48 rounded-lg object-contain bg-black/20"
                                    />
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className={`p-4 rounded-lg border ${item.isCorrect ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                                    <p className="text-xs text-gray-400 uppercase font-bold mb-1">Your Answer</p>
                                    <p className={`text-lg font-bold ${item.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                                        {item.submittedAnswer || "Timed Out"}
                                    </p>
                                </div>
                                <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                                    <p className="text-xs text-gray-400 uppercase font-bold mb-1">Correct Answer</p>
                                    <p className="text-lg font-bold text-blue-400">
                                        {item.question.correctAnswer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-6 bg-gray-900/80 backdrop-blur-md border-t border-gray-800 flex justify-center">
                    <Link 
                        href="/" 
                        className="max-w-xs w-full py-4 px-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-xl text-center transform transition-all active:scale-[0.98]"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
