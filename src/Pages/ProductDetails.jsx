import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getProductDetails } from '../Api/Functions/ProductDetail'
import { Link, useParams } from 'react-router-dom'
import Layout from '../Common/Layout'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Container } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PageLoader from '../Common/PageLoader'

const ProductDetails = () => {
    const { id } = useParams()
    const { isLoading, isError, data: prodDetail, error } = useQuery({
        queryKey: ['proddetails'],
        queryFn: () => getProductDetails(id)
    })

    if (isLoading) {
        return <h1><PageLoader /></h1>
    }
    if (isError) {
        return <h1>{error.message}</h1>
    }

    console.log('gvjvj', prodDetail);

    return (
        <>

            <Layout>
                <Container>
                    <Card sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="100%"
                                image={prodDetail?.image}
                                alt={prodDetail?.image}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div">
                                    {prodDetail?.name}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                    Brand : {prodDetail?.brand}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Price : <CurrencyRupeeIcon fontSize='10px' />{prodDetail?.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {prodDetail?.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Link to='/products'>

                                <Button size="small" color="primary">
                                    Back to Products
                                </Button>

                            </Link>
                        </CardActions>
                    </Card>
                </Container>
            </Layout>

        </>
    )
}

export default ProductDetails