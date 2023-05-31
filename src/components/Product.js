import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { fetchProducts } from '../actions/productAction';


const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const renderList =products && products.map((product) => {
    const { id, title, image, price, category } = product;

    return (
      <Link to={`/product/${id}`} style={{ color: "#9c27b0" }} key={id}>
        <Paper elevation={10} style={{ marginTop: "50px", marginBottom: "80px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <img src={image} alt={title} align="center" style={{ width: "300px", height: "350px", marginBottom: "50px", marginLeft: "10px" }}></img>
            </Grid>
            <Grid item xs={12} sm={4} style={{ color: "#9c27b0" }}>
              <Typography variant="h4" component="h2">{category}  </Typography>
              <Typography variant="h4" component="h2">{price}  </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Link>
    );
  });

  return <>{renderList}</>;
}

export default Product;
