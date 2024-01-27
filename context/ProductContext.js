import { createContext, useState } from "react";
import axios from "axios";
import * as SecureStorage from "expo-secure-store";
import { API_URL } from "./AuthContext";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

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

  const myWishList = async (productId) => {
    const id = await SecureStorage.getItemAsync("user");
    console.log(id, productId);
    try {
      const response = await axios.put(`${API_URL}/product/wishlist/${id}`, {
        productId,
      });
      return response;
    } catch (e) {
      return { error: true, message: e.response.data.message };
    }
  };

  const fetchMyWishList = async () => {
    const id = await SecureStorage.getItemAsync("user");
    const response = await axios.get(`${API_URL}/product/mywishlist/${id}`);
    setWishlist(response.data);
  };

  const payment = async (amount, phoneNumber) => {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer CHASECK_TEST-1x94uO95pov8QpnzHXI1bNgUl6FwLMyH"
    );
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      amount: amount,
      currency: "ETB",
      phone_number: phoneNumber,
      tx_ref: "chewatatest-6669",
      "customization[title]": "Payment for my favourite merchant",
      "customization[description]": "I love online payments",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const result = await fetch(
      "https://chapa.link/donation/view/DN-B0B8xRFp3qUf"
      // requestOptions
    );
  };

  const valueToShare = {
    products,
    wishlist,
    createProduct,
    fetchProducts,
    myWishList,
    fetchMyWishList,
    payment,
  };

  return (
    <ProductContext.Provider value={valueToShare}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider };

export default ProductContext;
