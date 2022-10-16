import { useForm } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { yupResolver } from '@hookform/resolvers/yup'

import * as yup from 'yup'

//form validation
const validationSchema = yup
    .object({
        name: yup.string().required('Name is required'),
        phoneNumber: yup
            .string()
            .matches(
                new RegExp('[0-9]{10}'),
                'Phone number must be 3 digit area code followed by 7 digit number'
            )
            .required(),
        ssn: yup
            .string()
            .matches(new RegExp('[0-9]{9}'), 'SSN must be 9 digits')
            .required(),
    })
    .required()

const CreatePatientForm = ({ onCreatePatient }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(validationSchema) })

    const onSubmit = (newPatient) => {
        onCreatePatient(newPatient)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box
                sx={{
                    display: 'grid',
                    p: 1,
                    '& .MuiTextField-root': { m: 1 },
                }}
            >
                <TextField label="Name" {...register('name')} />
                <TextField label="Phone Number" {...register('phoneNumber')} />
                <TextField label="SSN" {...register('ssn')} />

                {errors && (
                    <div>
                        {Object.entries(errors).map((error, index) => {
                            return (
                                <p key={error[0]} style={{ color: 'red' }}>
                                    {error[1].message}
                                </p>
                            )
                        })}
                    </div>
                )}

                <Button type="submit" variant="outlined">
                    submit
                </Button>
            </Box>
        </form>
    )
}

export default CreatePatientForm
