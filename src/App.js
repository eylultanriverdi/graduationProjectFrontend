import React from 'react';
import LoginPage from './components/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import Header from './components/Header';
import ProductListing from './components/ProductListing';
import Product from './components/Product';
import ProductDetail from './components/ProductDetail';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Container>
        <>
         {/*  <Typography
            variant="h4"
            component="h2"
            marginTop={5}
            marginBottom={3}
          >Beslenme Başlıkları Gelicek
          </Typography> */}
          <Routes>
            <Route path="/" element={<ProductListing></ProductListing>}></Route>
            <Route path="/product" element={<Product></Product>}></Route>
            <Route path="/product/:productId" element={<ProductDetail></ProductDetail>}></Route>
            <Route path="/registerPage" element={<RegisterPage />} />
            <Route path="/loginPage" element={<LoginPage />}></Route>
          </Routes></>


      </Container>
    </BrowserRouter>
  )
}

export default App;