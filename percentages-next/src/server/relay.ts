import { createServer } from 'http';
import { Server } from 'socket.io';
import { handleSocketEvent } from '../lib/socketHandler';

const PORT = process.env.RELAY_PORT || 3001;
const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

interface LobbyInfo {
    roomCode: string;
    hostName: string;
    playerCount: number;
    maxPlayers: number;
    lastHeartbeat: number;
    hostSocketId: string;
}

// Global registry of active public lobbies
const lobbyRegistry = new Map<string, LobbyInfo>();
// Mapping of socket IDs to player names and room codes
const socketRegistry = new Map<string, { playerName?: string, roomCode?: string }>();

// Cleanup stale lobbies every 5 seconds
setInterval(() => {
    const now = Date.now();
    for (const [code, lobby] of lobbyRegistry.entries()) {
        if (now - lobby.lastHeartbeat > 10000) {
            console.log(`[Relay] ! PRUNE: Room ${code} removed due to heartbeat timeout`);
            lobbyRegistry.delete(code);
            // Notify discovery channel that a game is gone
            io.emit("GAME_REMOVED", { roomCode: code });
        }
    }
}, 5000);

io.on('connection', (socket) => {
    console.log(`[Relay] + CONNECTED: ${socket.id}`);
    socketRegistry.set(socket.id, {});

    socket.on("JOIN_ROOM", async (data: { roomCode: string, playerName: string }) => {
        const { roomCode, playerName } = data;
        socket.join(roomCode);
        socketRegistry.set(socket.id, { playerName, roomCode });
        
        console.log(`[Relay] > JOIN: ${playerName} (${socket.id}) joined room ${roomCode}`);
        
        // Update player count in registry if it's a known lobby
        const lobby = lobbyRegistry.get(roomCode);
        if (lobby) {
            lobby.playerCount++;
            io.emit("GAME_ANNOUNCEMENT", lobby);
        }

        await handleSocketEvent("JOIN_ROOM", data, socket.id);
        socket.to(roomCode).emit("PLAYER_JOINED", { playerName, id: socket.id });
    });

    socket.on("LEAVE_ROOM", async (data: { roomCode: string }) => {
        const { roomCode } = data;
        const info = socketRegistry.get(socket.id);
        
        socket.leave(roomCode);
        if (info) info.roomCode = undefined;

        const lobby = lobbyRegistry.get(roomCode);
        if (lobby) {
            lobby.playerCount = Math.max(0, lobby.playerCount - 1);
            io.emit("GAME_ANNOUNCEMENT", lobby);
        }

        console.log(`[Relay] < LEAVE: ${info?.playerName || socket.id} left room ${roomCode}`);
        socket.to(roomCode).emit("PLAYER_LEFT", { id: socket.id });
    });

    socket.on("GAME_ANNOUNCEMENT", (data: LobbyInfo) => {
        console.log(`[Relay] ! ANNOUNCE: Room ${data.roomCode} hosted by ${data.hostName}`);
        lobbyRegistry.set(data.roomCode, {
            ...data,
            lastHeartbeat: Date.now(),
            hostSocketId: socket.id
        });
        // Broadcast to everyone for discovery
        io.emit("GAME_ANNOUNCEMENT", lobbyRegistry.get(data.roomCode));
    });

    socket.on("HEARTBEAT", (data: { roomCode: string }) => {
        const lobby = lobbyRegistry.get(data.roomCode);
        if (lobby) {
            lobby.lastHeartbeat = Date.now();
        }
    });

    socket.on("DISCOVERY_REQUEST", () => {
        const activeGames = Array.from(lobbyRegistry.values());
        console.log(`[Relay] ? DISCOVERY: Sending ${activeGames.length} games to ${socket.id}`);
        socket.emit("DISCOVERY_RESPONSE", activeGames);
    });

    socket.onAny(async (event, data) => {
        // Skip specialized handlers
        const internalEvents = ["JOIN_ROOM", "LEAVE_ROOM", "GAME_ANNOUNCEMENT", "HEARTBEAT", "DISCOVERY_REQUEST", "disconnect"];
        if (internalEvents.includes(event)) return;

        const safeData = data || {};
        const info = socketRegistry.get(socket.id);
        const logContext = {
            ...safeData,
            senderId: socket.id,
            playerName: info?.playerName,
            roomCode: safeData.roomCode || info?.roomCode
        };

        await handleSocketEvent(event, logContext, socket.id);
        console.log(`[Relay] ~ MSG: [${event}] from ${info?.playerName || socket.id} in room ${logContext.roomCode}`);

        if (logContext.roomCode) {
            socket.to(logContext.roomCode).emit(event, data);
        } else {
            socket.broadcast.emit(event, data);
        }
    });

    socket.on('disconnect', () => {
        const info = socketRegistry.get(socket.id);
        console.log(`[Relay] - DISCONNECTED: ${info?.playerName || socket.id} (${socket.id})`);
        
        if (info?.roomCode) {
            const lobby = lobbyRegistry.get(info.roomCode);
            if (lobby) {
                lobby.playerCount = Math.max(0, lobby.playerCount - 1);
                // If the host disconnected, we could trigger migration here, 
                // but for now we just update count or let heartbeat prune it.
                io.emit("GAME_ANNOUNCEMENT", lobby);
            }
            socket.to(info.roomCode).emit("PLAYER_LEFT", { id: socket.id });
        }
        
        socketRegistry.delete(socket.id);
    });
});

httpServer.listen(PORT, () => {
    console.log(`[Relay] Smart Multiplayer WebSocket relay running on port ${PORT}`);
});
