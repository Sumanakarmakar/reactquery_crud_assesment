import React from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from '../Common/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import ButtonLoader from '../Common/ButtonLoader';
import { forgetPw } from '../Api/Functions/ForgetPW';
import { toast } from 'react-toastify';

const defaultTheme=createTheme()

const ForgetPassword = () => {
    const navigate=useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors}
    }=useForm()

    const { mutate, isPending}=useMutation({
        mutationFn: forgetPw,
        onSuccess: (data)=>{
            console.log("hvdkhfvksh",data);
            toast.success(data?.message)
            navigate('/login')
        },
        onError: (err)=>{
            toast.error(err?.message)
            console.log("error detected",err);
        }
    })

    const onSubmits=(data)=>{
        mutate(data)
    }

    console.log(watch(['email','first_school','password']));

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
                                Set New Password
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit(onSubmits)} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Registered Email Address"
                                    {...register("email", {
                                        required: true
                                    })}

                                />
                                {errors?.email?.type === 'required' && <p>This field is required</p>}
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="First_School"
                                    {...register("first_school", {
                                        required: true
                                    })}

                                />
                                {errors?.first_school?.type === 'required' && <p>This field is required</p>}
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="New Password"
                                    type="password"
                                    {...register("newPassword", {
                                        required: true
                                    })}

                                />
                                {errors?.newPassword?.type === 'required' && <p>This field is Required</p>}

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {isPending ? <><ButtonLoader /></> : <>Confirm</>}
                                    

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

export default ForgetPassword