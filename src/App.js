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
import CategoryList from './components/CategoryList';
import RegisterPageNutritionist from './components/Nutritionist/RegisterPageNutritionist';
import LoginPageNutritionist from './components/Nutritionist/LoginPageNutritionist';
import HomePageNutritionist from './components/Nutritionist/HomePageNutritionist';
import HomePage from './components/User/HomePage';
import RegisterPageUser from './components/User/RegisterPageUser';
import LoginPage from './components/User/LoginPage';
import RegisterLoginPage from './components/RegisterLoginPage';
import MainLoginPage from './components/MainLoginPage';
import NutritionistList from './components/NutritionistList';

function App() {
  const isLoginPage = window.location.pathname === '/loginPage'; // Aktif sayfanın "/loginPage" olup olmadığını kontrol eder
  const isRegisterPage = window.location.pathname === '/registerPageUser';
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <Routes>
          <Route path="" element={<ProductListing />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/calorieInformation" element={<CalorieInfoPage />} />
          <Route path="/category/:categoryId" element={<CategoryList />} />
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/loginPageNutritionist" element={<LoginPageNutritionist />} />
          <Route path="/registerPageUser" element={<RegisterPageUser />} />
          <Route path="/registerPageNutritionist" element={<RegisterPageNutritionist />} />
          <Route path="/homePage" element={<HomePage />} />
          <Route path="/homePageNutritionist" element={<HomePageNutritionist />} />
          <Route path="/registerLoginPage" element={<RegisterLoginPage />} />
          <Route path="/mainLoginPage" element={<MainLoginPage />} />
          <Route path="/nutritionistList" element={<NutritionistList />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
