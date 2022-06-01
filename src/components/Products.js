import React, {useState, useEffect} from 'react';
import {add} from '../store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import { STATUSES } from '../store/productSlice';

const Products = () => {
    const dispatch = useDispatch();
    const {data : products, status} = useSelector(state => state.product);
    // const [products , setProducts] = useState([]);
    useEffect(()=>{
        // new logic.
        dispatch(fetchProducts());


        // old logic
        // const fetchProducts = async () => {
        //     const res = await fetch('https://fakestoreapi.com/products');
        //     const data = await res.json();
        //     setProducts(data);
        // };
        // fetchProducts();
    },[dispatch])

    const handleAdd = (product) =>{
        dispatch(add(product));
    }


    if(status === STATUSES.LOADING){
        return <h2>Loading...</h2>
    }
  return (
    <div className='productsWrapper'>
        {
            products.map((product, key)=>(
                <div className="card" key={product.id}>
                    <img src={product.image} alt="" />
                    <h4>{product.title}</h4>
                    <h5>{product.price}</h5>
                    <div onClick={()=> handleAdd(product)} className="btn">Add to cart</div>
                </div>
            ))
        }
    </div>
  )
}

export default Products