import { useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MuiDrawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Popover from '@mui/material/Popover'
import Tooltip from '@mui/material/Tooltip'

export const Drawer = ({
    items,
    width,
    onPopoverClick,
    textKey,
    popOverKey,
    getPopOverText,
    tooltipKey,
}) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)

    const handleClick = (event, item) => {
        setAnchorEl(event.currentTarget)
        setSelectedItem(item)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    return (
        <MuiDrawer
            anchor="left"
            open={true}
            variant="permanent"
            sx={{
                width: width,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: width,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Box sx={{ overflow: 'auto' }}>
                <Toolbar />
                <List>
                    {items &&
                        items.map((item, index) => (
                            <ListItem
                                key={item[textKey] + index}
                                disablePadding
                            >
                                <Tooltip
                                    title={item[tooltipKey]}
                                    placement="right"
                                >
                                    <ListItemButton
                                        onClick={(e) => handleClick(e, item)}
                                    >
                                        <ListItemText primary={item[textKey]} />
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        ))}
                </List>
            </Box>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <List>
                    {selectedItem &&
                        selectedItem[popOverKey].map((i, ind) => (
                            <ListItem key={'selectedItem' + ind} disablePadding>
                                <ListItemButton
                                    onClick={(e) => {
                                        onPopoverClick(e, i)
                                        handleClose()
                                    }}
                                >
                                    <ListItemText primary={getPopOverText(i)} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                </List>
            </Popover>
        </MuiDrawer>
    )
}

export default Drawer
