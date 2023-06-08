import jwt from 'jsonwebtoken';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setUserInfo } from '../redux/actions/productActions';

const HomePage = (props) => {
  const { setUserInfo, userSignIn } = props;

  const fetchUserInfo = async () => {
    try {
      if (userSignIn && userSignIn.token) {
        const decodedToken = jwt.decode(userSignIn.token); // Tokenı decode et
  
        const userID = decodedToken.userId; // userID'yi al
  
        const resp = await axios.get('http://localhost:3001/profile', {
          headers: {
            Authorization: `Bearer ${userSignIn.token}`,
            'X-User-ID': userID, // userID'yi header'a ekle
          },
        });
  
        setUserInfo(resp.data);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  
  
  
  useEffect(() => {
    fetchUserInfo();
  }, [userSignIn, setUserInfo]);

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
