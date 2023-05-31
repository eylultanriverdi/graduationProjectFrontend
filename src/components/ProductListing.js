import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { setProducts } from '../redux/actions/productActions';
import axios from 'axios';

const ProductListing = (props) => {
  const { allProducts } = props;
  const dispatch = useDispatch();

  const decodeBase64Image = (base64Data) => {
    const decodedImage = atob(base64Data.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    const uint8Array = new Uint8Array(decodedImage.length);
    for (let i = 0; i < decodedImage.length; i++) {
      uint8Array[i] = decodedImage.charCodeAt(i);
    }
    return URL.createObjectURL(new Blob([uint8Array], { type: base64Data.split(',')[0].split(':')[1] }));
  };

  const fetchProducts = async () => {
    try {
      const resp = await axios.get("http://localhost:3001/products");
      if (resp && resp.status === 200) {
        const decodedProducts = resp.data.map((product) => {
          const base64Image = `data:image/jpeg;base64,${product.productImage}`;
          return {
            ...product,
            productImage: base64Image
          };
        });
        
        
        dispatch(setProducts(decodedProducts));
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const renderList = allProducts && allProducts.map((product) => {
    const { productId, productName, description, productImage, carbohydrateValue, glutenFree, glutenValue, ketogenicDiet, oilValue, proteinValue, saltFree } = product;
  
    return (
      <Link to={`/product/${productId}`} style={{ color: "#9c27b0" }} key={productId}>
        <Paper elevation={10} style={{ marginTop: "50px", marginBottom: "80px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <img src={productImage} alt={description} align="center" style={{ width: "300px", height: "350px", marginBottom: "50px", marginLeft: "10px" }} />
            </Grid>
            <Grid item xs={12} sm={4} style={{ color: "#9c27b0" }}>
              <Typography variant="h4" component="h2">{productName}</Typography>
              <Typography variant="h4" component="h2">{proteinValue}</Typography>
              <Typography variant="h4" component="h2">{carbohydrateValue}</Typography>
              <Typography variant="h4" component="h2">{oilValue}</Typography>
              <Typography variant="h4" component="h2">{glutenValue}</Typography>
              <Typography variant="h4" component="h2">{glutenFree}</Typography>
              <Typography variant="h4" component="h2">{ketogenicDiet}</Typography>
              <Typography variant="h4" component="h2">{saltFree}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Link>
    );
  });
  

  return (
    <div>
      <h1 style={{ color: "#9c27b0" }}>Product Listing</h1>
      {renderList}
    </div>
  );
};

const mapStateToProps = (state) => ({
  allProducts: state.allProducts.products
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);
