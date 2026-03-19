"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { io, Socket } from "socket.io-client";

export default function LobbyPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();
    const roomCode = params?.roomCode as string;
    const isHost = searchParams?.get('host') === 'true';
    const isPublic = searchParams?.get('public') === 'true';
    
    const [playerName, setPlayerName] = useState("");
    const [socket, setSocket] = useState<Socket | null>(null);
    const [players, setPlayers] = useState<{name: string, id: string}[]>([]);

    useEffect(() => {
        const name = localStorage.getItem("playerName") || "";
        setPlayerName(name);
        if (!name) {
            router.push("/");
            return;
        }

        const s = io("http://localhost:3001");
        setSocket(s);

        // Join room logic
        s.emit("JOIN_ROOM", { roomCode, playerName: name });

        // Discovery & Heartbeat for Host
        if (isHost) {
            // Initial announcement
            if (isPublic) {
                s.emit("GAME_ANNOUNCEMENT", {
                    roomCode,
                    hostName: name,
                    playerCount: 1, // Will be updated by server/peers in real implementation
                    maxPlayers: 100,
                    public: true
                });
            }

            // Periodic heartbeat
            const heartbeatInterval = setInterval(() => {
                s.emit("HEARTBEAT", { roomCode, timestamp: Date.now() });
            }, 5000);

            return () => {
                clearInterval(heartbeatInterval);
                s.disconnect();
            };
        }

        return () => {
            s.disconnect();
        };
    }, [roomCode, isHost, isPublic, router]);

    return (
        <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
            <div className="max-w-2xl w-full space-y-8 text-center">
                <header className="space-y-2">
                    <h1 className="text-sm font-bold text-purple-500 uppercase tracking-[0.2em]">Game Lobby</h1>
                    <div className="inline-block p-4 bg-gray-900 border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/10">
                        <p className="text-xs text-gray-500 uppercase font-black mb-1">Room Code</p>
                        <p className="text-5xl font-mono font-black tracking-widest text-white">{roomCode}</p>
                    </div>
                </header>

                <div className="bg-gray-900/50 border border-gray-800 rounded-3xl p-8 space-y-6">
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <h2 className="text-xl font-semibold">Waiting for players...</h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4">
                        {/* Placeholder for players list */}
                        <div className="p-4 bg-black border border-gray-800 rounded-xl flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
                                {playerName.charAt(0)}
                            </div>
                            <span className="font-medium truncate">{playerName}</span>
                            <span className="text-[10px] text-purple-400 font-bold uppercase">Host</span>
                        </div>
                    </div>
                </div>

                {isHost && (
                    <button
                        className="w-full py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-xl rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                        disabled
                    >
                        START GAME
                    </button>
                )}

                <p className="text-gray-500 text-sm italic">
                    {isHost ? "You are the host. Share the code with your friends!" : "Waiting for the host to start the game."}
                </p>
            </div>
        </div>
    );
}
