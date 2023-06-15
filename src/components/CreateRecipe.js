import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import { Paper, TextField, Typography, Button } from '@mui/material';
import { createRecipe } from '../redux/actions/productActions';
import cooking2 from '../assets/cooking2.jpg';
import axios from 'axios';

const CreateRecipe = (props) => {
    const { createRecipe } = props;
    const paperStyle = {
        padding: 20,
        margin: '120px auto',
        width: '100%',
        height: '100%',
    };
    const buttonStyle = { margin: '8px 0', fontSize: '25px' };
    const textFieldStyle = { marginBottom: '20px', marginTop: '10px' };

    const [recipeID, setRecipeID] = useState('');
    const [recipeName, setRecipeName] = useState('');
    const [recipeDetail, setRecipeDetail] = useState('');

    const isFormCompleted =
        recipeID &&
        recipeName &&
        recipeDetail

    const fetchCreateRecipe = async () => {
        try {
            const resp = await axios.post('http://localhost:3001/addRecipe', {
                recipeID: recipeID,
                recipeName: recipeName,
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
                <Grid align='center'>
                    <img
                        src={cooking2}
                        alt="Cooking"
                        style={{ marginBottom: '10px', width: "-webkit-fill-available" }}
                    />
                </Grid>
                <h2 align="center">Let's create a recipe.</h2>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5">Recipe Information</Typography>
                        <TextField
                            label="Recipe Name"
                            placeholder="Enter recipe name"
                            fullWidth
                            required
                            style={textFieldStyle}
                            color="secondary"
                            value={recipeName}
                            onChange={(e) => setRecipeName(e.target.value)}
                        />
                        <TextField
                            label="Recipe Detail"
                            placeholder="Enter recipe detail"
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
                        Create Recipe
                    </Button>
                </Grid>
            </Paper>
        </Grid>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        createRecipe: (recipe) => dispatch(createRecipe(recipe)),
    };
};

export default connect(null, mapDispatchToProps)(CreateRecipe);
