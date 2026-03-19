
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SignupForm from './SignupForm'

// Mock useRouter
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: mockPush }),
}))

beforeEach(() => {
    mockPush.mockClear()
    localStorage.clear()
})

test('renders signup form with input and button', () => {
    render(<SignupForm />)
    expect(screen.getByLabelText(/display name/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument()
})

test('shows error when submitting empty name', async () => {
    render(<SignupForm />)
    await userEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(screen.getByText(/name is required/i)).toBeInTheDocument()
})

test('saves name, logs login, and redirects on valid submission', async () => {
    // Mock fetch for logging
    global.fetch = jest.fn().mockResolvedValue({ ok: true });

    localStorage.clear()
    render(<SignupForm />)
    await userEvent.type(screen.getByLabelText(/display name/i), 'Alex')
    await userEvent.click(screen.getByRole('button', { name: /continue/i }))

    expect(localStorage.getItem('playerName')).toBe('Alex')
    expect(global.fetch).toHaveBeenCalledWith('/api/admin/log', expect.objectContaining({
        method: 'POST',
        body: expect.stringContaining('"message":"User Login"')
    }));
    expect(mockPush).toHaveBeenCalledWith('/home')
})

test('redirects immediately if user already exists', () => {
    localStorage.setItem('playerName', 'Alex')
    render(<SignupForm />)
    expect(mockPush).toHaveBeenCalledWith('/home')
})
