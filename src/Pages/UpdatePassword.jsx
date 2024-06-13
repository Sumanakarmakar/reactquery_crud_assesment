import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { updatepassword } from '../Api/Functions/UpdatePW'
import { toast } from 'react-toastify'
import Layout from '../Common/Layout'
import { Box, Button, Container, CssBaseline, Grid, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'
import ButtonLoader from '../Common/ButtonLoader'
import { Link, useNavigate } from 'react-router-dom'

const defaultTheme = createTheme()

const UpdatePassword = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const memberId = user._id
    const navigate=useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const { mutate, isPending } = useMutation({
        mutationFn: updatepassword,
        onSuccess: (data) => {
            console.log("update successful", data);
            toast.success(data?.msg)
            navigate('/')
        },
        onError: (err) => {
            console.log("err detected", err);
        }
    })

    const onSubmitPwchange = (data) => {
        mutate(data)
    }
    return (
        <>

            <Layout>
                <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >

                            <Typography component="h1" variant="h5">
                                Update Your Password
                            </Typography>
                            <Box component="form"
                                onSubmit={handleSubmit(onSubmitPwchange)}
                                noValidate sx={{ mt: 1 }}>
                                <input
                                    type='hidden'
                                    value={memberId}
                                    {...register("user_id")}
                                />

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="New Password"
                                    type="password"
                                    {...register("password", {
                                        required: true
                                    })}

                                />
                                {errors?.password?.type === 'required' && <p>This field is Required</p>}

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {isPending ? <><ButtonLoader /></> : <>Save Changes</>}


                                </Button>
                                <Grid container>
                                    <Grid item>
                                        <Link to="/login" variant="body2">
                                            {"Go to Login Page"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </Layout>

        </>
    )
}

export default UpdatePassword