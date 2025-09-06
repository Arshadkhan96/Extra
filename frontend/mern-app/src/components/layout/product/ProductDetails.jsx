// import { Fragment, useState, useEffect } from 'react';
// import Carousel from 'react-material-ui-carousel';
// import { useSelector, useDispatch } from 'react-redux';
// import { getProductDetail } from '../../../action/productAction';
// import { addToCart, removeFromCart } from '../../../action/cartAction';
// import Rating from '@mui/material/Rating';
// import ReviewCard from './ReviewCard';
// import { useParams, useNavigate } from 'react-router-dom';
// import './ProductDetail.css';
// import { MdShoppingCart } from 'react-icons/md';
// import { toast } from 'react-toastify';
// import Loader from '../loader/Loader';

// const ProductDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { product = {}, loading, error } = useSelector((state) => state.productDetails);
//   const { cartItems } = useSelector((state) => state.cart);
//   const [quantity, setQuantity] = useState(1);
//   const [showReviewForm, setShowReviewForm] = useState(false); // ✅ Added this state

//   useEffect(() => {
//     if (id) {
//       dispatch(getProductDetail(id));
//     }
//   }, [dispatch, id]);

//   const isInCart = cartItems.some(item => item.product === product._id);
//   const cartItem = cartItems.find(item => item.product === product._id);

//   const handleQuantityChange = (value) => {
//     const newQuantity = quantity + value;
//     const maxQuantity = Math.min(product.stock || 10, 10);
//     if (newQuantity >= 1 && newQuantity <= maxQuantity) {
//       setQuantity(newQuantity);
//     } else if (newQuantity > maxQuantity) {
//       toast.info(`Maximum ${maxQuantity} items allowed per order`);
//     }
//   };

//   const addToCartHandler = () => {
//     if (!product._id) {
//       toast.error('Product information is incomplete');
//       return;
//     }

//     const existingItem = cartItems.find(item => item.product === product._id);

//     if (existingItem) {
//       const updatedQuantity = existingItem.quantity + quantity;
//       if (updatedQuantity > product.stock) {
//         toast.error(`Only ${product.stock} items available in stock`);
//         return;
//       }

//       dispatch(addToCart({
//         ...existingItem,
//         quantity: updatedQuantity
//       }));
//     } else {
//       dispatch(addToCart({
//         product: product._id,
//         name: product.name,
//         price: product.price,
//         image: product.images?.[0]?.url || '',
//         stock: product.stock || 0,
//         quantity
//       }));
//     }

//     toast.success(
//       <div>
//         <strong>{quantity} × {product.name}</strong>
//         <div>Added to your cart</div>
//         <button 
//           onClick={() => navigate('/cart')}
//           style={{ 
//             marginTop: '10px',
//             padding: '5px 10px',
//             background: '#fff',
//             color: '#2874f0',
//             border: '1px solid #2874f0',
//             borderRadius: '2px',
//             cursor: 'pointer'
//           }}
//         >
//           View Cart
//         </button>
//       </div>,
//       { autoClose: 3000 }
//     );
//     setQuantity(1);
//   };

//   const removeFromCartHandler = () => {
//     dispatch(removeFromCart(product._id));
//     toast.success(`${product.name} removed from cart`);
//   };

//   const buyNowHandler = () => {
//     if (!product._id) {
//       toast.error('Product information is incomplete');
//       return;
//     }

//     addToCartHandler();
//     navigate('/checkout', { 
//       state: { 
//         directCheckout: true,
//         productId: product._id 
//       }
//     });
//   };

//   if (loading) return <div className="loader-container"><Loader /></div>;
//   if (error) return <div className="error">{error}</div>;

//   return (
//     <Fragment>      
//       <div className="productDetailContainer">
//         <div className="breadcrumb">
//           Home &gt; Products &gt; {product.category || 'Category'} &gt; {product.name}
//         </div>

