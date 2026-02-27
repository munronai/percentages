import { render, screen, fireEvent } from '@testing-library/react'
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

test('shows error when name is too short', async () => {
    render(<SignupForm />)
    const input = screen.getByLabelText(/display name/i)
    await userEvent.type(input, 'Al')
    await userEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(screen.getByText(/name must be at least 3 characters long/i)).toBeInTheDocument()
    expect(mockPush).not.toHaveBeenCalled()
})

test('shows error when name contains invalid characters', async () => {
    render(<SignupForm />)
    const input = screen.getByLabelText(/display name/i)
    await userEvent.type(input, 'Alex!')
    await userEvent.click(screen.getByRole('button', { name: /continue/i }))
    expect(screen.getByText(/name can only contain letters, numbers, and spaces/i)).toBeInTheDocument()
    expect(mockPush).not.toHaveBeenCalled()
})

test('has max length attribute set to 15', () => {
    render(<SignupForm />)
    const input = screen.getByLabelText(/display name/i)
    expect(input).toHaveAttribute('maxLength', '15')
})

test('saves name and redirects on valid submission', async () => {
    localStorage.clear()
    render(<SignupForm />)
    await userEvent.type(screen.getByLabelText(/display name/i), 'Alex')
    await userEvent.click(screen.getByRole('button', { name: /continue/i }))

    expect(localStorage.getItem('playerName')).toBe('Alex')
    expect(mockPush).toHaveBeenCalledWith('/home')
})

test('redirects immediately if user already exists', () => {
    localStorage.setItem('playerName', 'Alex')
    render(<SignupForm />)
    expect(mockPush).toHaveBeenCalledWith('/home')
})
