
import React ,{useState ,useEffect } from 'react'
import classes from './ProductDetail.module.css'
import Layout from '../../Component/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/EndPoint.jsx'
import ProductCard from '../../Component/Product/ProductCard'
import Loading from '../../Component/Loading/Loading.jsx'

function ProductDetail() {
  const[isLoading, setIsLoading] = useState(false)
  const { productId } = useParams()
  const [product, setProduct] = useState({})
  useEffect(() => {
    setIsLoading(true)
    axios.get(`${productUrl}/products/${productId}`)
    .then((res)=>{
      setProduct(res.data)
      setIsLoading(false)
    }).catch((err)=>{
      console.log(err)
      isLoading(false)
    })
  },[])

  return (
    <Layout>
      {}
      {isLoading ? (
        <Loading />
      ) : (
        <ProductCard product={product} 
        flex={true} 
        renderDesc={true}
        renderAdd={true}
        />
      )}
    </Layout>
  );
}

export default ProductDetail
