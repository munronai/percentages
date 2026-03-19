'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupForm() {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const existingName = localStorage.getItem('playerName');
        if (existingName) {
            router.push('/home');
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('Name is required');
            return;
        }
        localStorage.setItem('playerName', name);
        
        // Log the login activity
        try {
            await fetch('/api/admin/log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: 'User Login',
                    metadata: { playerName: name }
                })
            });
        } catch (error) {
            console.error('Failed to log login:', error);
        }

        router.push('/home');
    };

    return (
        <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20">
            <h2 className="text-3xl font-bold text-center text-white mb-6 tracking-tight">
                Join the Game
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
                        Display Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="e.g. Alex"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (error) setError('');
                        }}
                    />
                    {error && <p className="mt-2 text-sm text-red-400 animate-pulse">{error}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ring-1 ring-white/20"
                >
                    Continue
                </button>
            </form>
        </div>
    )
}
