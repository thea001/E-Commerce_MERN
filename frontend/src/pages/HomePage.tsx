import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseUrl";
import { Box } from "@mui/material";
import { useCart } from "../context/Cart/CartContext";

const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState(false);
  const { addItemToCart } = useCart();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/product`);
        const data = await response.json();
        setProducts(data);
      } catch {
        setError(true);
      }
    };
    fetchData();
    const script = document.createElement("script");
    script.src = "./assets/js/slick.min.js";
    script.async = true;
  }, []);

  if (error) {
    return <Box>Something went wrong, please try again!</Box>;
  }

  return (
    <div className="section">
      <div className="container">
        <div className="row">
          {/* Section title */}
          <div className="col-md-12">
            <div className="section-title">
              <h3 className="title">New Products</h3>
              <div className="section-nav">
                <ul className="section-tab-nav tab-nav">
                  <li className="active">
                    <a href="#tab1">Laptops</a>
                  </li>
                  <li>
                    <a href="#tab1">Smartphones</a>
                  </li>
                  <li>
                    <a href="#tab1">Cameras</a>
                  </li>
                  <li>
                    <a href="#tab1">Accessories</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* /section title */}

          {/* Products display */}

          <div className="row ">
            <div className="products-tabs ">
              <div id="tab1" className="active">
                <div className="row p-3">
                  {/* Loop through products */}
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="col-lg-3 col-md-4 col-12 p-3"
                    >
                      <div className="product ">
                        <div className="product-img   p-0 m-0">
                          <img
                            height={200}
                            src={product.image}
                            alt={product.title}
                          />
                        </div>
                        <div className="product-body">
                          <p className="product-category">{product.category}</p>
                          <h3 className="product-name">
                            <a href="#">{product.title}</a>
                          </h3>
                          <h4 className="product-price">
                            ${product.price.toFixed(2)}
                            {product.oldPrice && (
                              <del className="product-old-price">
                                ${product.oldPrice.toFixed(2)}
                              </del>
                            )}
                          </h4>
                          <div className="product-rating">
                            {[...Array(5)].map((_, index) => (
                              <i
                                key={index}
                                className={`fa fa-star${
                                  index < product.rating ? "" : "-o"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="product-btns">
                            <button className="add-to-wishlist">
                              <i className="fa fa-heart-o"></i>
                              <span className="tooltipp">add to wishlist</span>
                            </button>
                            <button className="add-to-compare">
                              <i className="fa fa-exchange"></i>
                              <span className="tooltipp">add to compare</span>
                            </button>
                            <button className="quick-view">
                              <i className="fa fa-eye"></i>
                              <span className="tooltipp">quick view</span>
                            </button>
                          </div>
                        </div>
                        <div className="add-to-cart">
                          <button
                            onClick={() => addItemToCart(product._id)}
                            className="add-to-cart-btn"
                          >
                            <i className="fa fa-shopping-cart"></i> add to cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* /loop products */}
                </div>
                <div id="slick-nav-1" className="products-slick-nav"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Products display */}
    </div>
  );
};

export default HomePage;
