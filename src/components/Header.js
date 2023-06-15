import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { setCategoryList } from '../redux/actions/productActions';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

const Header = (props) => {
  const { categoryList, setCategoryList } = props;
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const anchorRef = React.useRef(null);

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  const fetchCategoryList = async () => {
    try {
      const resp = await axios.get('http://localhost:3001/dietCategories');
      if (resp && resp.status === 200) {
        console.log('Response:', resp.data);
        setCategoryList(resp.data);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, zIndex: 100 }}>
      <AppBar position="static" style={{ backgroundColor: '#9c27b0' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
            <Button color="inherit" href="/">Product List</Button>
            <Button color="inherit" href="/calorieInformation">Calorie Information Page</Button>
            <Button color="inherit" href="/nutritionistList">Nutritionist List</Button>
            <Button color="inherit" href="/selectedNutritionistList">Selected Nutritionist List</Button>
            <Button color="inherit" href="/recipeList">Recipe List</Button>
            <div>
              <Button
                color="inherit"
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                Category List
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
                style={{ zIndex: 101 }}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                          style={{ padding: '8px 0' }}
                        >
                          {categoryList && categoryList.map((category, index) => (
                            <MenuItem
                              key={category.categoryId}
                              button
                              component="a"
                              href={`/category/${category.categoryId}`}
                              style={{
                                borderBottom: index !== categoryList.length - 1 ? '1px solid #e0e0e0' : 'none',
                                paddingTop: '8px',
                                paddingBottom: '8px',
                              }}
                            >
                              <ListItemText primary={category.categoryName} />
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </Box>
          <Button color="inherit" href="mainLoginPage">Login</Button>
          <Button color="inherit" href="registerLoginPage">Register</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  categoryList: state.categoryList.categoryList,
});

const mapDispatchToProps = {
  setCategoryList,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
