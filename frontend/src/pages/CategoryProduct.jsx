import axios from "axios";
import Layout from "../components/Layout/Layout";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CategoryProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://e-backend-uqky.onrender.com/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products || []);
      setCategory(data?.category || {});
    } catch (error) {
      setError("Failed to fetch products. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Layout>Loading...</Layout>;
  }

  if (error) {
    return <Layout>{error}</Layout>;
  }

  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} results found</h6>
        <div className="row">
          <div className="d-flex flex-wrap">
            {products.length > 0 ? (
              products.map((p) => (
                <div
                  key={p._id}
                  className="card m-2"
                  style={{ width: "16.65rem" }}
                >
                  <img
                    src={`https://e-backend-uqky.onrender.com/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text">${p.price}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      See more
                    </button>
                    <button className="btn btn-secondary ms-2">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No products found in this category.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
