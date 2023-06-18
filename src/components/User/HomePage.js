import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setUserInfo } from '../../redux/actions/productActions';
import jwt from 'jsonwebtoken';
import { Card, CardContent, Typography } from '@mui/material';

const base64UrlEncode = (value) => {
  const base64 = Buffer.from(value).toString('base64');
  return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};

const HomePage = (props) => {
  const { setUserInfo ,userRegister} = props;
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
      const userID = decodedToken.userID


      const header = base64UrlEncode(JSON.stringify({ alg: 'HS256' }));
      const payload = base64UrlEncode(JSON.stringify({userID}));


      const crypto = require('crypto');
      const signature = crypto
        .createHmac('sha256', 'xL#j9E7o!P1k@9qR3tZw5y')
        .update(`${header}.${payload}`)
        .digest('base64');

      const token = `${header}.${payload}.${signature}`;

      const resp = await axios.get('http://localhost:3001/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserInfo(resp.data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);


  return (
    <div>
        <div>
      <h1>Welcome to the Home Page</h1>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            {userRegister.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Age: <span style={{ color: 'black' }}></span> {userRegister.age}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            University: {userRegister.kilo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Experience: {userRegister.kilo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Profession: {userRegister.kilo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Explanation: {userRegister.dailyMovementAmount}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Explanation: {userRegister.desiredWeight}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Explanation: {userRegister.desiredDestination}
          </Typography>
        </CardContent>
      </Card>
    </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userRegister: state.userRegister.userRegister
});

const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
