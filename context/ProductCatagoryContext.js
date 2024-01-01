import { createContext, useState } from "react";
import axios from "axios";
import { API_URL } from "./AuthContext";

const ProductCatagorysContext = createContext();

const ProductCatagoryProvider = ({ children }) => {
  const [productCatagories, setProductCatagories] = useState([]);

  const fetchProductCatagories = async () => {
    const response = await axios.get(`${API_URL}/productCatagory`);
    setProductCatagories(response.data);
  };

  const createProductCatagory = async (formData) => {
    try {
      const response = await fetch(
        "http://10.194.65.14:8000/api/productCatagory/",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        }
      );
      return response;
    } catch (e) {
      console.log(e);
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
