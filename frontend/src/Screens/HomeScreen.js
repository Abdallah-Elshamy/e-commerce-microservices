import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiEndpoint } from "../config";

function HomeScreen(props) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(apiEndpoint + "products");
      console.log(data);
      setProducts(data);
    };
    fetchData();
    return () => {
      //
    };
  }, []);

  return (
    <ul className="products">
      {products.map((product) => (
        <li key={product._id}>
          <div className="product">
            <Link to={`product/${product._id}`}>
              <img
                className="product-image"
                src={product.image}
                alt="product"
              />
            </Link>
            <div className="product-name">
              <Link to={`product/${product._id}`}>{product.name}</Link>
            </div>
            <div className="product-brand">{product.brand}</div>
            <div className="product-price">{product.price} $</div>
            <div className="product-rating">
              {product.rating} stars ({product.num_reviews} Reviews)
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default HomeScreen;
