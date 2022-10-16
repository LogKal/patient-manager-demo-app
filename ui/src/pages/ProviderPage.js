import { useState } from 'react'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Toolbar from '@mui/material/Toolbar'
import Modal from '@mui/material/Modal'
import CreatePatientForm from './CreatePatientForm'
import { useSnackbar } from 'notistack'

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
}

const ProviderPage = ({ selectedProvider, handleUpdateProvider }) => {
    //modal open/closed
    const [open, setOpen] = useState(false)
    const { enqueueSnackbar } = useSnackbar()

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const onCreatePatient = (newPatient) => {
        fetch(
            `${process.env.REACT_APP_API_URL}/providers/add-patient/${selectedProvider.id}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPatient),
            }
        )
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.status && responseJson.status === 500) {
                    throw responseJson.message
                } else {
                    handleClose()
                    handleUpdateProvider(responseJson)
                    enqueueSnackbar('Successfully added user', {
                        //add success to snackbar
                        variant: 'success',
                    })
                }
            })
            .catch((ex) => {
                enqueueSnackbar(ex, { variant: 'error' }) //add exception message from server to snackbar
                console.error(ex)
            })
    }

    return (
        <Box>
            <Box sx={{ display: 'inline-flex', p: 3 }}>
                <Typography variant="h5" color="inherit" noWrap>
                    {`${selectedProvider.name} - ${selectedProvider.specialty}`}
                </Typography>
                <Button
                    startIcon={<AddIcon />}
                    sx={{ ml: 3 }}
                    variant="outlined"
                    onClick={handleOpen}
                >
                    Add Patient
                </Button>
            </Box>
            <div style={{ height: 400, width: '100%' }}>
                <Toolbar
                    sx={{
                        backgroundColor: 'primary.light',
                        minHeight: '36px !important',
                    }}
                >
                    <Typography variant="h6" color="inherit" noWrap>
                        Patients
                    </Typography>
                </Toolbar>
                <DataGrid
                    rows={selectedProvider.patients}
                    columns={[
                        {
                            field: 'id',
                            headerName: 'ID',
                            width: 70,
                        },
                        {
                            field: 'name',
                            headerName: 'Name',
                            flex: 1,
                        },
                        {
                            field: 'phoneNumber',
                            headerName: 'Phone Number',
                            flex: 1,
                        },
                    ]}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Add New Patient
                    </Typography>
                    <CreatePatientForm onCreatePatient={onCreatePatient} />
                </Box>
            </Modal>
        </Box>
    )
}

export default ProviderPage
