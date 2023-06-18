import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createCalorieInfo, setCalorieInfoList, setProducts } from '../redux/actions/productActions';
import axios from 'axios';
import { CircularProgress, Grid, Paper, Typography, Button, TextField, Card } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const CalorieInfoPage = (props) => {
  const { allProducts, calorieInfoList, createCalorieInfo } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Her sayfada kaç ürün gösterileceği
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarbohydrate, setTotalCarbohydrate] = useState(0);
  const [totalOil, setTotalOil] = useState(0);

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

  const calculateTotalCalories = () => {
    let total = 0;
    const currentDate = new Date().toISOString().split('T')[0]; // Bugünün tarihini al

    if (calorieInfoList && calorieInfoList.length > 0) {
      // İlgili tarih bilgisine sahip ürünleri bul
      const productsWithSameDate = calorieInfoList.filter((calorieInfo) => {
        const entryDate = new Date(calorieInfo.createDate).toISOString().split('T')[0];
        return entryDate === currentDate;
      });

      if (productsWithSameDate.length > 0) {
        // Toplam kalori değerini hesapla
        total = productsWithSameDate.reduce((sum, calorieInfo) => {
          return sum + parseInt(calorieInfo.totalCalorie);
        }, 0);
      }
    }

    return total;
  };


  const calculateTotalProtein = () => {
    let total = 0;
    const currentDate = new Date().toISOString().split('T')[0];

    if (calorieInfoList && calorieInfoList.length > 0) {
      const productsWithSameDate = calorieInfoList.filter((calorieInfo) => {
        const entryDate = new Date(calorieInfo.createDate).toISOString().split('T')[0];
        return entryDate === currentDate;
      });

      if (productsWithSameDate.length > 0) {
        total = productsWithSameDate.reduce((sum, calorieInfo) => {
          const products = calorieInfo.products;
          const productProteinSum = products.reduce((productSum, product) => {
            return productSum + parseInt(product.proteinValue);
          }, 0);
          return sum + productProteinSum;
        }, 0);
      }
    }

    return total;
  };

  const calculateTotalCarbohydrate = () => {
    let total = 0;
    const currentDate = new Date().toISOString().split('T')[0];

    if (calorieInfoList && calorieInfoList.length > 0) {
      const productsWithSameDate = calorieInfoList.filter((calorieInfo) => {
        const entryDate = new Date(calorieInfo.createDate).toISOString().split('T')[0];
        return entryDate === currentDate;
      });

      if (productsWithSameDate.length > 0) {
        total = productsWithSameDate.reduce((sum, calorieInfo) => {
          const products = calorieInfo.products;
          const productCarbohydrateValueSum = products.reduce((productSum, product) => {
            return productSum + parseInt(product.carbohydrateValue);
          }, 0);
          return sum + productCarbohydrateValueSum;
        }, 0);
      }
    }

    return total;
  };

  const calculateTotalOil = () => {
    let total = 0;
    const currentDate = new Date().toISOString().split('T')[0];
  
    if (calorieInfoList && calorieInfoList.length > 0) {
      const productsWithSameDate = calorieInfoList.filter((calorieInfo) => {
        const entryDate = new Date(calorieInfo.createDate).toISOString().split('T')[0];
        return entryDate === currentDate;
      });
  
      if (productsWithSameDate.length > 0) {
        total = productsWithSameDate.reduce((sum, calorieInfo) => {
          const products = calorieInfo.products;
          const productOilValueSum = products.reduce((productSum, product) => {
            const oilValue = parseInt(product.oilValue);
            return isNaN(oilValue) ? productSum : productSum + oilValue;
          }, 0);
          return sum + productOilValueSum;
        }, 0);
      }
    }
  
    return total;
  };
  

  const fetchCalorieInfoList = async () => {
    try {
      const resp = await axios.get(`http://localhost:3001/calorieInfo`);
      if (resp && resp.status === 200) {
        props.setCalorieInfoList(resp.data);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    fetchCalorieInfoList();
  }, []);

  useEffect(() => {
    setTotalCalories(calculateTotalCalories());
  }, [calorieInfoList]);

  useEffect(() => {
    setTotalProtein(calculateTotalProtein());
  }, [calorieInfoList]);

  useEffect(() => {
    setTotalCarbohydrate(calculateTotalCarbohydrate());
  }, [calorieInfoList]);

  useEffect(() => {
    setTotalOil(calculateTotalOil());
  }, [calorieInfoList]);


  const renderProductList = calorieInfoList && calorieInfoList.map((calorieInfo) => {
    const { products } = calorieInfo;

    return products && products.map((product) => {
      const {
        productId,
        productName,
        description,
        productImage,
        carbohydrateValue,
        glutenFree,
        glutenValue,
        ketogenicDiet,
        oilValue,
        proteinValue,
        saltFree,
        calorieValue
      } = product;

      return (
        <Paper elevation={10} style={{ marginTop: '50px', marginBottom: '80px', padding: '20px', position: 'relative' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Typography variant="h4" component="h2" style={{ marginBottom: '10px', color: "#9c27b0" }}>
                {productName}
              </Typography>
              <Typography variant="body1" component="p" style={{ marginBottom: '5px', color: "#9c27b0" }}>
                {description}
              </Typography>
              <Typography variant="body1" component="p" style={{ marginBottom: '5px', color: "#9c27b0" }}>
                Protein Value: {proteinValue}
              </Typography>
              <Typography variant="body1" component="p" style={{ marginBottom: '5px', color: "#9c27b0" }}>
                Carbohydrate: {carbohydrateValue}
              </Typography>
              <Typography variant="body1" component="p" style={{ marginBottom: '5px', color: "#9c27b0" }}>
                Oil Value: {oilValue}
              </Typography>
              <Typography variant="body1" component="p" style={{ marginBottom: '5px', color: "#9c27b0" }}>
                Gluten Value: {glutenValue}
              </Typography>
              <Typography variant="body1" component="p" style={{ marginBottom: '5px', color: "#9c27b0" }}>
                Gluten Free: {glutenFree}
              </Typography>
              <Typography variant="body1" component="p" style={{ marginBottom: '5px', color: "#9c27b0" }}>
                Ketogenic Diet: {ketogenicDiet}
              </Typography>
              <Typography variant="body1" component="p" style={{ marginBottom: '5px', color: "#9c27b0" }}>
                Salt Free: {saltFree}
              </Typography>
              <Typography variant="body1" component="p" style={{ marginBottom: '5px', color: "#9c27b0" }}>
                Kalori: {calorieValue}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      );
    });
  });

  return (
    <div>
      <Card variant="outlined" style={{ marginBottom: '20px', marginTop: '20px' }}>
        <Typography color="secondary" style={{ marginLeft: '20px', fontSize: 'xx-large'}}>
        Calorie Info Page
        </Typography>
      </Card>
      <div>
        <Card variant="outlined" style={{ marginBottom: '20px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ position: 'relative', width: '200px', height: '200px', marginBottom: '20px', marginTop: '20px' }}>
              <CircularProgress
                variant="determinate"
                value={(totalCalories / 3000) * 100}
                size={200}
                thickness={2}
                style={{ color: "#9c27b0" }}
              />
              <Typography variant="h4" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                {totalCalories}
              </Typography>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ color: "#9c27b0", fontWeight: "bold" }} >Total Protein Value</TableCell>
                    <TableCell style={{ color: "#9c27b0", fontWeight: "bold" }} >Total Carbohydrate Value</TableCell>
                    <TableCell style={{ color: "#9c27b0", fontWeight: "bold" }}>Total Oil Value</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ color: "#9c27b0", fontWeight: "bold" }}>{totalProtein}</TableCell>
                    <TableCell style={{ color: "#9c27b0", fontWeight: "bold" }}>{totalCarbohydrate}</TableCell>
                    <TableCell style={{ color: "#9c27b0", fontWeight: "bold" }}>{totalOil}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Card>
      </div>
      {renderProductList}
    </div>
  );
};

const mapStateToProps = (state) => ({
  allProducts: state.allProducts.products,
  calorieInfoList: state.calorieInfoList.products
});

const mapDispatchToProps = {
  setProducts,
  setCalorieInfoList,
  createCalorieInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(CalorieInfoPage);