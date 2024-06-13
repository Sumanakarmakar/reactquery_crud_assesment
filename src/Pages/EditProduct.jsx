import React, { useEffect, useState } from 'react'
import ButtonLoader from '../Common/ButtonLoader'
import { Box, Button, Container, CssBaseline, Grid, TextField, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import Layout from '../Common/Layout';
import { editProduct } from '../Api/Functions/EditProduct';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductDetails } from '../Api/Functions/ProductDetail';

const defaultTheme = createTheme();

const EditProduct = () => {
    const { id } = useParams()
    const [productdata, setProductData] = useState({})
    const [image, setImage] = useState()
    const navigate=useNavigate()
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm()

    const { mutate, isPending } = useMutation({
        mutationFn: (data) => editProduct(id, data),
        onSuccess: (data) => {
            if(data?.status){
                toast.success(data?.message)
                navigate('/products')
            } 
            
        }
    })

    const onSubmitEditproduct = async (data) => {
        const formdata = new FormData()
        formdata.append("name", data?.name)
        formdata.append("price", data?.price)
        formdata.append("description", data?.description)
        formdata.append("brand", data?.brand)
        formdata.append("image", document.getElementById('image').files[0])
        // formdata.append("id",id)
        mutate(formdata)
    }

    useEffect(() => {
        const fetchProdDetail = async () => {
            try {
                const data = await getProductDetails(id)
                setProductData(data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchProdDetail()
    }, [id])

    console.log("product data", productdata);

    useEffect(() => {
        setValue("name", productdata?.name)
        setValue("price", productdata?.price)
        setValue("description", productdata?.description)
        setValue("brand", productdata?.brand)
        // setValue("image",productdata?.image)
    }, [productdata, setValue])


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
                                Edit product
                            </Typography>
                            <Box component="form"
                                onSubmit={handleSubmit(onSubmitEditproduct)}
                                noValidate sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            // label="Product Name"
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
                                            // label="Price"
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
                                            // label="Description"
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
                                            // label="Brand"
                                            {...register("brand", {
                                                required: true
                                            })}

                                        />
                                        {errors?.brand?.type === 'required' && <p>This field is required</p>}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField required fullWidth type="file" id='image' name='image' accept='image/*'
                                            onChange={(e) => setImage(e.target.files[0])}


                                        />
                                        {/* <img src={`${productdata.image}`} height={150} width={200}/> */}
                                        {/* {
                                            img && <img src={img} alt='image' />
                                        }
                                        {errors?.image?.type === 'required' && <p>This field is required</p>} */}
                                        {
                                            image !== null && image !== undefined && image !== "" ? (
                                                <>
                                                    <img src={URL.createObjectURL(image)} alt="PHOTO" height="120px" />
                                                </>
                                                // ) : (<>{image === "" && <p>Drag and Drop Image</p>} </>)
                                            ) : (<><img src={`${productdata.image}`} height={150} width={200} /> </>)
                                        }
                                    </Grid>

                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    {isPending ? <><ButtonLoader /></> : <>Save Changes</>}

                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </Layout>

        </>
    )
}

export default EditProduct