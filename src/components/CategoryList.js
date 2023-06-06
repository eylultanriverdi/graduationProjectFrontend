import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import axios from 'axios';
import { setCategoryList } from '../redux/actions/productActions';
import { Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, CircularProgress } from '@mui/material';

const CategoryList = (props) => {
  const { categoryList, setCategoryList } = props;
  const categoryId = window.location.pathname.split("/")[2];
  const [category, setCategory] = useState({});
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const fetchCategoryList = async () => {
    try {
      const resp = await axios.get('http://localhost:3001/dietCategories');
      if (resp && resp.status === 200) {
        const decodedCategories = resp.data.map((categoryList) => {
          const base64Image = `data:image/jpeg;base64,${categoryList.categoryImage}`;
          return {
            ...categoryList,
            categoryImage: base64Image
          };
        });
        dispatch(setCategoryList(decodedCategories));
      }
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  useEffect(() => {
    const getCategoryId = () => {
      categoryList &&
        categoryList.forEach((category) => {
          if (categoryId === category.categoryId) {
            setCategory(category);
            return;
          }
        });
    };

    if (Object.keys(category).length === 0) {
      getCategoryId();
    }
  }, [categoryList, categoryId]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color='secondary' />
      </div>
    );
  }

  return (
    <div>
      <Paper elevation={10} style={{ marginTop: "50px", marginBottom: "80px", padding: '20px' }}>
        <Typography variant="h4" component="h2" color="secondary" style={{ marginBottom: '20px', fontWeight: 'bold' }}>{category.categoryName}</Typography>
        {category.categoryImage && (
          <img  src={`${category.categoryImage}?width=500&quality=50`} alt="Category" onLoad={handleImageLoad} style={{ width: '100%', display: isImageLoaded ? 'block' : 'none' }} />
        )}
        <Typography variant="h6" component="p" style={{ marginTop: '20px', marginBottom: '20px' }}>{category.description}</Typography>
        <Typography variant="h5" component="h3" color="secondary" style={{ marginBottom: '20px', fontWeight: 'bold' }}>Planlar</Typography>
        {category.dailyDietPlan && category.dailyDietPlan.map((plan, index) => (
          <div key={index}>
            <Typography variant="h6" component="p" style={{ marginTop: '10px', fontWeight: 'bold', color: 'secondary' }}>{plan.ageRange}</Typography>
            <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><Typography variant="h6" component="b" color="secondary">Breakfast</Typography></TableCell>
                    <TableCell><Typography variant="h6" component="b" color="secondary">Lunch</Typography></TableCell>
                    <TableCell><Typography variant="h6" component="b" color="secondary">Dinner</Typography></TableCell>
                    <TableCell><Typography variant="h6" component="b" color="secondary">Snack</Typography></TableCell>
                    <TableCell><Typography variant="h6" component="b" color="secondary">Amount of Water</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {plan.programDetails && plan.programDetails.map((detail, index) => (
                    <TableRow key={index}>
                      <TableCell><Typography variant="body1" style={{ fontWeight: 'bold', color: 'secondary' }}>{detail.breakfast}</Typography></TableCell>
                      <TableCell><Typography variant="body1" style={{ fontWeight: 'bold', color: 'secondary' }}>{detail.lunch}</Typography></TableCell>
                      <TableCell><Typography variant="body1" style={{ fontWeight: 'bold', color: 'secondary' }}>{detail.dinner}</Typography></TableCell>
                      <TableCell><Typography variant="body1" style={{ fontWeight: 'bold', color: 'secondary' }}>{detail.snack}</Typography></TableCell>
                      <TableCell><Typography variant="body1" style={{ fontWeight: 'bold', color: 'secondary' }}>{detail.amountofWater}</Typography></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))}
      </Paper>
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