//         <div className="productDetail">
//           <div className="imageSection">
//             <Carousel autoPlay={false} indicators={true} navButtonsAlwaysVisible={true}>
//               {product.images?.length > 0 ? (
//                 product.images.map((item, index) => (
//                   <img 
//                     key={index} 
//                     className="carouselImage" 
//                     src={item.url || `https://picsum.photos/500/500?random=${product._id}-${index}`} 
//                     alt={`${product.name}-${index}`}
//                     onError={(e) => {
//                       e.target.src = `https://picsum.photos/500/500?random=${product._id}-${index}`;
//                     }}
//                   />
//                 ))
//               ) : (
//                 <img 
//                   className="carouselImage" 
//                   src={`https://picsum.photos/500/500?random=${product._id}`} 
//                   alt={product.name}
//                 />
//               )}
//             </Carousel>
//           </div>

//           <div className="detailsSection">
//             <div className="detailBlock-1">
//               <h2>{product.name}</h2>
//               <p>Product # {product._id}</p>
//               <div className="ratingContainer">
//                 <Rating 
//                   value={product.ratings || 0} 
//                   precision={0.5} 
//                   readOnly 
//                 />
//                 <span className="reviewsCount">({product.numOfReviews || 0} Reviews)</span>
//               </div>
//             </div>

//             <div className="detailBlock-2">
//               <div className="priceContainer">
//                 <span className="currentPrice">${product.price?.toFixed(2) || '0.00'}</span>
//                 {product.originalPrice && (
//                   <span className="cuttedPrice">${product.originalPrice.toFixed(2)}</span>
//                 )}
//                 {product.discount && (
//                   <span className="discount">{product.discount}% off</span>
//                 )}
//               </div>
//               <p className="deliveryText">Free delivery available</p>
//             </div>

//             <div className="detailBlock-3">
//               <h3>Product Details</h3>
//               <ul className="detailsList">
//                 {product.category && <li>Category: {product.category}</li>}
//                 {product.brand && <li>Brand: {product.brand}</li>}
//                 {product.stock && <li>Available: {product.stock} units</li>}
//               </ul>
//             </div>

//             <div className="detailBlock-5">
//               <div className="quantitySelector">
//                 <button 
//                   onClick={() => handleQuantityChange(-1)}
//                   disabled={quantity <= 1}
//                   aria-label="Decrease quantity"
//                 >
//                   -
//                 </button>
//                 <input 
//                   type="number" 
//                   min="1" 
//                   max={Math.min(product.stock || 10, 10)}
//                   value={quantity}
//                   onChange={(e) => {
//                     const value = parseInt(e.target.value);
//                     if (!isNaN(value) && value >= 1 && value <= (product.stock || 10)) {
//                       setQuantity(value);
//                     }
//                   }}
//                   aria-label="Product quantity"
//                 />
//                 <button 
//                   onClick={() => handleQuantityChange(1)}
//                   disabled={quantity >= Math.min(product.stock || 10, 10)}
//                   aria-label="Increase quantity"
//                 >
//                   +
//                 </button>
//               </div>
              
//               {!isInCart ? (
//                 <button 
//                   className="addToCartBtn"
//                   onClick={addToCartHandler}
//                   disabled={product.stock < 1}
//                   aria-label="Add to cart"
//                 >
//                   <MdShoppingCart className="cart-icon" />
//                   ADD TO CART
//                 </button>
//               ) : (
//                 <button 
//                   className="addToCartBtn in-cart"
//                   onClick={removeFromCartHandler}
//                   aria-label="Remove from cart"
//                 >
//                   <MdShoppingCart className="cart-icon" />
//                   REMOVE FROM CART ({cartItem?.quantity || 0})
//                 </button>
//               )}
              
//               <button 
//                 className="buyNowBtn"
//                 onClick={buyNowHandler}
//                 disabled={product.stock < 1}
//                 aria-label="Buy now"
//               >
//                 BUY NOW
//               </button>
//             </div>

//             <div className="detailBlock-6">
//               <p>
//                 Status: 
//                 <span className={product.stock < 1 ? "outOfStock" : "inStock"}>
//                   {product.stock < 1 ? "Out of Stock" : "In Stock"}
//                 </span>
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="descriptionSection">
//           <h3>Description</h3>
//           <p className="productDescription">{product.description || "No description available"}</p>
//         </div>

