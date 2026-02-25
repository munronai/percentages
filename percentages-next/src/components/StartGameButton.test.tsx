import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import StartGameButton from './StartGameButton'

// Mock useRouter
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
    useRouter: () => ({ push: mockPush }),
}))

beforeEach(() => {
    mockPush.mockClear()
    localStorage.clear()
})

test('is disabled when user is not signed up', () => {
    render(<StartGameButton />)
    const button = screen.getByRole('button', { name: /start solo game/i })
    expect(button).toBeDisabled()
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
    expect(button).not.toBeDisabled()

    await userEvent.hover(button)
    expect(screen.queryByText(/sign up first/i)).not.toBeInTheDocument()
})

test('clicking enabled button triggers start action', async () => {
    localStorage.setItem('playerName', 'Alex')
    render(<StartGameButton />)
    const button = screen.getByRole('button', { name: /start solo game/i })

    await userEvent.click(button)
    expect(mockPush).toHaveBeenCalledWith('/game/solo')
})
