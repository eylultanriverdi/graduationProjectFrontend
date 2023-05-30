import React from 'react'
import Grid from '@mui/material/Grid';
import { Avatar, Button, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';

const RegisterPage = (/* props */) => {
/* 
    const{

    } = props; */


    const paperStyle = { padding: 20, height: '70vh', width: 320, margin: "120px auto" }
    const avatarStyle = { backgroundColor: '#32e232' }
    const buttonStyle = { margin: "8px 0" }
    const textFieldStyle = { marginBottom: "15px" }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <LockOutlinedIcon></LockOutlinedIcon>
                    </Avatar>
                    <h2>Register</h2>
                </Grid>
                <TextField label="Name" placeholder='Enter name' fullWidth required style={textFieldStyle} color="secondary"></TextField>
                <TextField label="Surnama" placeholder='Enter surnama' fullWidth required style={textFieldStyle} color="secondary" ></TextField>
                <TextField label="Email" placeholder='Enter email' fullWidth required style={textFieldStyle} color="secondary"></TextField>
                <TextField label="Phone number" placeholder='Enter phone number' fullWidth required  style={textFieldStyle} color="secondary" ></TextField>
                <TextField label="Password" placeholder='Enter password' type='password'style={textFieldStyle} fullWidth required color="secondary" ></TextField>
               <FormControlLabel control={<Checkbox defaultChecked color="secondary" />} label="Remember me" />
                <Button type='submit' color='secondary' variant='contained' fullWidth style={buttonStyle} >SIGN IN</Button>
                <Typography>
                    Do you have an account ? 
                    <Link to="/" color='secondary' >
                        Sign IN
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

/* const mapStateToProps = () => ({
  });
  
  const mapDispatchToProps = () => ({
    });
  
  export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage); */

  export default RegisterPage;