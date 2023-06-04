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
import CalorieInfoPage from './components/CalorieInfoPage';

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Container>
        <>
          <Routes>
            <Route path="/" element={<ProductListing></ProductListing>}></Route>
            <Route path="/product" element={<Product></Product>}></Route>
            <Route path="/product/:productId" element={<ProductDetail></ProductDetail>}></Route>
            <Route path="/registerPage" element={<RegisterPage />} />
            <Route path="/loginPage" element={<LoginPage />}></Route>
            <Route path="/calorieInformation" element={<CalorieInfoPage />}></Route>
          </Routes></>


      </Container>
    </BrowserRouter>
  )
}

export default App;