import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { createProduct } from '../Api/Functions/CreateProduct'
import { useForm } from 'react-hook-form'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from '../Common/Layout';
import { Link, useNavigate } from 'react-router-dom';
import ButtonLoader from '../Common/ButtonLoader';
import { toast } from 'react-toastify';

const defaultTheme = createTheme();

const AddProduct = () => {
    const navigate = useNavigate()
    const [image, setImage] = useState()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm()

    const imageChange = (e) => {
        setImage(e.target.files[0])
        console.log(e.target.files)
    }

    const { mutate, isPending } = useMutation({
        mutationFn: createProduct,
        onSuccess: (data) => {
            console.log(data);
            if (data?.status) {
                toast.success(data?.message)
                navigate('/products')
            }
        },
        onError: (err) => {
            toast.error("Something went wrong")
            console.log(err);
        }
    })

    const onSubmitAddproduct = (data) => {
        try {
            const formdata = new FormData()
            formdata.append("name", data.name)
            formdata.append("price", data.price)
            formdata.append("description", data.description)
            formdata.append("brand", data.brand)
            formdata.append("image", image)
            mutate(formdata)
        } catch (err) {
            console.log(err);
        }
    }

    console.log(watch(['name', 'price', 'description', 'brand', 'image']));

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
                                Product Addition
                            </Typography>
                            <Box component="form" onSubmit={handleSubmit(onSubmitAddproduct)} noValidate sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Product Name"
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
                                            label="Price"
                                            {...register("price", {
                                                required: true
                                            })}

                                        />
                                        {errors?.price?.type === 'required' && <p>This field is required</p>}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Description"
                                            {...register("description", {
                                                required: true
                                            })}


                                        />
                                        {errors?.description?.type === 'required' && <p>This field is required</p>}
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Brand"
                                            {...register("brand", {
                                                required: true
                                            })}

                                        />
                                        {errors?.brand?.type === 'required' && <p>This field is required</p>}
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
                                    {isPending ? <><ButtonLoader /></> : <>Submit</>}

                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </Layout>

        </>
    )
}

export default AddProduct