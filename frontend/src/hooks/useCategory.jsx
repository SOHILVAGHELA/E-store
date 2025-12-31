import { useState, useEffect } from "react";
import axios from "axios";
import api from "../utils/api";
export default function useCategory() {
  const [categories, setCategories] = useState([]);

  // Get category
  const getCategories = async () => {
    try {
      const { data } = await api.get(`/api/v1/category/get-category`);
      setCategories(data?.category);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
