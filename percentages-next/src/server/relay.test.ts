/**
 * @jest-environment node
 */
import { createServer } from 'http';
import { Server } from 'socket.io';
import { io as Client, Socket as ClientSocket } from 'socket.io-client';

describe('Multiplayer Relay Server', () => {
    let io: Server;
    let clientSocket1: ClientSocket;
    let clientSocket2: ClientSocket;
    let port: number;
    let httpServer: import("http").Server;

    beforeAll((done) => {
        httpServer = createServer();
        io = new Server(httpServer, {
            cors: { origin: "*" }
        });
        httpServer.listen(() => {
            const address = httpServer.address();
            port = typeof address === 'string' ? 0 : address?.port || 0;

            io.on('connection', (socket) => {
                socket.onAny((event, data) => {
                    socket.broadcast.emit(event, data);
                });
            });
            done();
        });
    });

    afterAll((done) => {
        io.close();
        httpServer.close(done);
    });

    beforeEach((done) => {
        clientSocket1 = Client(`http://localhost:${port}`, {
            transports: ['websocket'],
            forceNew: true
        });
        clientSocket2 = Client(`http://localhost:${port}`, {
            transports: ['websocket'],
            forceNew: true
        });

        let connectedCount = 0;
        const onConnect = () => {
            connectedCount++;
            if (connectedCount === 2) done();
        };

        clientSocket1.on('connect', onConnect);
        clientSocket2.on('connect', onConnect);
    });

    afterEach(() => {
        if (clientSocket1.connected) clientSocket1.disconnect();
        if (clientSocket2.connected) clientSocket2.disconnect();
    });

    it('relays GAME_ANNOUNCEMENT from one client to another', (done) => {
        const testData = { roomCode: 'TEST-ROOM', hostName: 'Host' };

        clientSocket2.on('GAME_ANNOUNCEMENT', (data) => {
            expect(data).toEqual(testData);
            done();
        });

        clientSocket1.emit('GAME_ANNOUNCEMENT', testData);
    });

    it('relays HEARTBEAT to other clients', (done) => {
        const testData = { roomCode: 'TEST-ROOM' };

        clientSocket2.on('HEARTBEAT', (data) => {
            expect(data).toEqual(testData);
            done();
        });

        clientSocket1.emit('HEARTBEAT', testData);
    });
});
