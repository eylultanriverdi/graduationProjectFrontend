import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createCalorieInfo, setCalorieInfoList, setProducts } from '../redux/actions/productActions';
import axios from 'axios';
import { CircularProgress, Grid, Paper, Typography, Button, TextField } from '@mui/material';

const CalorieInfoPage = (props) => {
  const { allProducts, calorieInfoList, createCalorieInfo } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Her sayfada kaç ürün gösterileceği
  const [totalCalories, setTotalCalories] = useState(0);

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

  const handleAddToList = async (productId) => {
    const currentDate = new Date().toISOString().slice(0, 10);

    try {
      const selectedProduct = allProducts.find((product) => product.productId === productId);

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
              description: description,
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
        setTotalCalories(totalCalories + parseInt(calorieValue));
      } else {
        console.log('Product not found');
      }
    } catch (error) {
      console.log('Error:', error.response);
    }
  };

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
                Add to Today's List
              </Button>
            </Grid>
          </Grid>
        </Paper>
      );
    });
  });

  return (
    <div>
      <h1 style={{ color: "white" }}>Calorie Info Page</h1>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <div style={{ position: 'relative', width: '200px', height: '200px' }}>
            <CircularProgress
              variant="determinate"
              value={(totalCalories / 3000) * 100}
              size={200}
              thickness={2}
              style={{color:"white"}}
            />
            <Typography variant="h4" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              {totalCalories}
            </Typography>
          </div>
        </div>
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