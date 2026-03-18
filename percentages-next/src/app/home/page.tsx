"use client";

import { useRouter } from "next/navigation";
import StartGameButton from "@/components/StartGameButton";
import { clearSession } from "@/lib/session";

export default function HomePage() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("playerName");
        clearSession();
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 space-y-8 relative">
            <button
                onClick={handleLogout}
                className="absolute top-8 right-8 px-4 py-2 text-sm font-medium text-gray-400 bg-gray-900 border border-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition-all"
            >
                Logout
            </button>

            <div className="text-center space-y-4">
                <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                    Welcome Home
                </h1>
                <p className="text-xl text-gray-400">Step right up to the game lobby.</p>
            </div>

            <div className="w-full max-w-sm pt-8 space-y-4">
                <StartGameButton />
                
                <button
                    onClick={() => router.push('/multiplayer')}
                    className="w-full py-4 px-8 font-bold text-lg rounded-xl shadow-xl transform transition-all duration-200 ring-1 ring-white/20 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white hover:scale-[1.02] active:scale-[0.98]"
                >
                    Multiplayer
                </button>
            </div>
        </div>
    )
}
