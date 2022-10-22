import React, { useEffect, useState } from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Drawer from './components/Drawer'
import LinearProgress from '@mui/material/LinearProgress'
import ProviderPage from './pages/ProviderPage'

const drawerWidth = 200

//creates the application layout
const Layout = () => {
    //list of hospitals used to load Drawers
    const [hospitals, setHospitals] = useState([])

    //current provider in main
    const [selectedProvider, setSelectedProvider] = useState(null)

    //on component mount get all hospitals from backend
    useEffect(() => {
        getHospitals()
    }, [])

    const getHospitals = () => {
        fetch('/api/hospitals/', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((hospitals) => {
                setHospitals(hospitals)
            })
    }

    if (hospitals) {
        return (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} // always appear above the drawer
                >
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            Provider Patient Manager
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Drawer
                    items={hospitals}
                    textKey="name"
                    popOverKey="providers"
                    tooltipKey="description"
                    getPopOverText={(provider) =>
                        `${provider.name} - ${provider.specialty}`
                    }
                    width={drawerWidth}
                    onPopoverClick={(e, provider) => {
                        setSelectedProvider(provider)
                    }}
                />
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, height: '100vh' }}
                >
                    <Toolbar />
                    {selectedProvider && (
                        <ProviderPage
                            selectedProviderId={selectedProvider.id}
                        />
                    )}
                </Box>
            </Box>
        )
    } else {
        return <LinearProgress />
    }
}

export default Layout
