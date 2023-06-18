import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import axios from 'axios';
import { setCategoryList } from '../redux/actions/productActions';
import { Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, CircularProgress } from '@mui/material';
import Healthyeating from '../assets/Healthyeating.webp';
import GlutenFree from '../assets/Gluten-Free.webp';
import Pregnancy from '../assets/Pregnancy.jpg';
import diabetes from '../assets/diabets.webp';
import keto from '../assets/keto.jpg';
import vegan from '../assets/vegan.jpg';
import vegetarian from '../assets/vegetarian.webp';

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

  let categoryImageSrc = '';

  switch (categoryId) {
    case '2b1f7be7':
      categoryImageSrc = vegan;
      break;
    case '0513121d':
      categoryImageSrc = vegetarian;
      break;
    case 'bbb67310':
      categoryImageSrc = GlutenFree;
      break;
    case '8b21ce15':
      categoryImageSrc = Healthyeating;
      break;
    case '653625de':
      categoryImageSrc = diabetes;
      break;
    case '92b53533':
      categoryImageSrc = keto;
      break;
    case '076335dc':
      categoryImageSrc = Pregnancy;
      break;
    default:
      categoryImageSrc = null; 
      break;
  }

  if (categoryImageSrc === null) {
    return (
      <div>
        <Typography variant="h6" component="p">No image available for this category.</Typography>
      </div>
    );
  }

  return (
    <div>
      <Paper elevation={10} style={{ marginTop: "50px", marginBottom: "80px", padding: '20px' }}>
        <Typography variant="h4" component="h2" color="secondary" style={{ marginBottom: '20px', fontWeight: 'bold' }}>{category.categoryName}</Typography>
        {category.categoryImage && (
          <img  src={categoryImageSrc} alt="Category" onLoad={handleImageLoad} style={{ width: '100%', display: isImageLoaded ? 'block' : 'none' }} />
        )}
        <Typography variant="h6" component="p" style={{ marginTop: '20px', marginBottom: '20px' ,color: 'secondary'}}>List Owner: {category.dietitianName}</Typography>
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
