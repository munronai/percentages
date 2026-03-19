"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSocket } from "@/context/SocketContext";
import { generateRoomCode } from "@/lib/roomCodes";

interface PublicGame {
    roomCode: string;
    hostName: string;
    playerCount: number;
    maxPlayers: number;
}

export default function MultiplayerPage() {
    const router = useRouter();
    const [playerName, setPlayerName] = useState("");
    const { socket } = useSocket();
    const [publicGames, setPublicGames] = useState<PublicGame[]>([]);
    
    // Hosting state
    const [isHosting, setIsHosting] = useState(false);
    const [roomCode, setRoomCode] = useState("");
    const [isPublic, setIsPublic] = useState(true);
    
    // Joining state
    const [joinCode, setJoinCode] = useState("");

    useEffect(() => {
        const name = localStorage.getItem("playerName") || "";
        setPlayerName(name);
        if (!name) {
            router.push("/");
            return;
        }

        if (!socket) return;

        const handleAnnouncement = (game: PublicGame) => {
            setPublicGames((prev) => {
                const exists = prev.find(g => g.roomCode === game.roomCode);
                if (exists) {
                    return prev.map(g => g.roomCode === game.roomCode ? game : g);
                }
                return [...prev, game];
            });
        };

        const handleDiscoveryResponse = (games: PublicGame[]) => {
            setPublicGames(games);
        };

        const handleGameRemoved = (data: { roomCode: string }) => {
            setPublicGames((prev) => prev.filter(g => g.roomCode !== data.roomCode));
        };

        socket.on("GAME_ANNOUNCEMENT", handleAnnouncement);
        socket.on("DISCOVERY_RESPONSE", handleDiscoveryResponse);
        socket.on("GAME_REMOVED", handleGameRemoved);

        // Request active games upon joining the channel
        socket.emit("DISCOVERY_REQUEST");

        return () => {
            socket.off("GAME_ANNOUNCEMENT", handleAnnouncement);
            socket.off("DISCOVERY_RESPONSE", handleDiscoveryResponse);
            socket.off("GAME_REMOVED", handleGameRemoved);
        };
    }, [router, socket]);

    const handleHostNewGame = () => {
        setRoomCode(generateRoomCode());
        setIsHosting(true);
    };

    const handleCreateLobby = () => {
        // In a real implementation, we'd emit a creation event
        // For MVP, we just navigate to the lobby URL
        router.push(`/game/lobby/${roomCode}?host=true&public=${isPublic}`);
    };

    const handleJoinByCode = (e: React.FormEvent) => {
        e.preventDefault();
        if (joinCode.trim()) {
            router.push(`/game/lobby/${joinCode.toUpperCase()}`);
        }
    };

    const handleJoinGame = (code: string) => {
        router.push(`/game/lobby/${code}`);
    };

    return (
        <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center">
            <div className="max-w-4xl w-full space-y-12">
                <header className="flex justify-between items-center">
                    <button 
                        onClick={() => router.push("/home")}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        &larr; Back
                    </button>
                    <h1 className="text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                        MULTIPLAYER
                    </h1>
                    <div className="w-12" /> {/* Spacer */}
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Hosting Section */}
                    <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 space-y-6">
                        <h2 className="text-2xl font-bold">Host a Game</h2>
                        {!isHosting ? (
                            <button
                                onClick={handleHostNewGame}
                                className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg transition-all"
                            >
                                Host New Game
                            </button>
                        ) : (
                            <div className="space-y-6 animate-fade-in">
                                <div className="text-center p-4 bg-black rounded-xl border border-purple-500/30">
                                    <p className="text-xs text-gray-500 uppercase font-bold mb-1">Your Room Code</p>
                                    <p data-testid="room-code-display" className="text-3xl font-mono font-black text-purple-400 tracking-widest">
                                        {roomCode}
                                    </p>
                                </div>
                                
                                <div className="flex flex-col gap-3">
                                    <p className="text-sm font-semibold text-gray-400">Visibility</p>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="visibility" 
                                                checked={isPublic} 
                                                onChange={() => setIsPublic(true)}
                                                className="w-4 h-4 accent-purple-500"
                                            />
                                            <span>Public</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="visibility" 
                                                checked={!isPublic} 
                                                onChange={() => setIsPublic(false)}
                                                className="w-4 h-4 accent-purple-500"
                                            />
                                            <span>Private</span>
                                        </label>
                                    </div>
                                </div>

                                <button
                                    onClick={handleCreateLobby}
                                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    Create Lobby
                                </button>
                            </div>
                        )}
                    </section>

                    {/* Joining Section */}
                    <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 space-y-6 flex flex-col">
                        <h2 className="text-2xl font-bold">Join a Game</h2>
                        
                        <form onSubmit={handleJoinByCode} className="space-y-4">
                            <input 
                                type="text"
                                value={joinCode}
                                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                                placeholder="Enter Room Code"
                                className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-center font-mono text-xl focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                            />
                            <button
                                type="submit"
                                disabled={!joinCode.trim()}
                                className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl transition-all disabled:opacity-50"
                            >
                                Join by Code
                            </button>
                        </form>

                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-800"></div></div>
                            <div className="relative flex justify-center text-xs uppercase"><span className="bg-black px-2 text-gray-500 font-bold">Or Join Public</span></div>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3 min-h-[200px]">
                            {publicGames.length === 0 ? (
                                <p className="text-center text-gray-600 text-sm mt-8 italic">No public games found. Host one!</p>
                            ) : (
                                publicGames.map((game) => (
                                    <button
                                        key={game.roomCode}
                                        onClick={() => handleJoinGame(game.roomCode)}
                                        className="w-full p-4 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 rounded-xl flex justify-between items-center group transition-all"
                                    >
                                        <div className="text-left">
                                            <p className="font-mono font-bold text-blue-400 group-hover:text-blue-300">{game.roomCode}</p>
                                            <p className="text-xs text-gray-500 italic">Hosted by {game.hostName}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold">{game.playerCount}/{game.maxPlayers} players</p>
                                            <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Join &rarr;</p>
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
