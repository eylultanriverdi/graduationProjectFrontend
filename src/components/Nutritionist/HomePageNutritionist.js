import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { setNutritionistInfo } from '../../redux/actions/productActions';

const base64UrlEncode = (value) => {
    const base64 = Buffer.from(value).toString('base64');
    return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};

const HomePageNutritionist = (props) => {
    const { setNutritionistInfo, nutritionistInfoToken, nutritionistSignIn } = props;
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
            const nutritionistID = decodedToken.userID

            console.log(decodedToken.nutritionistID, "decode")

            const header = base64UrlEncode(JSON.stringify({ alg: 'HS256' }));
            const payload = base64UrlEncode(JSON.stringify({ nutritionistID }));

            console.log(payload, "payload")

            const crypto = require('crypto');
            const signature = crypto
                .createHmac('sha256', 'xL#j9E7o!P1k@9qR3tZw5y')
                .update(`${header}.${payload}`)
                .digest('base64');

            const token = `${header}.${payload}.${signature}`;

            console.log(token, 'token');

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
        <div>
            <h1>Welcome to the Home Page</h1>
        </div>
    );
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
    setNutritionistInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageNutritionist);
