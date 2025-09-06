import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "react-slick";

import { getProduct } from "../../../action/productAction.js";
import Loader from "../loader/Loader.jsx";
import Product from "../../Home/Product.jsx";

import "./Products.css";

const Products = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const {
    products = [],
    loading,
    totalProduct = 0,
    productPerPage = 10,
    error,
  } = useSelector((state) => state.products || {});

  const categories = ["mobile", "accessories", "audio", "electronic"];

  useEffect(() => {
    dispatch(getProduct(currentPage, keyword, category));
  }, [dispatch, currentPage, keyword, category]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryClick = (selectedCategory) => {
    setCategory(selectedCategory);
    setCurrentPage(1); // Reset page on category change
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const totalPages = Math.ceil(totalProduct / productPerPage);

  return loading ? (
    <Loader />
  ) : (
    <>
      <h2 className="productHeading">Products</h2>

      {/* Category Filter */}
      <div className="categories">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`category-button ${category === cat ? "active-category" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* View Toggle */}
      <div className="view-toggle">
        <button
          className={`view-button ${viewMode === "grid" ? "active" : ""}`}
          onClick={() => setViewMode("grid")}
        >
          Grid View
        </button>
        <button
          className={`view-button ${viewMode === "slider" ? "active" : ""}`}
          onClick={() => setViewMode("slider")}
        >
          Slider View
        </button>
      </div>

      {/* Product Display */}
      {viewMode === "grid" ? (
        <div className="products-grid">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="products-slider">
          <Slider {...sliderSettings}>
            {products.map((product) => (
              <div key={product._id} className="slider-item">
                <Product product={product} />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Pagination */}
      {productPerPage < totalProduct && (
        <>
          <div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={productPerPage}
              totalItemsCount={totalProduct}
              pageRangeDisplayed={4}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="pageItemActive"
              activeLinkClass="pageLinkActive"
            />
          </div>

          
        </>
      )}
    </>
  );
};

export default Products;
