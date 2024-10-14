import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "./AuthContext";

const ProductCatagorysContext = createContext();

const ProductCatagoryProvider = ({ children }) => {
  const [productCatagories, setProductCatagories] = useState([]);

  const fetchProductCatagories = async () => {
    const response = await axios.get(`${API_URL}/productcatagory`);
    setProductCatagories(response.data);
  };

  const createProductCatagory = async (catagory, productNames, image) => {
    try {
      const response = await axios.post(`${API_URL}/productCatagory`, {
        catagory,
        productNames,
        image,
      });

      return response;
    } catch (e) {
      return { error: true, message: e.response.data.message };
    }
  };

  const valueToShare = {
    productCatagories,
    createProductCatagory,
    fetchProductCatagories,
  };

  return (
    <ProductCatagorysContext.Provider value={valueToShare}>
      {children}
    </ProductCatagorysContext.Provider>
  );
};

export { ProductCatagoryProvider };

export default ProductCatagorysContext;
