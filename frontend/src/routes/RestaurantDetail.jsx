import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';
import StarRating from '../components/StarRating';

const RestaurantDetail = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data);
      } catch (err) {
        console.log('Error fetching data:', err);
      }
    };
    fetchData();
  }, [id]); 

  console.log('Selected Restaurant:', selectedRestaurant);

  return (
    <div className='container'>
      {selectedRestaurant && (
        <>
          <h1 className='text-center display-1'>{selectedRestaurant.restaurant.name}</h1>
          <div className="text-center">
            <StarRating rating={selectedRestaurant.restaurant.average_rating} />
            <span className="text-warning ml-1">
            {selectedRestaurant.restaurant.count ? `(${selectedRestaurant.restaurant.count})` : 0}
            </span>

          </div>
          <div className="mt-3">
            {selectedRestaurant.reviews ? (
              <Reviews reviews={selectedRestaurant.reviews} />
            ) : (
              <p>No reviews available</p>
            )}
          </div>
          <AddReview />
        </>
      )}
    </div>
  );
};

export default RestaurantDetail;
