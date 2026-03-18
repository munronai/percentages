import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from './page';
import { useRouter } from 'next/navigation';
import { clearSession } from '@/lib/session';

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush
    })
}));

// Mock session handling
jest.mock('@/lib/session', () => ({
    getSession: jest.fn(),
    clearSession: jest.fn(),
}));

describe('Home Page', () => {
    beforeEach(() => {
        mockPush.mockClear();
        localStorage.clear();
        jest.clearAllMocks();
    });

    it('renders the welcome message', () => {
        render(<HomePage />);
        expect(screen.getByText(/Welcome Home/i)).toBeInTheDocument();
    });

    it('clears localStorage and redirects to root on Logout', async () => {
        localStorage.setItem('playerName', 'Alex');
        
        render(<HomePage />);
        
        const logoutBtn = screen.getByRole('button', { name: /Logout/i });
        await userEvent.click(logoutBtn);

        expect(localStorage.getItem('playerName')).toBeNull();
        expect(clearSession).toHaveBeenCalled();
        expect(mockPush).toHaveBeenCalledWith('/');
    });

    it('navigates to /multiplayer on Multiplayer button click', async () => {
        render(<HomePage />);
        const multiBtn = screen.getByRole('button', { name: /Multiplayer/i });
        await userEvent.click(multiBtn);
        expect(mockPush).toHaveBeenCalledWith('/multiplayer');
    });
});
