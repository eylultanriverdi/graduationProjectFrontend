import React, { useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Paper, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import { createNutritionist } from '../../redux/actions/productActions';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const RegisterPageNutritionist = (props) => {
  const { createNutritionist, history } = props;
  const navigate = useNavigate();
  const paperStyle = { padding: 20, height: '70vh', width: 600, margin: '120px auto' };
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
  const [uni, setUni] = useState('');
  const [experience, setExperience] = useState('');
  const [profession, setProfession] = useState('');
  const [explanation, setExplanation] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const isFormCompleted =
    name &&
    surname &&
    email &&
    tel &&
    password &&
    age &&
    uni &&
    experience &&
    profession &&
    explanation

  const createNutritionistRegister = async () => {
    try {
      const resp = await axios.post('http://localhost:3001/nutritionistRegister', {
        uid: '',
        name: name,
        surname: surname,
        email: email,
        tel: tel,
        password: password,
        age: age,
        uni:uni,
        experience:experience,
        profession:profession,
        explanation:explanation
      });

      if (resp.status === 200) {
        // Registration successful
        createNutritionist(resp.data);

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
              <Typography variant="h5">Dietitian Information</Typography>
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
              label="Your University"
              placeholder="Enter your university"
              fullWidth
              required
              style={textFieldStyle}
              color="secondary"
              value={uni}
              onChange={(e) => setUni(e.target.value)}
            />
            <TextField
              label="Experience"
              placeholder="Enter your experience"
              fullWidth
              required
              style={textFieldStyle}
              color="secondary"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
            <TextField
              label="Profession"
              placeholder="Enter your profession"
              fullWidth
              required
              style={textFieldStyle}
              color="secondary"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
            />
            <TextField
              label="Explanation"
              placeholder="Enter your explanation"
              fullWidth
              required
              style={textFieldStyle}
              color="secondary"
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
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
          onClick={createNutritionistRegister}
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
              onClick={() => navigate('/loginPageNutritionist')}
            >
              Sign In
            </Button>
          </div>
        )}

      </Paper>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNutritionist: (nutritionist) => dispatch(createNutritionist(nutritionist)),
  };
};

export default connect(null, mapDispatchToProps)(RegisterPageNutritionist);
