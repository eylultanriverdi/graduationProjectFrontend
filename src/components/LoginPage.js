import React from 'react'
import Grid from '@mui/material/Grid';
import { Avatar, Button, Paper, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';


const LoginPage = () => {

    const paperStyle = { padding: 20, height: '70vh', width: 320, margin: "120px auto" }
    const avatarStyle = { backgroundColor: '#32e232' }
    const buttonStyle = {margin: "8px 0"}
    const textFieldStyle = {marginBottom: "15px" }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <LockOutlinedIcon></LockOutlinedIcon>
                    </Avatar>
                    <h2>Sign in</h2>
                </Grid>
                <TextField label="Username" placeholder='Enter username' fullWidth required style={textFieldStyle} color="secondary"></TextField>
                <TextField label="Password" placeholder='Enter password' type='password' fullWidth required color="secondary" ></TextField>
                <FormControlLabel control={<Checkbox defaultChecked color="secondary" />} label="Remember me" />
                <Button type='submit' color='secondary' variant='contained' fullWidth style={buttonStyle} >SIGN IN</Button>
                <Typography>
                    <Link to="/" color='secondary' >
                        Forgot Password ?
                    </Link>
                </Typography>
                <Typography>
                    Do you have an account ?
                    <Link to="/registerPage" color='secondary' >
                       Sign Up  
                    </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default LoginPage