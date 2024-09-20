import React, { useEffect, useState } from "react";
import classes from "./Results.module.css";
import Layout from "../../Component/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/EndPoint.jsx";
import ProductCard from "../../Component/Product/ProductCard";
//import ProductCard from "../../Component/ProductCard/ProductCard"; // Importing ProductCard
import Loading from "../../Component/Loading/Loading.jsx"
function Results() {
  const [results, setResults] = useState([]); // Fixed SetResults to setResults
  const { categoryName } = useParams();
 const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        setResults(res.data); // Fixed SetResults to setResults
      })
      .catch((err) => {
        console.error("Error fetching the products: ", err); // Added error handling
      });
  }, [categoryName]); // Added categoryName to the dependency array

  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category / {categoryName}</p>
        <hr />
{isLoading?(
  <Loading/>):(
  

        <div className={classes.products_container}>
          {results?.map((product) => (
            <ProductCard
              key={product.id}
              renderAdd={true}
              product={product}
              renderDesc={false}
              
            />
          ))}
        </div>
  )}
      </section>
    </Layout>
  );
};

export default Results;

