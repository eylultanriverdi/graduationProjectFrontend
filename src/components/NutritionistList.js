import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import axios from 'axios';
import { setNutritionistList } from '../redux/actions/productActions';
import { Card, CardContent, Typography, CircularProgress, Button } from '@mui/material';

const NutritionistList = (props) => {
    const { setNutritionistList, nutritionistList } = props;
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    const fetchNutritionistList = async () => {
        try {
            const resp = await axios.get('http://localhost:3001/nutritionists');

            setNutritionistList(resp.data);
        } catch (error) {
            console.log('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNutritionistList();
    }, []);

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress color='secondary' />
            </div>
        );
    }

    return (
        <div>
            {nutritionistList &&
                nutritionistList.map((nutritionist) => (
                    <div key={nutritionist.id} style={{ color: '#9c27b0' }}>
                        <h2 style={{ color: '#9c27b0' }}>{nutritionist.name} {nutritionist.surname}</h2>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="body2" color="secondary">
                                    Age: {nutritionist.age}
                                </Typography>
                                <Typography variant="body2" color="secondary">
                                    University: {nutritionist.uni}
                                </Typography>
                                <Typography variant="body2" color="secondary">
                                    Experience: {nutritionist.experience}
                                </Typography>
                                <Typography variant="body2" color="secondary">
                                    Profession: {nutritionist.profession}
                                </Typography>
                                <Typography variant="body2" color="secondary">
                                    Explanation: {nutritionist.explanation}
                                </Typography>
                                <div style={{ display: 'flex', justifyContent: 'flex-end',marginTop: '10px' }}>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                    >
                                        Contact Us
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
        </div>
    );
};

const mapStateToProps = (state) => ({
    nutritionistList: state.nutritionistList.nutritionistList
});

const mapDispatchToProps = {
    setNutritionistList,
};

export default connect(mapStateToProps, mapDispatchToProps)(NutritionistList);
