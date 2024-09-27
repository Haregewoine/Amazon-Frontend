import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import classes from "./Product.module.css";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat.jsx";
import { Link } from "react-router-dom";
import { img } from "../Carousel/img/data.jsx";
import { DataContext } from "../DataProvider/DataProvider.jsx";
import { Type } from "../../utility/action.type";



function ProductCard({ product, flex, renderDesc }) {
  const { image,title,id,rating,price,description} = product;

  const[state,dispatch]=useContext(DataContext)
  const addToCart=()=>{
    dispatch({
      type: Type.ADD_TO_BASKET,
      item:{
        image,title,id,rating,price,description
      }
    })
  }


  return (
    <div
      className={`${classes.card__container} ${
        flex ? classes.product__flexed : ""
      }`}
    >
      <Link to={`/product/${id}`}>
        <img src={image} alt={title} className={classes.img_container} />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDesc && <div>{description}</div>}
        <div className={classes.rating}>
          <Rating value={rating?.rate} precision={0.1} />
          <small>{rating?.count}</small>
        </div>

        <div>
          <CurrencyFormat amount={price} />
        </div>

        
        <button className={classes.button} onClick={() => addToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;















