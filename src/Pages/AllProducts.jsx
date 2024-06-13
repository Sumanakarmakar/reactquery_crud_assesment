import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getProductList } from '../Api/Functions/ProductList'
import Layout from '../Common/Layout'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, CardMedia, Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import { Link } from 'react-router-dom';
import { deleteProduct } from '../Api/Functions/DeleteProduct';
import { toast } from 'react-toastify';
import PageLoader from '../Common/PageLoader';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const AllProducts = () => {
    const { isLoading, isError, data: productList, error, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: getProductList
    })

    if (isLoading) {
        return <h1><PageLoader /></h1>
    }
    if (isError) {
        return <h1>{error?.message}</h1>
    }

    //for delete product
    const deleteProductData = async id => {
        await deleteProduct(id)
        toast("Your product is deleted successfully")
        refetch(getProductList())
    }

    console.log(productList);

    return (
        <>

            <Layout>

                <Container>

                    <TableContainer component={Paper} sx={{ mt: 5 }}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell align="right">Brand</StyledTableCell>
                                    <StyledTableCell align="right">Price</StyledTableCell>
                                    <StyledTableCell align="right">Description</StyledTableCell>
                                    <StyledTableCell align="right">Image</StyledTableCell>
                                    <StyledTableCell align="right" colSpan={3}>Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    productList?.map((item) => {
                                        return (
                                            <StyledTableRow>
                                                <StyledTableCell component="th" scope="row">
                                                    {item.name}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">{item.brand}</StyledTableCell>
                                                <StyledTableCell align="right">{item.price}</StyledTableCell>
                                                <StyledTableCell align="right">{item.description}</StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <CardMedia
                                                        component='img'
                                                        image={item.image}
                                                        alt='image'
                                                        width={100}
                                                        height={100}
                                                    />
                                                </StyledTableCell>
                                                <Link to={`/productdetails/${item._id}`}>
                                                    <StyledTableCell align="center">
                                                        <PreviewIcon />
                                                    </StyledTableCell>
                                                </Link>
                                                <StyledTableCell align="right">
                                                    <Link to={`/editproduct/${item._id}`}>
                                                        <EditIcon />
                                                    </Link>
                                                </StyledTableCell>
                                                <StyledTableCell align="right">
                                                    <Button onClick={() => deleteProductData(item._id)}>
                                                        <DeleteIcon />
                                                    </Button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        )
                                    })
                                }


                            </TableBody>
                        </Table>
                    </TableContainer>

                </Container>

            </Layout>

        </>
    )
}

export default AllProducts