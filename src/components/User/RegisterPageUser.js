import React, { useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Paper, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import { createUser } from '../../redux/actions/productActions';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LoginPage from './LoginPage';

const RegisterPage = (props) => {
  const { createUser, userRegister } = props;
  const navigate = useNavigate();
  const paperStyle = { padding: 20, margin: '120px auto' };
  const avatarStyle = { backgroundColor: '#32e232' };
  const buttonStyle = { margin: '8px 0' };
  const textFieldStyle = { marginBottom: '15px' };

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [age, setAge] = useState('');
  const [kilo, setKilo] = useState('');
  const [height, setHeight] = useState('');
  const [amountOfWater, setAmountOfWater] = useState('');
  const [dailyMovementAmount, setDailyMovementAmount] = useState('');
  const [desiredDestination, setDesiredDestination] = useState('');
  const [desiredWeight, setDesiredWeight] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const isFormCompleted =
    name &&
    surname &&
    email &&
    tel &&
    password &&
    age &&
    kilo &&
    height &&
    amountOfWater &&
    dailyMovementAmount &&
    desiredWeight &&
    desiredDestination;

  const createUserRegister = async () => {
    try {
      const resp = await axios.post('http://localhost:3001/userRegister', {
        uid: '',
        name: name,
        surname: surname,
        email: email,
        tel: tel,
        password: password,
        age: age,
        kilo: kilo,
        height: height,
        amountOfWater: amountOfWater,
        dailyMovementAmount: dailyMovementAmount,
        desiredWeight: desiredWeight,
        desiredDestination: desiredDestination,
      });

      if (resp.status === 200) {
        // Registration successful
        createUser(resp.data);

        // Redirect to the login page after successful registration
        setRegistrationSuccess(true);
        setError('');
      } else {
        // Registration failed
        setError('An error occurred during registration. Please try again.');
      }
    } catch (error) {
      console.log('Error:', error);
      setError('An error occurred during registration. Please try again.');
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignInClick = () => {
    navigate('/loginPage', { state: { userRegister } });
  };


  return (
    <Grid container justifyContent="center">
      <Paper elevation={10} style={paperStyle}>
        <Avatar style={avatarStyle}>
          <LockOutlinedIcon />
        </Avatar>
        <h2 align="center">
          Welcome ! Let's do the registration.
        </h2>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={6}>
            <Grid align="center">
              <Typography variant="h5">User Information</Typography>
            </Grid>
            <TextField
              label="Name"
              placeholder="Enter your name"
              fullWidth
              required
              style={textFieldStyle}
              color="secondary"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Surname"
              placeholder="Enter your surname"
              fullWidth
              required
              style={textFieldStyle}
              color="secondary"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            <TextField
              label="Email"
              placeholder="Enter your email address"
              fullWidth
              required
              style={textFieldStyle}
              color="secondary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Phone number"
              placeholder="Enter your phone number"
              fullWidth
              required
              style={textFieldStyle}
              color="secondary"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
            <TextField
              label="Password"
              placeholder="Enter your password"
              type={showPassword ? 'text' : 'password'} // Show password if checkbox is checked
              style={textFieldStyle}
              fullWidth
              required
              color="secondary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Grid align="center">
              <Typography variant="h5">Let's Get to Know You</Typography>
            </Grid>
            <TextField
              label="Age"
              placeholder="Enter your age"
              fullWidth
              required
              style={textFieldStyle}
              color="secondary"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <TextField
              label="Weight"
              placeholder="Enter your weight"
              fullWidth
              required
              style={textFieldStyle}
              color="secondary"
              value={kilo}
              onChange={(e) => setKilo(e.target.value)}
            />
            <TextField
              label="Height"
              placeholder="Enter your height"
              fullWidth
              required
              style={textFieldStyle}
              color="secondary"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <TextField
              label="Amount of Water"
              placeholder="Enter your daily water intake"
              fullWidth
              required
              style={textFieldStyle}
              color="secondary"
              value={amountOfWater}
              onChange={(e) => setAmountOfWater(e.target.value)}
            />
            <TextField
              label="Daily Movement Amount"
              placeholder="Enter your daily movement amount"
              fullWidth
              required
              style={textFieldStyle}
              color="secondary"
              value={dailyMovementAmount}
              onChange={(e) => setDailyMovementAmount(e.target.value)}
            />
            <TextField
              label="Desired Weight"
              placeholder="Enter your desired weight"
              fullWidth
              required
              style={textFieldStyle}
              color="secondary"
              value={desiredWeight}
              onChange={(e) => setDesiredWeight(e.target.value)}
            />
            <TextField
              label="Desired Destination"
              placeholder="Enter your desired destination"
              fullWidth
              required
              style={textFieldStyle}
              color="secondary"
              value={desiredDestination}
              onChange={(e) => setDesiredDestination(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          disabled={!isFormCompleted}
          fullWidth
          style={buttonStyle}
          onClick={createUserRegister}
        >
          Register
        </Button>

        {error && (
          <Alert severity="error" style={textFieldStyle}>
            {error}
          </Alert>
        )}
        {registrationSuccess && (
          <div>
            <Typography variant="body1" align="center">
              Your registration has been successful.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              style={buttonStyle}
              onClick={handleSignInClick}
            >
              Sign In
            </Button>
          </div>
        )}
      </Paper>
    </Grid>
  );
};


const mapStateToProps = (state) => ({
  userRegister: state.userRegister.userRegister
});

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => dispatch(createUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
