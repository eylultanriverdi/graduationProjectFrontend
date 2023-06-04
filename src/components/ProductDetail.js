import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux"
import { selectedProducts, removeSelectedProductReducer } from '../redux/actions/productActions';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import '@fontsource/roboto';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { setProducts } from '../redux/actions/productActions';

const ProductDetail = (props) => {

    const { allProducts } = props;
    const dispatch = useDispatch();
    const { productName, description, productImage, carbohydrateValue, glutenFree, glutenValue, ketogenicDiet, oilValue, proteinValue, saltFree, calorieValue } = allProducts;
    const productId = window.location.pathname.split("/")[2];
    const [product, setProduct] = useState({})
    console.log(allProducts)


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
  

    const getProductId = () => {
        allProducts && allProducts.map((product) => {
          if (productId === product.productId) {
            setProduct(product)
            return
          }
        })
      }


    useEffect(() => {
      fetchProducts();
    }, []);
  


    useEffect(() => {
        if (Object.keys(product).length === 0) {
          getProductId()
        }
      }, [allProducts])

    return (
        <div>
            <h1>Product Detail</h1>
            <Paper elevation={10} style={{ marginTop: "50px", marginBottom: "80px", height: "950px" }} >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <img src={product.productImage} aling="center" style={{ width: "300px", height: "350px", marginBottom: "50px", marginLeft: "10px" }}></img>
                    </Grid>
                    <Grid item xs={12} sm={4} style={{ color: "#9c27b0" }}>
                        <Typography variant="h4" component="h2">{product.productName}</Typography>
                        <Typography variant="h4" component="h2">{product.proteinValue}</Typography>
                        <Typography variant="h4" component="h2">{product.carbohydrateValue}</Typography>
                        <Typography variant="h4" component="h2">{product.oilValue}</Typography>
                        <Typography variant="h4" component="h2">{product.glutenValue}</Typography>
                        <Typography variant="h4" component="h2">{product.glutenFree}</Typography>
                        <Typography variant="h4" component="h2">{product.ketogenicDiet}</Typography>
                        <Typography variant="h4" component="h2">{product.saltFree}</Typography>
                        <Typography variant="h4" component="h2">{product.calorieValue}</Typography>
                    </Grid>
                </Grid>
            </Paper >
        </div>
    )
}


const mapStateToProps = (state) => ({
    allProducts: state.allProducts.products
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);