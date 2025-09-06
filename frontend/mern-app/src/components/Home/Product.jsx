// import  { useState } from "react";
// import { Link } from "react-router-dom";
// import Rating from "react-rating-stars-component";

// const Product = ({ product }) => {
//   const [userRating, setUserRating] = useState(product.rating || 0);

//   return (
//     <Link className="product-card" to={`/product/${product._id}`}>
//       <img
//         src={`https://picsum.photos/300/300?random=${product._id}`}
//         alt={product.name}
//         loading="lazy"
//       />
//       <div className="product-info">
//         <p>{product.name}</p>
//         <div className="rating-container">
//           <Rating
//             value={userRating}
//             count={5}
//             size={20}
//             activeColor="#ffd700"
//             isHalf={true}
//             onChange={(newRating) => {
//               setUserRating(newRating);
//               console.log("User selected rating:", newRating);
//             }}
//             edit={true}
//           />
//           <span>({product.numOfReviews || product.numberOfReviews || 0} Reviews)</span>
//         </div>
//         <span className="price">${product.price?.toFixed(2) || "0.00"}</span>
//       </div>
//     </Link>
//   );
// };

// export default Product;



import { Link } from "react-router-dom";
import Rating from "react-rating-stars-component";

const Product = ({ product }) => {
  return (
    <Link className="product-card" to={`/product/${product._id}`}>
      <img
        src={`https://picsum.photos/300/300?random=${product._id}`}
        alt={product.name}
        loading="lazy"
      />
      <div className="product-info">
        <p>{product.name}</p>
        <div className="rating-container">
          <Rating
            value={product.ratings || 0}
            count={5}
            size={20}
            activeColor="#ffd700"
            isHalf={true}
            edit={false} // Make it read-only
          />
          <span>({product.numOfReviews || 0} Reviews)</span>
        </div>
        <span className="price">${product.price?.toFixed(2) || "0.00"}</span>
      </div>
    </Link>
  );
};

export default Product;
