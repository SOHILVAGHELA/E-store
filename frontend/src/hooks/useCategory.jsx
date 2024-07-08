// import { useState, useEffect } from "react";
// import axios from "axios";
// export default function useCategory() {
//   const [categories, setCategories] = useState([]);

//   //get category
//   const getCategories = (async) => {
//     try {
//       const { data } = axios.get(
//         `http://localhost:4000/api/v1/category/get-category`
//       );
//       setCategories(data?.category);
//     } catch (error) {
//       console.log();
//     }
//   };
//   useEffect(() => {
//     getCategories();
//   }, []);
//   return categories;
// }

import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  // Get category
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/category/get-category`
      );
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
