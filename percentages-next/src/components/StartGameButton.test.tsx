import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StartGameButton from './StartGameButton'

// Mock useRouter
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: mockPush }),
}))

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
    // Hover the wrapper or button. Since button is disabled, events might be tricky,
    // but the wrapper handles it.
    // We hover the button, which is inside the wrapper.
    const button = screen.getByRole('button', { name: /start solo game/i })
    await userEvent.hover(button)
    expect(await screen.findByText(/sign up first/i)).toBeInTheDocument()
})

test('shows tooltip when disabled and focused via keyboard', async () => {
    render(<StartGameButton />)
    // Focus the wrapper (it has tabIndex when disabled)
    // Finding by role might be hard as it's a div. We can rely on userEvent.tab()
    await userEvent.tab()

    // The wrapper should be focused.
    // Check if tooltip appears.
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

    // Sign up link should not be present
    expect(screen.queryByRole('link', { name: /sign up/i })).not.toBeInTheDocument()
})

test('clicking enabled button triggers start action', async () => {
    localStorage.setItem('playerName', 'Alex')
    render(<StartGameButton />)
    const button = screen.getByRole('button', { name: /start solo game/i })

    // Wait for enabled state
    await waitFor(() => {
        expect(button).not.toBeDisabled()
    })

    await userEvent.click(button)
    expect(mockPush).toHaveBeenCalledWith('/game/solo')
})
