import { render, screen, waitFor } from '@testing-library/react';
import LobbyPage from './page';
import { useRouter, useParams } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    useParams: jest.fn(),
    useSearchParams: jest.fn(() => ({
        get: jest.fn((key) => {
            if (key === 'host') return 'true';
            if (key === 'public') return 'true';
            return null;
        })
    }))
}));

// Mock socket.io-client
const mockSocket = {
    on: jest.fn(),
    emit: jest.fn(),
    off: jest.fn(),
    disconnect: jest.fn(),
    id: 'test-socket-id'
};

// Mock SocketContext
jest.mock('@/context/SocketContext', () => ({
    useSocket: () => ({
        socket: mockSocket,
        isConnected: true
    })
}));

describe('Lobby Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.setItem('playerName', 'Alex');
        (useParams as jest.Mock).mockReturnValue({ roomCode: 'SILVER-FALCON' });
    });

    it('renders the lobby with room code', () => {
        render(<LobbyPage />);
        expect(screen.getByText('SILVER-FALCON')).toBeInTheDocument();
        expect(screen.getByText(/Waiting for players/i)).toBeInTheDocument();
    });

    it('emits GAME_ANNOUNCEMENT if host and public', async () => {
        render(<LobbyPage />);
        
        await waitFor(() => {
            expect(mockSocket.emit).toHaveBeenCalledWith('GAME_ANNOUNCEMENT', expect.objectContaining({
                roomCode: 'SILVER-FALCON',
                public: true
            }));
        });
    });

    it('broadcasts heartbeat periodically if host', async () => {
        jest.useFakeTimers();
        render(<LobbyPage />);
        
        // Advance time to trigger heartbeat
        jest.advanceTimersByTime(5000);
        
        expect(mockSocket.emit).toHaveBeenCalledWith('HEARTBEAT', expect.objectContaining({
            roomCode: 'SILVER-FALCON'
        }));
        
        jest.useRealTimers();
    });
});
