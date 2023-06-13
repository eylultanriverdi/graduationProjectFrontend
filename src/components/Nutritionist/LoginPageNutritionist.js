import React, { useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import { Avatar, Button, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { createSignInNutritionist } from '../../redux/actions/productActions';

const LoginPageNutritionist = (props) => {
  const { createSignInNutritionist,nutritionistRegister } = props;
  const navigate = useNavigate();
  const paperStyle = { padding: 20, height: '70vh', width: 320, margin: '120px auto' };
  const avatarStyle = { backgroundColor: '#9c27b0' };
  const buttonStyle = { margin: '8px 0' };
  const textFieldStyle = { marginBottom: '15px' };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const createNutritionistSignIn = async () => {
    try {
      const resp = await axios.post('http://localhost:3001/signinNutritionist', {
        email: email,
        password: password,
      });

      const result = resp.data;
      console.log("result", result);
      localStorage.setItem('login', JSON.stringify({
        login: true,
        token: result.token
      }));

      createSignInNutritionist(result);
      navigate('/homePageNutritionist', { state: { nutritionistRegister } }); 
    } catch (error) {
      console.log('Error:', error);
      setError('Your e-mail address is not registered in our system. Please complete your registration.');
    }
  };

  console.log(nutritionistRegister,"nutritionistRegisternutritionistRegister")

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign in</h2>
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
          onClick={createNutritionistSignIn}
        >
          SIGN IN
        </Button>
        <Typography>
          Do you have an account ?
          <Link to="/registerPageNutritionist" color="secondary">
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  nutritionistRegister:state.nutritionistRegister.nutritionistRegister
});

const mapDispatchToProps = {
    createSignInNutritionist,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPageNutritionist);
