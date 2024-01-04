import { createContext, useState } from "react";
import axios from "axios";
import * as SecureStorage from "expo-secure-store";
import { API_URL } from "./AuthContext";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axios.get(`${API_URL}/product`);
    setProducts(response.data);
  };

  const createProduct = async (formData) => {
    const _id = await SecureStorage.getItemAsync("user");
    try {
      const response = await fetch(`${API_URL}/product`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      fetchProducts();
      return response;
    } catch (e) {
      return { error: true, message: e.response.data.message };
    }
  };

  const valueToShare = {
    products,
    createProduct,
    fetchProducts,
  };

  return (
    <ProductContext.Provider value={valueToShare}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider };

export default ProductContext;
