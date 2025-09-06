import  { Fragment, useEffect } from "react";
import "./home.css";
import Product from "./Product";
import { CiDesktopMouse1 } from "react-icons/ci";
import { getProduct } from "../../action/productAction";
import { useSelector, useDispatch } from "react-redux";
// import { Helmet } from "react-helmet";

import Loader from "../layout/loader/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { products = [], loading = false, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    // Only fetch products if they haven't been loaded yet
    if (products.length === 0) {
      dispatch(getProduct());
    }
  }, [dispatch, products.length]);

  return (
    <Fragment>
      <div className="banner">
        <p>Welcome to our site</p>
        <h1>Find amazing products below</h1>
        <a href="#container" aria-label="Scroll to products">
          <button>
            Scroll <CiDesktopMouse1 />
          </button>
        </a>
      </div>

      <section className="product-section" id="container">
        <h2 className="home-heading">Featured Products</h2>

        {loading ? (
          <div className="loader-wrapper">
            <Loader />
          </div>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="products-container">
            {products.length > 0 ? (
              products.map((product) => (
                <Product 
                  key={product._id} 
                  product={product} 
                />
              ))
            ) : (
              <p className="no-products">No products available</p>
            )}
          </div>
        )}
      </section>
    </Fragment>
  );
};

export default Home;