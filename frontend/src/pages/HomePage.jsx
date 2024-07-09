import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Prices } from "../components/Prices";
import { Checkbox, Radio } from "antd";
import { useCart } from "../context/Cart";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `https://e-backend-uqky.onrender.com/api/v1/product/get-product`
      );

      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while getting products");
    }
  };

  // Get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `https://e-backend-uqky.onrender.com/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while getting categories");
    }
  };

  // Handle category filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // Get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `https://e-backend-uqky.onrender.com/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Error while filtering price products");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    } else {
      getAllProducts();
    }
  }, [checked, radio]);

  useEffect(() => {
    setProducts([]);
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col filter-col">
            <h5>Filter By Category</h5>
            <div className="d-flex flex-column text-capitalize">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
            <h5 className="mt-4">Filter By Price</h5>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column mt-4">
              <button
                className="btn btn-danger"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Reset Filter
              </button>
            </div>
          </div>
          <div className="col-sm">
            <h2 className="h4">All Products</h2>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
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
                    <button
                      className="btn btn-secondary ms-2"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success(`Item Added to cart`);
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
              {products.length == 0 && (
                <>No Product available for this cateogry or price</>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
