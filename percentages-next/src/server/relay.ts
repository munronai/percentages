import { createServer } from 'http';
import { Server } from 'socket.io';
import { handleSocketEvent } from '../lib/socketHandler';

const PORT = process.env.RELAY_PORT || 3001;
const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*", // In production, restrict this to your frontend domain
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log(`[Relay] New connection: ${socket.id}`);

    // Standard relay: catch any event and broadcast to other peers in the same logical "room" 
    // or globally for discovery.
    socket.onAny(async (event, data) => {
        // Log the activity using our implementation from US-AD1
        await handleSocketEvent(event, data, socket.id);

        // Broadcast to all other connected clients
        socket.broadcast.emit(event, data);
    });

    socket.on('disconnect', () => {
        console.log(`[Relay] Disconnected: ${socket.id}`);
    });
});

httpServer.listen(PORT, () => {
    console.log(`[Relay] Multiplayer WebSocket relay running on port ${PORT}`);
});
