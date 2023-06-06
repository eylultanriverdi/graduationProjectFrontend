import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setCategoryList } from '../redux/actions/productActions';

const CategoryList = (props) => {
  const { categoryList, setCategoryList } = props;

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

  return (
    <div>
      <h2>Category List:</h2>
      {categoryList && categoryList.map((category) => (
        <div key={category.categoryId}>{category.categoryName}</div>
      ))}
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
