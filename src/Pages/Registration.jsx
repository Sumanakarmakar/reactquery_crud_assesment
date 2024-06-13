import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
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
import { useDispatch, useSelector } from 'react-redux';
import { redirectToLoginPage, registration } from '../Redux/AuthSlice';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import ButtonLoader from '../Common/ButtonLoader';

const defaultTheme = createTheme();

const Registration = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [image, setImage] = useState()
    console.log(image);
    const { redirectToLogin } = useSelector((state) => state?.auth)

    const imageChange = (e) => {
        setImage(e.target.files[0])
        console.log(e.target.files)
    }

    const { mutate, isPending } = useMutation({
        mutationFn: (data) => dispatch(registration(data)),
        onSuccess: (data) => {
            console.log("registration successful", data);

        },
        onError: (err) => {
            console.log("error detected", err);
        }
    })

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm()

    const onSubmitRegister = (data) => {
        try {
            let formdata = new FormData()
            formdata.append("name", data.name)
            formdata.append("email", data.email)
            formdata.append("mobile", data.mobile)
            formdata.append("password", data.password)
            formdata.append("first_school", data.first_school)
            // formdata.append("image", document.getElementById('image').files[0])
            formdata.append("image", image)
            mutate(formdata)
            // console.log(formdata)


        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const redirectUser = () => {
            let name = localStorage.getItem('name')
            let isInLoginPage = window.location.pathname.toLowerCase() === '/registration'
            if (name !== null && name !== undefined && name !== "") {
                isInLoginPage && navigate('/login')
            }
        }
        redirectUser()
    }, [redirectToLogin])

    console.log(watch(['name', 'email', 'mobile', 'password', 'first_school', 'image']));

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
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit(onSubmitRegister)} noValidate sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Your Name"
                                            {...register("name", {
                                                required: true
                                            })}

                                        />
                                        {errors?.name?.type === 'required' && <p>This field is required</p>}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Email Address"
                                            type='email'
                                            {...register("email", {
                                                required: true
                                            })}

                                        />
                                        {errors?.email?.type === 'required' && <p>This field is required</p>}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Mobile No"
                                            {...register("mobile", {
                                                required: true
                                            })}


                                        />
                                        {errors?.mobile?.type === 'required' && <p>This field is required</p>}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Password"
                                            type="password"
                                            {...register("password", {
                                                required: true
                                            })}

                                        />
                                        {errors?.password?.type === 'required' && <p>This field is required</p>}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="first_school"
                                            {...register("first_school", {
                                                required: true
                                            })}


                                        />
                                        {errors?.first_school?.type === 'required' && <p>This field is required</p>}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField required fullWidth type="file" id='image' name='image' accept='image/*' onChange={imageChange}


                                        />
                                        {/* {
                                            img && <img src={img} alt='image' />
                                        }
                                        {errors?.image?.type === 'required' && <p>This field is required</p>} */}
                                        {
                                            image !== null && image !== undefined && image !== "" ? (
                                                <>
                                                    <img src={URL.createObjectURL(image)} alt="PHOTO" height="120px" />
                                                </>
                                            ) : (<>{image === "" && <p>Drag and Drop Image</p>} </>)
                                        }
                                    </Grid>

                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {isPending ? <><ButtonLoader /></> : <>Sign Up</>}

                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link to="/login" variant="body2">
                                            Already have an account? Sign in
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

export default Registration