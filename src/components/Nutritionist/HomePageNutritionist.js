import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { setNutritionistInfo } from '../../redux/actions/productActions';
import { Card, CardContent, Typography, Button, CardActions, Box } from '@mui/material';

const base64UrlEncode = (value) => {
    const base64 = Buffer.from(value).toString('base64');
    return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};

const HomePageNutritionist = (props) => {
    const { setNutritionistInfo, nutritionistRegister } = props;
    const [login, setLogin] = useState(false);
    const [store, setStore] = useState(null);

    const fetchUserInfo = async () => {
        try {
            const storedLogin = JSON.parse(localStorage.getItem('login'));
            if (storedLogin && storedLogin.login) {
                setLogin(true);
                setStore(storedLogin);
            }

            const decodedToken = jwt.decode(storedLogin.token);
            const nutritionistID = decodedToken.userID;

            const header = base64UrlEncode(JSON.stringify({ alg: 'HS256' }));
            const payload = base64UrlEncode(JSON.stringify({ nutritionistID }));

            const crypto = require('crypto');
            const signature = crypto
                .createHmac('sha256', 'xL#j9E7o!P1k@9qR3tZw5y')
                .update(`${header}.${payload}`)
                .digest('base64');

            const token = `${header}.${payload}.${signature}`;

            const resp = await axios.get('http://localhost:3001/profileNutritionist', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setNutritionistInfo(resp.data);
            console.log(resp.data, 'resp.data');
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        fetchUserInfo();
    }, []);

    return (
        <div color="#9c27b0" >
            <h1 style={{ color: '#9c27b0' }}>Welcome {nutritionistRegister.name}</h1>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="body2" color="secondary">
                        Age: {nutritionistRegister.age}
                    </Typography>
                    <Typography variant="body2" color="secondary">
                        University: {nutritionistRegister.uni}
                    </Typography>
                    <Typography variant="body2" color="secondary">
                        Experience: {nutritionistRegister.experience}
                    </Typography>
                    <Typography variant="body2" color="secondary">
                        Profession: {nutritionistRegister.profession}
                    </Typography>
                    <Typography variant="body2" color="secondary">
                        Explanation: {nutritionistRegister.explanation}
                    </Typography>
                </CardContent>
            </Card>
            <Box mt={2}>
                <Button variant="contained" color="secondary">
                    Liste Oluşturma İçin Tıklayın
                </Button>
                <Button style={{ marginLeft: "10px" }} variant="contained" color="secondary">
                    Yemek Tarifleri Oluşturmak İçin Tıklayın
                </Button>
            </Box>
        </div>
    );
};

const mapStateToProps = (state) => ({
    nutritionistRegister: state.nutritionistRegister.nutritionistRegister,
});

const mapDispatchToProps = {
    setNutritionistInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageNutritionist);
