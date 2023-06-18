import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setProducts } from '../redux/actions/productActions';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button ,Card} from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';

const ProductDetail = ({ allProducts, setProducts }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [showQRPopup, setShowQRPopup] = useState(false);

  const fetchProducts = async () => {
    try {
      const resp = await axios.get(`http://localhost:3001/products`);
      if (resp && resp.status === 200) {
        const { pagination, products } = resp.data;
        const { totalPages } = pagination;

        const decodedProducts = products.map((product) => {
          const base64Image = `data:image/jpeg;base64,${product.productImage}`;
          return {
            ...product,
            productImage: base64Image
          };
        });

        setProducts(decodedProducts);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const getProductId = () => {
      const selectedProduct = allProducts.find((product) => product.productId === productId);
      if (selectedProduct) {
        setProduct(selectedProduct);
      }
    };

    if (allProducts && allProducts.length > 0) {
      getProductId();
    }
  }, [allProducts, productId]);

  const handleQRButtonClick = () => {
    setShowQRPopup(true);
  };

  const closeQRPopup = () => {
    setShowQRPopup(false);
  };

  return (
    <div>
      <Card variant="outlined" style={{ marginBottom: '20px', marginTop: '20px' }}>
        <Typography color="secondary" style={{ marginLeft: '20px', fontSize: 'xx-large' }}>
          Product Detail
        </Typography>
      </Card>
      <Paper elevation={10} style={{ marginTop: '50px', marginBottom: '80px', height: '950px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <img src={product.productImage} align="center" style={{ marginBottom: '50px', marginLeft: '10px', width: '100%', height: 'auto' }} alt="Product" />
          </Grid>
          <Grid item xs={12} sm={6} style={{ color: '#9c27b0', padding: '20px' }}>
            <Typography variant="h4" component="h2" style={{ marginBottom: '10px' }}>
              {product.productName || 'Loading...'}
            </Typography>
            <Typography variant="body1" component="p" style={{ marginBottom: '5px' }}>
              {product.description || 'Loading...'}
            </Typography>
            <Typography variant="body1" component="p" style={{ marginBottom: '5px' }}>
              Protein: {product.proteinValue || 'Loading...'}
            </Typography>
            <Typography variant="body1" component="p" style={{ marginBottom: '5px' }}>
              Carbohydrate: {product.carbohydrateValue || 'Loading...'}
            </Typography>
            <Typography variant="body1" component="p" style={{ marginBottom: '5px' }}>
              Fat: {product.oilValue || 'Loading...'}
            </Typography>
            <Typography variant="body1" component="p" style={{ marginBottom: '5px' }}>
              Gluten Value: {product.glutenValue || 'Loading...'}
            </Typography>
            <Typography variant="body1" component="p" style={{ marginBottom: '5px' }}>
              Gluten Free: {product.glutenFree || 'Loading...'}
            </Typography>
            <Typography variant="body1" component="p" style={{ marginBottom: '5px' }}>
              Ketogenic Diet: {product.ketogenicDiet || 'Loading...'}
            </Typography>
            <Typography variant="body1" component="p" style={{ marginBottom: '5px' }}>
              Salt Free: {product.saltFree || 'Loading...'}
            </Typography>
            <Typography variant="body1" component="p">
              Calories: {product.calorieValue || 'Loading...'} cal
            </Typography>
            <Button variant="contained" color="secondary" onClick={handleQRButtonClick} style={{ marginTop: '20px' }}>
              Generate QR Code
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Dialog open={showQRPopup} onClose={closeQRPopup}>
        <DialogTitle color="secondary">QR Code</DialogTitle>
        <DialogContent>
          <QRCodeCanvas value={window.location.href} size={256} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeQRPopup} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allProducts: state.allProducts.products
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setProducts: (products) => {
      dispatch(setProducts(products));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
