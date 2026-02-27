"use client";

import Link from "next/link";

export default function ResultsPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-lg w-full text-center border border-gray-700">
                <h1 className="text-4xl font-bold text-red-500 mb-6 uppercase tracking-widest drop-shadow-md">Eliminated!</h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    You were eliminated from the game. Better luck next time!
                </p>
                <Link
                    href="/"
                    className="inline-block py-3 px-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-lg shadow-lg transform transition-all active:scale-[0.98]"
                >
                    Return to Home
                </Link>
            </div>
        </div>
    );
}
