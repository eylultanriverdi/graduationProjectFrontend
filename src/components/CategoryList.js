import React, { useEffect,useState  } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setCategoryList } from '../redux/actions/productActions';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

const CategoryList = (props) => {
  const { categoryList, setCategoryList } = props;
  const categoryId = window.location.pathname.split("/")[2];
  const [category, setCategory] = useState({})

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

  useEffect(() => {
    fetchCategoryList();
  }, []);

  const getCategoryId = () => {
    categoryList && categoryList.map((category) => {
      if (categoryId === category.categoryId) {
        setCategory(category)
        return
      }
    })
  }


useEffect(() => {
    if (Object.keys(category).length === 0) {
      getCategoryId()
    }
  }, [categoryList])

  return (
    <div>
    <h1>Category Detail</h1>
    <Paper elevation={10} style={{ marginTop: "50px", marginBottom: "80px", height: "950px" }} >
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4} style={{ color: "#9c27b0" }}>
                <Typography variant="h4" component="h2">{category.categoryName}</Typography>
            </Grid>
            <Grid item xs={12} sm={4} style={{ color: "#9c27b0" }}>
                <Typography variant="h4" component="h2">{category.description}</Typography>
            </Grid>
        </Grid>
    </Paper >
</div>
  );
};

const mapStateToProps = (state) => ({
  categoryList: state.categoryList.categoryList,
});

const mapDispatchToProps = {
  setCategoryList,
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);
