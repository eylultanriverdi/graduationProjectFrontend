import React from 'react';
import { styled } from '@mui/system';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import { Grid, Button } from '@mui/material';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
  },
}));

export default function NavigationBar() {
  return (
    <StyledDrawer variant="permanent" anchor="left">
      <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={2}>
      <Grid item>
          <Button>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText />
          </Button>
        </Grid>
        <Grid item>
          <Button>
            <ListItemIcon>
            </ListItemIcon>
            <ListItemText />
          </Button>
        </Grid>
        <Grid item>
        <Button color="inherit" href='/'>Product List</Button>
        </Grid>
        <Grid item>
        <Button color="inherit" href='calorieInformation'>Calorie Information Page</Button>
        </Grid>
        <Grid item>
        <Button color="inherit" href='categoryList'>Category List</Button>
        </Grid>
      </Grid>
    </StyledDrawer>
  );
}
