import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import Product from './Product';
import axios from 'axios';
import { setProducts } from '../redux/actions/productActions';


const ProductListing = () => {

    const products = useSelector((state) => state);
    const dispatch = useDispatch();

    const fetchProcts = async () => {
        const resp = await axios
            .get("localhost:3000/products").catch(
                (err) => {
                    console.log("Err", err)
                }
            );
    }

    useEffect(() => {
        fetchProcts();
    }, [])


    console.log("Products: ",products)

    return (
        <div>
            <h1 style={{color:"#9c27b0"}} >Product Listing</h1>
            <Product></Product>
        </div>
    )
}

export default ProductListing