import React, { useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import { createUser } from '../redux/actions/productActions';
import axios from 'axios';
import Alert from '@mui/material/Alert';

const RegisterPage = (props) => {
  const { createUser, history } = props;
  const navigate = useNavigate();
  const paperStyle = { padding: 20, height: '70vh', width: 320, margin: '120px auto' };
  const avatarStyle = { backgroundColor: '#32e232' };
  const buttonStyle = { margin: '8px 0' };
  const textFieldStyle = { marginBottom: '15px' };

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const createUserRegister = async () => {
    try {
      const resp = await axios.post('http://localhost:3001/register', {
        uid: '',
        name: name,
        surname: surname,
        email: email,
        tel: tel,
        password: password,
      });

      createUser(resp.data);

      // Başarılı kayıt olduğunda login sayfasına yönlendirme
      navigate('/loginPage');
    }catch (error) {
    console.log('Error:', error);
    setError('An error occurred during registration.');
  }
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Register</h2>
        </Grid>
        <TextField
          label="Name"
          placeholder="Enter name"
          fullWidth
          required
          style={textFieldStyle}
          color="secondary"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Surname"
          placeholder="Enter surname"
          fullWidth
          required
          style={textFieldStyle}
          color="secondary"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
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
          label="Phone number"
          placeholder="Enter phone number"
          fullWidth
          required
          style={textFieldStyle}
          color="secondary"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
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
        <FormControlLabel control={<Checkbox defaultChecked color="secondary" />} label="Remember me" />
        {error && (
          <Alert severity="error" onClose={() => setError('')}>
            {error}
          </Alert>
        )}
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          fullWidth
          style={buttonStyle}
          onClick={createUserRegister}
        >
          SIGN IN
        </Button>
        <Typography>
          Do you have an account ?
          <Link to="/loginPage" color="secondary">
            Sign IN
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  createUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
