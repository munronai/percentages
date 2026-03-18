import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StartGameButton from './StartGameButton'
import { useRouter } from 'next/navigation';
import { getSession, clearSession } from '@/lib/session';

// Mock useRouter
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: mockPush }),
}))

// Mock session handling
jest.mock('@/lib/session', () => ({
    getSession: jest.fn(),
    clearSession: jest.fn(),
}));

// Mock next/link
jest.mock('next/link', () => {
    const MockLink = ({ children, href }: { children: React.ReactNode; href: string }) => {
        return <a href={href}>{children}</a>;
    };
    MockLink.displayName = 'Link';
    return MockLink;
});

beforeEach(() => {
    mockPush.mockClear()
    localStorage.clear()
    jest.clearAllMocks()
    ;(getSession as jest.Mock).mockReturnValue(null)
})

test('is disabled when user is not signed up and shows sign up link', async () => {
    render(<StartGameButton />)
    const button = screen.getByRole('button', { name: /start solo game/i })
    expect(button).toBeDisabled()

    // Check for sign up link
    const link = screen.getByRole('link', { name: /sign up/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
})

test('shows tooltip when disabled and hovered', async () => {
    render(<StartGameButton />)
    const button = screen.getByRole('button', { name: /start solo game/i })
    await userEvent.hover(button)
    expect(await screen.findByText(/sign up first/i)).toBeInTheDocument()
})

test('is enabled when user is signed up and no tooltip on hover', async () => {
    localStorage.setItem('playerName', 'Alex')
    render(<StartGameButton />)
    const button = screen.getByRole('button', { name: /start solo game/i })

    // Wait for useEffect to run and update state
    await waitFor(() => {
        expect(button).not.toBeDisabled()
    })

    await userEvent.hover(button)
    expect(screen.queryByText(/sign up first/i)).not.toBeInTheDocument()
})

test('clicking enabled button triggers start action', async () => {
    localStorage.setItem('playerName', 'Alex')
    render(<StartGameButton />)
    const button = screen.getByRole('button', { name: /start solo game/i })

    await waitFor(() => {
        expect(button).not.toBeDisabled()
    })

    await userEvent.click(button)
    expect(mockPush).toHaveBeenCalledWith('/game/solo')
})

test('clears existing ended session when starting a new game', async () => {
    localStorage.setItem('playerName', 'Alex')
    ;(getSession as jest.Mock).mockReturnValue({ status: 'ended', score: 10 })
    
    render(<StartGameButton />)
    const button = screen.getByRole('button', { name: /start solo game/i })

    await waitFor(() => {
        expect(button).not.toBeDisabled()
    })

    await userEvent.click(button)
    
    expect(clearSession).toHaveBeenCalled()
    expect(mockPush).toHaveBeenCalledWith('/game/solo')
})

test('shows Resume Game if session is active', async () => {
    localStorage.setItem('playerName', 'Alex')
    ;(getSession as jest.Mock).mockReturnValue({ status: 'playing', score: 5 })
    
    render(<StartGameButton />)
    
    await waitFor(() => {
        expect(screen.getByRole('button', { name: /resume game/i })).toBeInTheDocument()
    })
})
