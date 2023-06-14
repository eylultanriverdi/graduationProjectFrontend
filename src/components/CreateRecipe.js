import React, { useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import { Paper, TextField, Typography, Button } from '@mui/material';
import { createRecipe } from '../redux/actions/productActions';
import cooking2 from '../assets/cooking2.jpg';

const CreateRecipe = (props) => {
    const { createRecipe } = props;
    const paperStyle = {
        padding: 20,
        margin: '120px auto',
        width: '100%',
        height: '100%',
    };
    const buttonStyle = { margin: '8px 0', fontSize: '25px' };
    const textFieldStyle = { marginBottom: '30px', marginTop: '30px'};

    const [recipeID, setRecipeID] = useState('');
    const [recipeDetail, setRecipeDetail] = useState('');

    const handleCreateRecipe = () => {
        if (recipeID && recipeDetail) {
            const newRecipe = {
                recipeID,
                recipeDetail,
            };

            createRecipe(newRecipe);
            // Reset form after creating recipe
            setRecipeID('');
            setRecipeDetail('');
        }
    };

    return (
        <Grid container justifyContent="center">
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <img
                        src={cooking2}
                        alt="Cooking"
                        style={{ marginBottom: '10px', width:"-webkit-fill-available"}}
                    />
                </Grid>
                <h2 align="center">Let's create a recipe.</h2>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5">Recipe Information</Typography>
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
                        onClick={handleCreateRecipe}
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
