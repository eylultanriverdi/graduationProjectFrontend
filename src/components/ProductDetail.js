import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux"
import { selectedProducts , removeSelectedProductReducer } from '../redux/actions/productActions';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import '@fontsource/roboto';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const ProductDetail = () => {

    const { productId } = useParams();
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product)
    const {image, title, price , category ,description} = product

    console.log(product)


    const fetchProctDetail = async () => {
        const resp = await axios.get(`localhost:3000/products/${productId}`).catch(
            (err) => console.log(err)
        );
        dispatch(selectedProducts(resp.data));
    }

    useEffect(() => {
     if(productId && productId !== "") fetchProctDetail();
     return () => {
        dispatch(removeSelectedProductReducer())
     }
    }, [productId])
    


    return (
        <div>
            <h1>Product Detail</h1>
                <Paper elevation={10} style={{ marginTop: "50px", marginBottom: "80px" , height: "950px"}} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <img src={image} alt={title} aling="center" style={{ width: "300px", height: "350px", marginBottom: "50px", marginLeft: "10px" }}></img>
                        </Grid>
                        <Grid item xs={12} sm={4} style={{color:"#9c27b0"}}>
                            <Typography variant="h4" component="h2">{category}  </Typography>
                            <Typography variant="h4" component="h2">{price}  </Typography>
                        </Grid>
                    </Grid>
                </Paper >
        </div>
    )
}

export default ProductDetail