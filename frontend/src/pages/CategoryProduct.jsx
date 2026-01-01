import axios from "axios";
import Layout from "../components/Layout/Layout";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import Loader from "../pages/Loader";
const CategoryProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products || []);
      setCategory(data?.category || {});
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} results found</h6>
        <div className="row">
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {loading ? (
              <Loader />
            ) : (
              products.length > 0 &&
              products.map((p) => (
                <div key={p._id}>
                  <div
                    key={p._id}
                    className="card h-100"
                    style={{ width: "16.65rem" }}
                  >
                    <img
                      src={`${API_URL}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top product-img"
                      alt={p.name}
                    />
                    <div className="card-body p-2">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text small text-muted">
                        {p.description.substring(0, 30)}...
                      </p>
                      <p className="card-text">${p.price}</p>
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          See more
                        </button>

                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => {
                            setCart([...cart, p]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, p])
                            );
                            toast.success("Item Added to cart");
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
