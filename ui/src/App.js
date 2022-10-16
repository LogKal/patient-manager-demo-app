import Layout from './Layout'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { SnackbarProvider } from 'notistack'

//Material theme can be used to easily change look and feel of application/specific mui components
const theme = createTheme({
    palette: {
        primary: {
            main: '#F37319',
        },
    },
})

//Wrap layout in material ui theme and SnackbarProvider
//SnackbarProvider provides a context to add snacks globally with the use of useSnackbar hook
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
