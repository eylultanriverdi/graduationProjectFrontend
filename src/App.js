import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductListing from './components/ProductListing';
import Product from './components/Product';
import ProductDetail from './components/ProductDetail';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import CalorieInfoPage from './components/CalorieInfoPage';
import NavigationBar from './components/NavigationBar';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import CategoryList from './components/CategoryList';

function App() {
  const isLoginPage = window.location.pathname === '/loginPage'; // Aktif sayfanın "/loginPage" olup olmadığını kontrol eder
  const isRegisterPage = window.location.pathname === '/registerPage';
  return (
    <BrowserRouter>
      <Header />
      {!isLoginPage && !isRegisterPage && <NavigationBar />} {/* isLoginPage değeri false ise NavigationBar gösterilir */}
      <Container>
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/calorieInformation" element={<CalorieInfoPage />} />
          <Route path="/category/:categoryId" element={<CategoryList />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/registerPage" element={<RegisterPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