//         <div className="reviewsSection">
//           <h3>REVIEWS ({product.numOfReviews || 0})</h3>
//           {product.reviews?.length > 0 ? (
//             <div className="reviewsContainer">
//               {product.reviews.map((review) => (
//                 <ReviewCard key={review._id} review={review} />
//               ))}
//             </div>
//           ) : (
//             <p className="noReviews">No reviews yet</p>
//           )}

//           <button 
//             className="submitReviewBtn"
//             onClick={() => setShowReviewForm(true)} // ✅ Works now
//           >
//             Submit Review
//           </button>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default ProductDetail;


// ???????????????????????????????????????????????
import { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Rating,
  CircularProgress
} from '@mui/material';
import { MdShoppingCart } from 'react-icons/md';
import { toast } from 'react-toastify';
import Carousel from 'react-material-ui-carousel';
import './ProductDetail.css';

import { getProductDetail, clearErrors } from '../../../action/productAction';
import { newReview, clearErrors as clearReviewErrors } from '../../../action/reviewAction';
import { addToCart } from '../../../action/cartAction';

import ReviewCard from './ReviewCard';
import Loader from '../loader/Loader';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const { product = {}, loading, error } = useSelector((state) => state.productDetails);
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const {
    success: reviewSuccess,
    error: reviewError,
    loading: reviewLoading,
  } = useSelector((state) => state.productReview);

  useEffect(() => {
    if (id) dispatch(getProductDetail(id));

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearReviewErrors());
    }

    if (reviewSuccess) {
      toast.success('Review submitted successfully');
      setOpen(false);
      setRating(0);
      setComment('');
      dispatch({ type: 'NEW_REVIEW_RESET' });
      dispatch(getProductDetail(id));
    }
  }, [dispatch, id, error, reviewError, reviewSuccess]);

  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const addToCartHandler = () => {
    if (!product._id) {
      toast.error('Product not loaded yet');
      return;
    }

    dispatch(addToCart({
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.url || '/images/default-product.png',
      stock: product.stock,
      quantity,
    }));

    toast.success('Item added to cart');
  };

  const buyNowHandler = () => {
    if (product.stock <= 0) {
      toast.error('Product is out of stock');
      return;
    }
    addToCartHandler();
    navigate('/shipping');
  };

  const submitReviewToggle = () => {
    if (!user) {
      toast.error('Please login to submit a review');
      return;
    }
    setOpen((prev) => !prev);
  };

  const reviewSubmitHandler = () => {
    if (!rating || !comment.trim()) {
      toast.error('Please provide rating and comment');
      return;
    }

    const reviewData = {
      rating,
      comment,
      productId: id,
    };

    dispatch(newReview(reviewData));
  };

  if (loading) return <Loader />;

  return (
    <Fragment>
      <div className="productDetailContainer">
        <div className="breadcrumb">Home / {product.category} / {product.name}</div>

        <div className="productDetail">
          <div className="imageSection">
            <div className="mainImageContainer">
              <Carousel
                index={activeImageIndex}
                autoPlay={false}
                animation="fade"
                navButtonsAlwaysVisible
                indicators={false}
                onChange={(index) => setActiveImageIndex(index)}
              >
                {Array.isArray(product.images) && product.images.length > 0 ? (
                  product.images.map((item, i) => (
                    <div key={i} className="carouselSlide">
                      <img
                        className="mainProductImage"
                        src={item?.url || '/images/default-product.png'}
                        alt={`${product.name} - ${i + 1}`}
                        onError={(e) => {
                          e.target.src = '/images/default-product.png';
                          e.target.onerror = null;
                        }}
                      />
                    </div>
                  ))
                ) : (
                  <div className="carouselSlide">
                    <img
                      className="mainProductImage"
                      src="/images/default-product.png"
                      alt="No product images available"
                    />
                  </div>
                )}
              </Carousel>
            </div>

            <div className="thumbnailContainer">
              {Array.isArray(product.images) && product.images.length > 0 &&
                product.images.map((item, i) => (
                  <div
                    key={i}
                    className={`thumbnail ${i === activeImageIndex ? 'active' : ''}`}
                    onClick={() => setActiveImageIndex(i)}
                  >
                    <img
                      src={item?.url || '/images/default-thumbnail.png'}
                      alt={`Thumbnail ${i + 1}`}
                      onError={(e) => {
                        e.target.src = '/images/default-thumbnail.png';
                        e.target.onerror = null;
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className="detailsSection">
            <div className="detailBlock-1">
              <h1>{product.name}</h1>
              <p>Product ID: {product._id}</p>
            </div>

            <div className="ratingContainer">
              <Rating value={product.ratings || 0} precision={0.5} readOnly size="medium" />
              <span className="reviewsCount">({product.numOfReviews || 0} Reviews)</span>
            </div>

            <div className="detailBlock-2">
              <div className="priceContainer">
                <span className="currentPrice">${product.price?.toFixed(2)}</span>
                {product.cuttedPrice && (
                  <>
                    <span className="cuttedPrice">${product.cuttedPrice?.toFixed(2)}</span>
                    <span className="discount">
                      ({Math.round(((product.cuttedPrice - product.price) / product.cuttedPrice) * 100)}% OFF)
                    </span>
                  </>
                )}
              </div>
              <p className="deliveryText">Free delivery in 3–5 business days</p>
            </div>

            <div className="detailBlock-3">
              <h3>About this item</h3>
              <ul className="featuresList">
                {Array.isArray(product.features) && product.features.length > 0 ? (
                  product.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))
                ) : (
                  <li>No features listed</li>
                )}
              </ul>
            </div>

            <div className="detailBlock-4">
              <h3>Specifications</h3>
              <div className="specsGrid">
                {Array.isArray(product.specifications) && product.specifications.length > 0 ? (
                  product.specifications.map((spec, i) => (
                    <div key={i} className="specItem">
                      <span className="specName">{spec.key}:</span>
                      <span className="specValue">{spec.value}</span>
                    </div>
                  ))
                ) : (
                  <div>No specifications available</div>
                )}
              </div>
            </div>

            <div className="detailBlock-5">
              <div className="stockStatus">
                <span>Status:</span>
                <span className={product.stock > 0 ? 'inStock' : 'outOfStock'}>
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {product.stock > 0 && (
                <div className="quantityControls">
                  <div className="quantitySelector">
                    <button onClick={decreaseQuantity} disabled={quantity <= 1}>−</button>
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => {
                        const val = Math.max(1, Math.min(product.stock, Number(e.target.value)));
                        setQuantity(isNaN(val) ? 1 : val);
                      }}
                    />
                    <button onClick={increaseQuantity} disabled={quantity >= product.stock}>+</button>
                  </div>

                  <button
                    className="addToCartBtn"
                    disabled={product.stock < 1}
                    onClick={addToCartHandler}
                  >
                    <MdShoppingCart /> Add to Cart
                  </button>
                </div>
              )}

              <button
                className="buyNowBtn"
                onClick={buyNowHandler}
                disabled={product.stock <= 0 || !product._id}
              >
                {product.stock > 0 ? 'Buy Now' : 'Notify Me'}
              </button>
            </div>
          </div>
        </div>

        <div className="descriptionSection">
          <h2>Description</h2>
          <div className="descriptionContent">
            {product.description || 'No description available.'}
          </div>
        </div>

        <div className="reviewsSection">
          <div className="reviewsHeader">
            <h2>Customer Reviews</h2>
            {user && (
              <button onClick={submitReviewToggle} className="submitReviewBtn">
                Write a Review
              </button>
            )}
          </div>

          {product.reviews?.length > 0 ? (
            <div className="reviewsGrid">
              {product.reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          ) : (
            <div className="noReviews">
              <p>No reviews yet. Be the first to review!</p>
            </div>
          )}
        </div>
      </div>

      <Dialog
        open={open}
        onClose={submitReviewToggle}
        aria-labelledby="review-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="review-dialog-title">Submit Your Review</DialogTitle>
        <DialogContent>
          <div className="ratingInput">
            <p>Your Rating:</p>
            <Rating
              name="product-rating"
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
              precision={0.5}
              size="large"
            />
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="review-comment"
            label="Your Review"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={submitReviewToggle} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={reviewSubmitHandler}
            color="primary"
            variant="contained"
            disabled={reviewLoading || !rating || !comment.trim()}
          >
            {reviewLoading ? <CircularProgress size={24} color="inherit" /> : 'Submit Review'}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ProductDetail;
