'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const [playerName, setPlayerName] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const name = localStorage.getItem('playerName');
        if (!name) {
            router.push('/');
        } else if (playerName !== name) {
             // eslint-disable-next-line react-hooks/set-state-in-effect
            setPlayerName(name);
        }
    }, [router, playerName]);

    const handleLogout = () => {
        localStorage.removeItem('playerName');
        router.push('/');
    };

    if (!playerName) return null;

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-4xl font-bold mb-4">Welcome, {playerName}!</h1>
            <p className="mb-8">This is the game lobby.</p>

            <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-bold"
            >
                Logout
            </button>
        </div>
    )
}
