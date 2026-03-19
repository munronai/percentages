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

// In-memory mapping of socket IDs to player names and room codes
const socketRegistry = new Map<string, { playerName?: string, roomCode?: string }>();

io.on('connection', (socket) => {
    console.log(`[Relay] + CONNECTED: ${socket.id}`);
    socketRegistry.set(socket.id, {});

    socket.on("JOIN_ROOM", async (data: { roomCode: string, playerName: string }) => {
        const { roomCode, playerName } = data;
        socket.join(roomCode);
        socketRegistry.set(socket.id, { playerName, roomCode });
        
        console.log(`[Relay] > JOIN: ${playerName} (${socket.id}) joined room ${roomCode}`);
        
        // Log activity
        await handleSocketEvent("JOIN_ROOM", data, socket.id);

        // Notify others in the room
        socket.to(roomCode).emit("PLAYER_JOINED", { playerName, id: socket.id });
    });

    socket.onAny(async (event, data) => {
        if (event === "JOIN_ROOM" || event === "disconnect") return;

        const info = socketRegistry.get(socket.id);
        const logContext = {
            ...data,
            senderId: socket.id,
            playerName: info?.playerName,
            roomCode: data.roomCode || info?.roomCode
        };

        // Log to file
        await handleSocketEvent(event, logContext, socket.id);

        // Detailed console output
        console.log(`[Relay] ~ MSG: [${event}] from ${info?.playerName || socket.id} in room ${logContext.roomCode}`);

        // Broadcast to the specific room if roomCode is available, otherwise global broadcast
        if (logContext.roomCode) {
            socket.to(logContext.roomCode).emit(event, data);
        } else {
            socket.broadcast.emit(event, data);
        }
    });

    socket.on('disconnect', () => {
        const info = socketRegistry.get(socket.id);
        console.log(`[Relay] - DISCONNECTED: ${info?.playerName || socket.id} (${socket.id})`);
        socketRegistry.delete(socket.id);
    });
});

httpServer.listen(PORT, () => {
    console.log(`[Relay] Multiplayer WebSocket relay running on port ${PORT}`);
});
