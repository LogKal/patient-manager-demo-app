import Layout from './Layout'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'

const theme = createTheme({
    palette: {
        primary: {
            main: '#F37319',
        },
    },
})

function App() {
    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider>
                <Layout />
            </SnackbarProvider>
        </ThemeProvider>
    )
}

export default App
