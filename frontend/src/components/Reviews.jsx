import React from 'react';
import StarRating from './StarRating';

const Reviews = ({ reviews }) => {
  return (
    <div className='row row-cols-1 row-cols-md-4 mb-3 justify-content-center'>
      {Object.values(reviews).map((review) => {
        return (
          <div key={review.id} className="col mb-4">
            <div className="card text-white bg-primary" style={{ maxWidth: "250px" }}>
              <div className="card-header d-flex justify-content-between">
                <span>{review.name}</span>
                <span><StarRating rating={review.rating} /></span>
              </div>

              <div className="card-body">
                <p className="card-text">{review.review}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default Reviews;
