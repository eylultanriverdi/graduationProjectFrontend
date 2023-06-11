import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { setProducts } from '../redux/actions/productActions';
import axios from 'axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { createCalorieInfo } from '../redux/actions/productActions';

const ProductListing = (props) => {
  const { allProducts,createCalorieInfo } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Her sayfada kaç ürün gösterileceği

  const fetchProducts = async () => {
    try {
      const resp = await axios.get(`http://localhost:3001/products?page=${currentPage}&limit=${productsPerPage}`);
      if (resp && resp.status === 200) {
        const { pagination, products } = resp.data;
        const { totalPages } = pagination;

        const decodedProducts = products.map((product) => {
          const base64Image = `data:image/jpeg;base64,${product.productImage}`;
          return {
            ...product,
            productImage: base64Image
          };
        });

        props.setProducts(decodedProducts);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };



  const handleAddToList = async (productId) => {
    const currentDate = new Date().toISOString().slice(0, 10);
  
    try {
      const selectedProduct = allProducts.find((product) => product.productId === productId);
      console.log(selectedProduct, "selectedProduct")
      if (selectedProduct) {
        const {
          productId,
          productName,
          description,
          productImage,
          proteinValue,
          carbohydrateValue,
          oilValue,
          glutenValue,
          ketogenicDiet,
          glutenFree,
          saltFree,
          calorieValue
        } = selectedProduct;
  
        const resp = await axios.post(`http://localhost:3001/addList`, {
          calorieListId: "",
          products: [
            {
              productId: productId,
              productName: productName,
              description:description ,
              productImage: "",
              proteinValue: proteinValue,
              carbohydrateValue: carbohydrateValue,
              oilValue: oilValue,
              glutenValue: glutenValue,
              ketogenicDiet: ketogenicDiet,
              glutenFree: glutenFree,
              saltFree: glutenFree,
              calorieValue: calorieValue
            }
          ],
          totalCalorie: calorieValue,
          createDate: currentDate
        });
        createCalorieInfo(resp.data);
      } else {
        console.log('Product not found');
      }
    } catch (error) {
      console.log('Error:', error.response);
    }
  };
  

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  // Şu anki sayfadaki ürünleri al
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Sayfa değişikliğini işle
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const renderList = allProducts && allProducts.map((product) => {
    const { productId, productName, description, productImage, carbohydrateValue, glutenFree, glutenValue, ketogenicDiet, oilValue, proteinValue, saltFree, calorieValue } = product;

    return (
      <Link to={`/product/${productId}`} style={{ textDecoration: 'none', color: '#9c27b0' }} key={productId}>
        <Paper elevation={10} style={{ marginTop: '50px', marginBottom: '80px', padding: '20px', position: 'relative' }}>
          <Grid container spacing={2}>
            {/* Ürün görseli */}
            <Grid item xs={12} sm={4}>
              <img
                src={productImage}
                alt={description}
                align="center"
                style={{ width: '100%', height: 'auto' }}
              />
            </Grid>
            {/* Ürün bilgileri */}
            <Grid item xs={12} sm={8}>
              <Typography variant="h4" component="h2" style={{ marginBottom: '10px' }}>
                {productName}
              </Typography>
              <Typography variant="body1" component="p" style={{ marginBottom: '5px' }}>
                {description}
              </Typography>
              <Typography variant="body1" component="p" style={{ marginBottom: '5px' }}>
                Protein: {proteinValue}
              </Typography>
              <Typography variant="body1" component="p" style={{ marginBottom: '5px' }}>
                Hidrat: {carbohydrateValue}
              </Typography>
              <Typography variant="body1" component="p" style={{ marginBottom: '5px' }}>
                Yağ: {oilValue}
              </Typography>
              <Typography variant="body1" component="p" style={{ marginBottom: '5px' }}>
                Gluten Değeri: {glutenValue}
              </Typography>
              <Typography variant="body1" component="p" style={{ marginBottom: '5px' }}>
                Gluten Free: {glutenFree}
              </Typography>
              <Typography variant="body1" component="p" style={{ marginBottom: '5px' }}>
                Ketogenic Diet: {ketogenicDiet}
              </Typography>
              <Typography variant="body1" component="p" style={{ marginBottom: '5px' }}>
                Salt Free: {saltFree}
              </Typography>
              <Typography variant="body1" component="p">
                Kalori: {calorieValue}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                style={{ position: 'absolute', bottom: '10px', right: '10px' }}
                onClick={() => handleAddToList(productId)}
              >
                Bugünün Listesine Ekle
              </Button>
            </Grid>
          </Grid>
        </Paper>
        </Link>
    );
  });



  return (
    <div>
      <h1 style={{ color: '#9c27b0' }}>Product Listing</h1>
      {renderList}
      <Stack spacing={2} style={{ marginTop: '20px' }}>
        <Pagination count={8} color="secondary" page={currentPage} onChange={handlePageChange} />
      </Stack>
    </div>
  );
};

const mapStateToProps = (state) => ({
  allProducts: state.allProducts.products
});

const mapDispatchToProps = {
  setProducts,
  createCalorieInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);
