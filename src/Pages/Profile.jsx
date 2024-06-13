import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { profiledata } from '../Api/Functions/Dashboard'
import Layout from '../Common/Layout'
import { CardContent, CardMedia, Container, Paper, Typography } from '@mui/material'
import PageLoader from '../Common/PageLoader'

const Profile = () => {
    const { isLoading, isError, data: profile, error } = useQuery({
        queryKey: ['member'],
        queryFn: profiledata
    })

    if (isLoading) {
        return <h1><PageLoader /></h1>
    }
    if (isError) {
        return <h1>{error?.message}</h1>
    }

    console.log("profiledata", profile);

    return (
        <>

            <Layout>
                <Container>
                    <Paper elevation={10} sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
                        <CardMedia
                            component='img'
                            image={`${process.env.REACT_APP_BASE_URL}${profile[0].image}`}
                            alt={`${process.env.REACT_APP_BASE_URL}${profile[0].image}`}
                            height="400px"
                        />
                        <CardContent sx={{ textAlign: 'justify' }}>
                            <Typography>Name : {profile[0].name}</Typography>
                            <Typography>Email : {profile[0].email}</Typography>
                            <Typography>Mobile No. : {profile[0].mobile}</Typography>
                            <Typography>First School : {profile[0].first_school}</Typography>
                        </CardContent>
                    </Paper>
                </Container>
            </Layout>

        </>
    )
}

export default Profile