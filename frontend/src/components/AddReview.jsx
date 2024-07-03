import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import RestaurantFinder from '../apis/RestaurantFinder';

const AddReview = () => {
    
    const {id}=useParams();
    const navigate=useNavigate();
    const location =useLocation();
    
    
    const [name, setName]=useState("")
    const [reviewText, setReviewText]=useState("")
    const [rating, setRating]=useState("Rating")

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
          const response = await RestaurantFinder.post(`/${id}/addReview`, {
            name: name,
            review: reviewText,
            rating: rating,
          });
          // Clear form data after successful submission (optional)
          setName("");
          setReviewText("");
          setRating("Rating");
          // Reload the page using window.location.reload()
          window.location.reload(false); 
        } catch (err) {
          console.error("Error submitting review:", err);
        }
      };

  return (
    <div className='mb-4'>
    <form onSubmit={handleSubmitReview}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input 
            value={name} 
            onChange={e => setName(e.target.value)} 
            id='name' 
            placeholder='Enter your name' 
            className="form-control" 
            type="text" 
            required 
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="rating" className="form-label">Rating</label>
          <select 
            value={rating} 
            onChange={e => setRating(e.target.value)} 
            id='rating' 
            className="form-select" 
            aria-label="Select rating"
            required 
          >
            <option defaultValue={""}>Your Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="review" className="form-label">Review</label>
        <textarea 
          value={reviewText} 
          onChange={e => setReviewText(e.target.value)} 
          id="review" 
          className="form-control" 
          placeholder='Write your review'
          rows="3" 
          required
        ></textarea>
      </div>
      
      <button type='submit' className="btn btn-primary">Submit</button>
    </form>
  </div>
  )
}

export default AddReview