import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setUserInfo } from '../redux/actions/productActions';
import jwt from 'jsonwebtoken';

const base64UrlEncode = (value) => {
  const base64 = Buffer.from(value).toString('base64');
  return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
};

const HomePage = (props) => {
  const { setUserInfo, userSignIn } = props;
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

      console.log(decodedToken.userID,"decode")

      const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
      const payload = base64UrlEncode(JSON.stringify({userID }));


      const crypto = require('crypto');
      const signature = crypto
        .createHmac('sha256', 'xL#j9E7o!P1k@9qR3tZw5y')
        .update(`${header}.${payload}`)
        .digest('base64');

      const token = `${header}.${payload}.${signature}`;

      console.log(token, 'token');

      const resp = await axios.get('http://localhost:3001/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserInfo(resp.data);
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
  userSignIn: state.userSignIn.userSignIn.token,
  userInfoToken: state.userInfoToken.userInfoToken,
});

const mapDispatchToProps = {
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
