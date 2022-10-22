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
    const [state, setState] = useState({
        anchorEl: null,
        selectedItem: null,
        selectedId: null,
    })

    const handleClick = (event, item) => {
        setState({
            ...state,
            anchorEl: event.currentTarget,
            selectedItem: item,
        })
    }

    const handleClose = (selectedId) => {
        setState({
            ...state,
            anchorEl: null,
            selectedId: selectedId != null ? selectedId : state.selectedId,
        })
    }

    const open = Boolean(state.anchorEl)
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
                                sx={{
                                    backgroundColor:
                                        state.selectedId &&
                                        state.selectedId === item.id
                                            ? '#e7e7e7'
                                            : null,
                                }}
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
                anchorEl={state.anchorEl}
                onClose={() => handleClose(null)}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <List>
                    {state.selectedItem &&
                        state.selectedItem[popOverKey].map((item, index) => (
                            <ListItem
                                key={'selectedItem' + index}
                                disablePadding
                            >
                                <ListItemButton
                                    onClick={(event) => {
                                        onPopoverClick(event, item)
                                        handleClose(state.selectedItem.id)
                                    }}
                                >
                                    <ListItemText
                                        primary={getPopOverText(item)}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                </List>
            </Popover>
        </MuiDrawer>
    )
}

export default Drawer
