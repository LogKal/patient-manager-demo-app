import { render, screen } from '@testing-library/react'
import App from './App'

test('App renders with expected text in appbar', () => {
    render(<App />)
    const linkElement = screen.getByText(/Provider Patient Manager/i)
    expect(linkElement).toBeInTheDocument()
})
