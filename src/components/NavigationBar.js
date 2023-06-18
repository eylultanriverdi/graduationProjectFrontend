import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import { connect } from 'react-redux';
import { Grid, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { setCategoryList } from '../redux/actions/productActions';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
  },
}));

const NavigationBar = (props) => {
  const { categoryList,setCategoryList } = props;
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  const fetchCategoryList = async () => {
    try {
      const resp = await axios.get('http://localhost:3001/dietCategories');
      if (resp && resp.status === 200) {
        setCategoryList(resp.data);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);


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
          <Button color="inherit" href="/">
            Product List
          </Button>
        </Grid>
        <Grid item>
          <Button color="inherit" href="/calorieInformation">
            Calorie Information Page
          </Button>
        </Grid>
        <Grid item>
          <Accordion expanded={expanded} onChange={handleAccordionChange}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <ListItemText primary="Category List" />
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {categoryList &&
                  categoryList.map((category) => (
                    <ListItem
                      key={category.categoryId}
                      button
                      component="a"
                      href={`/category/${category.categoryId}`}
                    >
                      <ListItemText primary={category.categoryName} />
                    </ListItem>
                  ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </StyledDrawer>
  );
};

const mapStateToProps = (state) => ({
  categoryList: state.categoryList.categoryList,
});

const mapDispatchToProps = {
  setCategoryList,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
