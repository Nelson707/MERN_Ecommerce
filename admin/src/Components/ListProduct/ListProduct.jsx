import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

  const[allProducts,setAllProducts] = useState([]);

  const fetchInfo = async ()=>{
    await fetch('http://localhost:4000/allproducts')
    .then((resp) => resp.json())
    .then((data) => {setAllProducts(data)});
  }

  useEffect(()=>{
    fetchInfo();
  },[])

  const deleteProduct = async (id)=>{
    await fetch('http://localhost:4000/deleteproduct',{
      method:'DELETE',
      headers:{
          Accept:'application/json',
          'Content-Type':'application/json',
      },
      body:JSON.stringify({id:id})
    }).then((resp) => resp.json()).then((data) => {
      data.success?alert("Product deleted successfully"):alert("Failed to delete product")
  })
    await fetchInfo();
  }

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
    }
  };

  return (
    <div className='list-product'>
      <h1>All Products</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
      <hr/>
        {allProducts.map((product)=>{
          return <>
          <div key={product.id} className="listproduct-format-main listproduct-format">
            <img src={product.image} alt="" className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>{product.old_price}</p>
            <p>{product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={() => handleDeleteProduct(product.id)} className='listproduct-remove-icon' src={cross_icon} alt="" />
          </div>
          <hr/>
          </>
        })}
      </div>
    </div>
  )
}

export default ListProduct