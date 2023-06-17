import React, { useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import { Avatar, Button, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { createDietList } from '../redux/actions/productActions';

const CreateDietList = (props) => {
    const { createDietList } = props;
    const [categoryName, setCategoryName] = useState('');
    const [dietitianName, setDietitianName] = useState('');
    const [description, setDescription] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [proteinValue, setProteinValue] = useState('');
    const [carbohydrateValue, setCarbohydrateValue] = useState('');
    const [oilValue, setOilValue] = useState('');
    const [glutenValue, setGlutenValue] = useState('');
    const [ketogenicDiet, setKetogenicDiet] = useState('');
    const [glutenFree, setGlutenFree] = useState('');
    const [saltFree, setSaltFree] = useState('');
    const [calorieValue, setCalorieValue] = useState('');
    const [planId, setPlanId] = useState('');
    const [ageRange, setAgeRange] = useState('');
    const [breakfast, setBreakfast] = useState('');
    const [lunch, setLunch] = useState('');
    const [dinner, setDinner] = useState('');
    const [snack, setSnack] = useState('');
    const [amountOfWater, setAmountOfWater] = useState('');
    const [error, setError] = useState('');

    const isFormCompleted =
        categoryName &&
        dietitianName &&
        description &&
        categoryImage &&
        productId &&
        productName &&
        proteinValue &&
        carbohydrateValue &&
        oilValue &&
        glutenValue &&
        ketogenicDiet &&
        glutenFree &&
        saltFree &&
        calorieValue &&
        planId &&
        ageRange &&
        breakfast &&
        lunch &&
        dinner &&
        snack &&
        amountOfWater;

        const fetchDietList = async () => {
            try {
              const resp = await axios.post('http://localhost:3001/dietCategory', {
                categoryName: categoryName,
                dietitianName: dietitianName,
                description: description,
                categoryImage: categoryImage,
                allowedFoods: [
                  {
                    productId: productId,
                    productName: productName,
                    description: description,
                    productImage: '',
                    proteinValue: proteinValue,
                    carbohydrateValue: carbohydrateValue,
                    oilValue: oilValue,
                    glutenValue: glutenValue,
                    ketogenicDiet: ketogenicDiet,
                    glutenFree: glutenFree,
                    saltFree: saltFree,
                    calorieValue: calorieValue,
                  },
                ],
                forbiddenFoods: [
                  {
                    productId: productId,
                    productName: productName,
                    description: description,
                    productImage: '',
                    proteinValue: proteinValue,
                    carbohydrateValue: carbohydrateValue,
                    oilValue: oilValue,
                    glutenValue: glutenValue,
                    ketogenicDiet: ketogenicDiet,
                    glutenFree: glutenFree,
                    saltFree: saltFree,
                    calorieValue: calorieValue,
                  },
                ],
                dailyDietPlan: [
                  {
                    planId: planId,
                    ageRange: ageRange,
                    programDetails: [
                      {
                        breakfast: breakfast,
                        lunch: lunch,
                        dinner: dinner,
                        snack: snack,
                        amountOfWater: amountOfWater,
                      },
                    ],
                  },
                ],
              });
          
              if (resp.status === 200) {
                createDietList(resp.data);
                setError('');
              } else {
                setError('Error');
              }
            } catch (error) {
              console.log('Error:', error);
              setError('Error');
            }
          };
          

    return (
        <Grid container justifyContent="center">
            <Paper elevation={10} style={{ padding: 20, margin: '120px auto' }}>
                <Avatar style={{ backgroundColor: '#9c27b0' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5" align="center">
                    Let's Create a Diet List
                </Typography>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="Category Name"
                            placeholder="Enter Category name"
                            fullWidth
                            required
                            style={{ marginBottom: '15px' }}
                            color="secondary"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                        <TextField
                            label="Dietitian Name"
                            placeholder="Enter Dietitian Name"
                            fullWidth
                            required
                            style={{ marginBottom: '15px' }}
                            color="secondary"
                            value={dietitianName}
                            onChange={(e) => setDietitianName(e.target.value)}
                        />
                        <TextField
                            label="Description"
                            placeholder="Enter description"
                            fullWidth
                            required
                            style={{ marginBottom: '15px' }}
                            color="secondary"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <TextField
                            label="Product Name"
                            placeholder="Enter Product Name"
                            fullWidth
                            required
                            style={{ marginBottom: '15px' }}
                            color="secondary"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                        <TextField
                            label="Protein Value"
                            placeholder="Enter Protein Value"
                            fullWidth
                            required
                            style={{ marginBottom: '15px' }}
                            color="secondary"
                            value={proteinValue}
                            onChange={(e) => setProteinValue(e.target.value)}
                        />
                        <TextField
                            label="Carbohydrate Value"
                            placeholder="Enter Carbohydrate Value"
                            fullWidth
                            required
                            style={{ marginBottom: '15px' }}
                            color="secondary"
                            value={carbohydrateValue}
                            onChange={(e) => setCarbohydrateValue(e.target.value)}
                        />
                        <TextField
                            label="Oil Value"
                            placeholder="Enter Oil Value"
                            fullWidth
                            required
                            style={{ marginBottom: '15px' }}
                            color="secondary"
                            value={oilValue}
                            onChange={(e) => setOilValue(e.target.value)}
                        />
                        <TextField
                            label="Gluten Value"
                            placeholder="Enter Gluten Value"
                            fullWidth
                            required
                            style={{ marginBottom: '15px' }}
                            color="secondary"
                            value={glutenValue}
                            onChange={(e) => setGlutenValue(e.target.value)}
                        />
                        <TextField
                            label="Ketogenic Diet"
                            placeholder="Ketogenic Diet Compliance"
                            fullWidth
                            required
                            style={{ marginBottom: '15px' }}
                            color="secondary"
                            value={ketogenicDiet}
                            onChange={(e) => setKetogenicDiet(e.target.value)}
                        />
                        <TextField
                            label="Gluten Free"
                            placeholder="Gluten Free Compliance"
                            fullWidth
                            required
                            style={{ marginBottom: '15px' }}
                            color="secondary"
                            value={glutenFree}
                            onChange={(e) => setGlutenFree(e.target.value)}
                        />
                        <TextField
                            label="Salt Free"
                            placeholder="Salt Free Compliance"
                            fullWidth
                            required
                            style={{ marginBottom: '15px' }}
                            color="secondary"
                            value={saltFree}
                            onChange={(e) => setSaltFree(e.target.value)}
                        />
                        <TextField
                            label="Calorie Value"
                            placeholder="Enter Calorie Value"
                            fullWidth
                            required
                            style={{ marginBottom: '15px' }}
                            color="secondary"
                            value={calorieValue}
                            onChange={(e) => setCalorieValue(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="Age Range"
                            placeholder="Enter Age Range"
                            fullWidth
                            required
                            style={{ marginBottom: '15px' }}
                            color="secondary"
                            value={ageRange}
                            onChange={(e) => setAgeRange(e.target.value)}
                        />
                        <TextField
                            label="Breakfast"
                            placeholder="Enter Breakfast"
                            fullWidth
                            required
                            style={{ marginBottom: '15px' }}
                            color="secondary"
                            value={breakfast}
                            onChange={(e) => setBreakfast(e.target.value)}
                        />
                        <TextField
                            label="Lunch"
                            placeholder="Enter Lunch"
                            fullWidth
                            required
                            style={{ marginBottom: '15px' }}
                            color="secondary"
                            value={lunch}
                            onChange={(e) => setLunch(e.target.value)}
                        />
                        <TextField
                            label="Dinner"
                            placeholder="Enter Dinner"
                            fullWidth
                            required
                            style={{ marginBottom: '15px' }}
                            color="secondary"
                            value={dinner}
                            onChange={(e) => setDinner(e.target.value)}
                        />
                        <TextField
                            label="Snack"
                            placeholder="Enter Snack"
                            fullWidth
                            required
                            style={{ marginBottom: '15px' }}
                            color="secondary"
                            value={snack}
                            onChange={(e) => setSnack(e.target.value)}
                        />
                        <TextField
                            label="Amount Of Water"
                            placeholder="Enter Amount Of Water"
                            fullWidth
                            required
                            style={{ marginBottom: '15px' }}
                            color="secondary"
                            value={amountOfWater}
                            onChange={(e) => setAmountOfWater(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    fullWidth
                    style={{ margin: '8px 0' }}
                    onClick={fetchDietList}
                >
                    Create Diet List
                </Button>

                {error && (
                    <Alert severity="error" style={{ marginBottom: '15px' }}>
                        {error}
                    </Alert>
                )}
            </Paper>
        </Grid>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
    return {
        createDietList: (dietList) => dispatch(createDietList(dietList)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDietList);
