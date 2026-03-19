import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MultiplayerPage from './page';


// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush
    })
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

describe('Multiplayer Selection Page', () => {
    beforeEach(() => {
        mockPush.mockClear();
        jest.clearAllMocks();
        localStorage.setItem('playerName', 'Alex');
    });

    it('renders Host Game and Join Game options', () => {
        render(<MultiplayerPage />);
        expect(screen.getByRole('button', { name: /Host New Game/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter Room Code/i)).toBeInTheDocument();
    });

    it('generates a room code when clicking Host New Game', async () => {
        render(<MultiplayerPage />);
        const hostBtn = screen.getByRole('button', { name: /Host New Game/i });
        await userEvent.click(hostBtn);

        // Should see a room code generated (two words with hyphen)
        const roomCodeElement = await screen.findByTestId('room-code-display');
        expect(roomCodeElement.textContent).toMatch(/^[A-Z]+-[A-Z]+$/);
    });

    it('allows toggling between Public and Private', async () => {
        render(<MultiplayerPage />);
        await userEvent.click(screen.getByRole('button', { name: /Host New Game/i }));
        
        const publicBtn = screen.getByRole('radio', { name: /Public/i });
        const privateBtn = screen.getByRole('radio', { name: /Private/i });
        
        expect(publicBtn).toBeChecked();
        await userEvent.click(privateBtn);
        expect(privateBtn).toBeChecked();
        expect(publicBtn).not.toBeChecked();
    });

    it('navigates to the lobby when Host is confirmed', async () => {
        render(<MultiplayerPage />);
        await userEvent.click(screen.getByRole('button', { name: /Host New Game/i }));
        const startBtn = screen.getByRole('button', { name: /Create Lobby/i });
        await userEvent.click(startBtn);

        expect(mockPush).toHaveBeenCalledWith(expect.stringContaining('/game/lobby/'));
    });

    it('displays discovered public games', async () => {
        // Mock the socket.on implementation to simulate receiving a game announcement
        let announcementCallback: (data: Record<string, unknown>) => void;
        mockSocket.on.mockImplementation((event: string, cb: (data: Record<string, unknown>) => void) => {
            if (event === 'GAME_ANNOUNCEMENT') announcementCallback = cb;
        });

        render(<MultiplayerPage />);

        // Simulate receiving an announcement
        await waitFor(() => {
            if (announcementCallback) {
                announcementCallback({
                    roomCode: 'GOLDEN-TIGER',
                    hostName: 'Charlie',
                    playerCount: 3,
                    maxPlayers: 100
                });
            }
        });

        expect(await screen.findByText('GOLDEN-TIGER')).toBeInTheDocument();
        expect(screen.getByText(/Hosted by Charlie/i)).toBeInTheDocument();
        expect(screen.getByText('3/100 players')).toBeInTheDocument();
    });
});
