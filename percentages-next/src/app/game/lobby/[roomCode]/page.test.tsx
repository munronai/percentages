import { render, screen, waitFor } from '@testing-library/react';
import LobbyPage from './page';
import { useRouter, useParams } from 'next/navigation';
import userEvent from '@testing-library/user-event';

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
    let mockPush: jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.setItem('playerName', 'Alex');
        (useParams as jest.Mock).mockReturnValue({ roomCode: 'SILVER-FALCON' });
        mockPush = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
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

    it('emits LEAVE_ROOM and navigates back on Leave Lobby click', async () => {
        render(<LobbyPage />);

        const leaveBtn = screen.getByRole('button', { name: /Leave Lobby/i });
        await userEvent.click(leaveBtn);

        expect(mockSocket.emit).toHaveBeenCalledWith('LEAVE_ROOM', expect.objectContaining({
            roomCode: 'SILVER-FALCON'
        }));
        expect(mockPush).toHaveBeenCalledWith('/multiplayer');
    });

    it('enables Start Game button for host when 2+ players are present', async () => {
        render(<LobbyPage />);
        const startBtn = screen.getByRole('button', { name: /START GAME/i });
        expect(startBtn).toBeDisabled();
    });
});
