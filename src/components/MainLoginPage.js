import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PanToolAltRoundedIcon from '@mui/icons-material/PanToolAltRounded';
import { Card} from '@mui/material';

const MainLoginPage = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item>
        <Card variant="outlined" style={{ marginBottom: '20px' }}>
          <Typography variant="h6" align="center" gutterBottom color="secondary" style={{ marginBottom: '20px', marginTop: '20px', marginLeft: '20px', marginRight: '20px' }}>
            As a dietitian, would you like to use the application, or as a user?
          </Typography>
        </Card>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Button color="secondary" component={Link} to="/loginPageNutritionist" variant="contained">
              Dietitian
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <PanToolAltRoundedIcon style={{ color: 'white', marginTop: '0.5rem' }} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button color="secondary" component={Link} to="/loginPage" variant="contained">
              User
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <PanToolAltRoundedIcon style={{ color: 'white', marginTop: '0.5rem' }} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainLoginPage;
