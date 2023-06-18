import React, { useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import { Avatar, Button, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import { createSignIn, setUserInfo } from '../../redux/actions/productActions';
import axios from 'axios';
import Alert from '@mui/material/Alert';

const LoginPage = (props) => {
  const { createSignIn, userRegister } = props;
  const navigate = useNavigate();
  const paperStyle = { padding: 20, height: '70vh', width: 320, margin: '120px auto' };
  const avatarStyle = { backgroundColor: '#9c27b0' };
  const buttonStyle = { margin: '8px 0' };
  const textFieldStyle = { marginBottom: '15px' };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const createUserSignIn = async () => {
    try {
      const resp = await axios.post('http://localhost:3001/signin', {
        email: email,
        password: password,
      });
  
      const result = resp.data;
  
      createSignIn(result); // Dönen veriyi setUserInfo fonksiyonuyla Redux durumuna aktar
      navigate('/homePage', { state: { userRegister } }); // userRegister değerini navigate işlevine ekleyin
    } catch (error) {
      console.log('Error:', error);
      setError(
        'Your e-mail address is not registered in our system. Please complete your registration.'
      );
    }
  };

  console.log(userRegister, "userRegister")

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle }>
            <LockOutlinedIcon />
          </Avatar>
          <h2 style={{color: '#9c27b0'}} >Sign in</h2>
        </Grid>
        <TextField
          label="Email"
          placeholder="Enter email"
          fullWidth
          required
          style={textFieldStyle}
          color="secondary"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          style={textFieldStyle}
          fullWidth
          required
          color="secondary"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Alert severity="error" onClose={() => setError('')}>{error}</Alert>}
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          fullWidth
          style={buttonStyle}
          onClick={createUserSignIn}
        >
          SIGN IN
        </Button>
        <Typography color="secondary">
          Do you have an account ?
          <Link to="/registerPageUser" color="secondary">
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  userRegister: state.userRegister.userRegister,
});

const mapDispatchToProps = {
  createSignIn,
  setUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
