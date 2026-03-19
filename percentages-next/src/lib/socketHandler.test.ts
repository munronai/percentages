import { handleSocketEvent } from './socketHandler';
import { logActivity } from './logger';

jest.mock('./logger', () => ({
    logActivity: jest.fn().mockResolvedValue(undefined)
}));

describe('Socket Event Handler', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('logs GAME_ANNOUNCEMENT messages', async () => {
        const data = { roomCode: 'SILVER-FALCON', hostName: 'Alex' };
        await handleSocketEvent('GAME_ANNOUNCEMENT', data, 'socket-123');

        expect(logActivity).toHaveBeenCalledWith(
            'WebSocket Message: GAME_ANNOUNCEMENT',
            expect.objectContaining({
                roomCode: 'SILVER-FALCON',
                sender: 'socket-123'
            })
        );
    });

    it('logs HEARTBEAT messages', async () => {
        const data = { roomCode: 'SILVER-FALCON' };
        await handleSocketEvent('HEARTBEAT', data, 'socket-123');

        expect(logActivity).toHaveBeenCalledWith(
            'WebSocket Message: HEARTBEAT',
            expect.objectContaining({ roomCode: 'SILVER-FALCON' })
        );
    });

    it('logs JOIN_ROOM messages', async () => {
        const data = { roomCode: 'SILVER-FALCON', playerName: 'Charlie' };
        await handleSocketEvent('JOIN_ROOM', data, 'socket-456');

        expect(logActivity).toHaveBeenCalledWith(
            'WebSocket Message: JOIN_ROOM',
            expect.objectContaining({ playerName: 'Charlie' })
        );
    });
});
