import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Drawer from './Drawer'

test('Drawer renders, items are show, submenu pops open on click and closes on click', () => {
    render(
        <Drawer
            items={[
                {
                    name: 'test1',
                    popover: ['sub menu A', 'sub menu B'],
                },
                {
                    name: 'test2',
                    popover: ['sub menu C', 'sub menu D', 'sub menu E'],
                },
            ]}
            textKey={'name'}
            popOverKey={'popover'}
            getPopOverText={(popItem) => popItem}
            width={'200px'}
            onPopoverClick={(e, clickedItem) => {}}
        />
    )
    //make sure main menu button is there
    const menuButton = screen.getByText(/test1/i)
    expect(menuButton).toBeInTheDocument()

    //click menu item
    userEvent.click(menuButton)

    //menu item click causes popover items to render
    const subMenuItem = screen.getByText(/sub menu A/i)
    expect(subMenuItem).toBeInTheDocument()

    //click popover button
    userEvent.click(subMenuItem)

    //sub menu should close
    waitFor(() =>
        expect(screen.getByText(/sub menu A/i).not.toBeInTheDocument())
    )
})
