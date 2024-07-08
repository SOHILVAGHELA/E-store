import axios from "axios";
import Layout from "../components/Layout/Layout";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDatail = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout>
        <div className="container py-5">
          {product && (
            <div className="row">
              <div className="col-md-4">
                <img
                  src={`http://localhost:4000/api/v1/product/product-photo/${product._id}`}
                  className="w-100"
                  alt={product.name}
                />
              </div>
              <div className="col-md-8">
                <h1>Product Detail</h1>
                <h6>Name: {product.name}</h6>
                <h6>Description: {product.description}</h6>
                <h6>Price: ${product.price}</h6>
                <h6>Category: {product.category.name}</h6>
                <button className="btn btn-secondary ms-1">Add To Cart</button>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default ProductDatail;
