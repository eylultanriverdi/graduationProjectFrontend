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

const ProductListing = (props) => {
  const { allProducts } = props;
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
  


  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  // Şu anki sayfadaki ürünleri al
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Sayfa değişikliğini işle
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const renderList = allProducts.map((product) => {
    const { productId, productName, description, productImage, carbohydrateValue, glutenFree, glutenValue, ketogenicDiet, oilValue, proteinValue, saltFree, calorieValue } = product;
  
    return (
      <Link to={`/product/${productId}`} style={{ color: '#9c27b0' }} key={productId}>
        <Paper elevation={10} style={{ marginTop: '50px', marginBottom: '80px' }}>
          <Grid container spacing={2}>
            {/* Ürün görseli */}
            <Grid item xs={12} sm={4}>
              <img
                src={productImage}
                alt={description}
                align="center"
                style={{ width: '300px', height: '350px', marginBottom: '50px', marginLeft: '10px' }}
              />
            </Grid>
            {/* Ürün bilgileri */}
            <Grid item xs={12} sm={4} style={{ color: '#9c27b0' }}>
              <Typography variant="h4" component="h2">
                {productName}
              </Typography>
              <Typography variant="h4" component="h2">
                {proteinValue}
              </Typography>
              <Typography variant="h4" component="h2">
                {carbohydrateValue}
              </Typography>
              <Typography variant="h4" component="h2">
                {oilValue}
              </Typography>
              <Typography variant="h4" component="h2">
                {glutenValue}
              </Typography>
              <Typography variant="h4" component="h2">
                {glutenFree}
              </Typography>
              <Typography variant="h4" component="h2">
                {ketogenicDiet}
              </Typography>
              <Typography variant="h4" component="h2">
                {saltFree}
              </Typography>
              <Typography variant="h4" component="h2">
                {calorieValue}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Link>
    );
  });
  

  // Toplam sayfa sayısını hesapla
  const pageNumbers = Math.ceil(allProducts.length / productsPerPage);

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
  setProducts
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);
