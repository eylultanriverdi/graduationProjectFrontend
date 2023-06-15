import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import axios from 'axios';
import { setRecipeList } from '../redux/actions/productActions';
import { Card, CardContent, Typography, CircularProgress, Button } from '@mui/material';

const RecipeList = (props) => {
    const { setRecipeList, recipeList } = props;
    const [isLoading, setIsLoading] = useState(true);

    const fetchRecipeList = async () => {
        try {
            const resp = await axios.get('http://localhost:3001/recipeList');
            setRecipeList(resp.data);
        } catch (error) {
            console.log('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipeList();
    }, []);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress color="secondary" />
            </div>
        );
    }

    return (
        <div>
            {recipeList &&
                recipeList.map((recipe) => (
                    <div key={recipe.recipeID} style={{ color: '#9c27b0' }}>
                        <h2 style={{ color: 'white' }}>
                            {recipe.recipeName}
                        </h2>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="body2" color="secondary">
                                    {recipe.recipeDetail}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                ))}
        </div>
    );
};

const mapStateToProps = (state) => ({
    recipeList: state.recipeList.recipeList
});


const mapDispatchToProps = (dispatch) => {
    return {
        setRecipeList: (recipe) => dispatch(createRecipe(recipe)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(RecipeList);
