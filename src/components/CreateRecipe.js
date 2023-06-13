import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Paper, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import axios from 'axios';
import { createRecipe } from '../redux/actions/productActions';

const CreateRecipe = (props) => {
    const { createRecipe } = props;
    const navigate = useNavigate();
    const paperStyle = { padding: 20, margin: '120px auto' };
    const avatarStyle = { backgroundColor: '#9c27b0' };
    const buttonStyle = { margin: '8px 0' };
    const textFieldStyle = { marginBottom: '15px' };

    const [recipeID, setRecipeID] = useState('');
    const [recipeDetail, setRecipeDetail] = useState('');

    const isFormCompleted =
        recipeID &&
        recipeDetail

    const fetchCreateRecipe = async () => {
        try {
            const resp = await axios.post('http://localhost:3001/addRecipe', {
                recipeID: recipeID,
                recipeDetail: recipeDetail
            });

            createRecipe(resp.data);
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        fetchCreateRecipe();
    }, []);

    return (
        <Grid container justifyContent="center">
            <Paper elevation={10} style={paperStyle}>
                <h2 align="center">
                    Welcome ! Let's do the registration.
                </h2>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={6}>
                        <Grid align="center">
                            <Typography variant="h5">Dietitian Information</Typography>
                        </Grid>
                        <TextField
                            label="Recipe Detail"
                            placeholder="Enter your recipe detail"
                            fullWidth
                            required
                            style={textFieldStyle}
                            color="secondary"
                            value={recipeDetail}
                            onChange={(e) => setRecipeDetail(e.target.value)}
                        />
                    </Grid>
                    <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        fullWidth
                        style={buttonStyle}
                        onClick={fetchCreateRecipe}
                    >
                        Create New Recipe
                    </Button>
                </Grid>

            </Paper>
        </Grid>
    );
};

const mapStateToProps = (state) => ({
    nutritionistRegister: state.nutritionistRegister.nutritionistRegister
});

const mapDispatchToProps = (dispatch) => {
    return {
        createRecipe
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipe);
