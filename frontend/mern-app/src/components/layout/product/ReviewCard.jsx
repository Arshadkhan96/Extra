import { Rating } from '@mui/material';
import './ReviewCard.css';

const ReviewCard = ({ review }) => {
  return (
    <div className="reviewCard">
      <div className="reviewHeader">
        <div className="userAvatar">
          {review.name?.charAt(0).toUpperCase()}
        </div>
        <div className="userInfo">
          <p className="userName">{review.name}</p>
          <Rating 
            value={review.rating || 0} 
            precision={0.5} 
            readOnly 
            size="small"
          />
        </div>
      </div>
      <div className="reviewContent">
        <p className="reviewComment">{review.comment}</p>
        <p className="reviewDate">
          Reviewed on {new Date(review.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;