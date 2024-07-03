import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import { useNavigate } from 'react-router-dom';

const UpdateRestaurant = (props) => {

    let navigate=useNavigate();
    const {id} =useParams();
    const {restaurants}=useContext(RestaurantsContext);

    const [name, setName]=useState("")
    const [location, setLocation]=useState("")
    const [price, setPrice]=useState("")


    useEffect(()=>{
        const fetchData=async()=>{
            const response=await RestaurantFinder.get(`/${id}`);
            console.log('response',response);
            setName(response.data.restaurant.name)
            setLocation(response.data.restaurant.location)
            setPrice(response.data.restaurant.price)
        };
        fetchData();

    }, []);

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const UpdateRestaurant=await RestaurantFinder.put(`/${id}`, {
            name:name,
            location:location,
            price:price
        });
        navigate(`/`);
    }
    
  return (
    <div>
        
        <form action="">
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input value={name} onChange={e=>setName(e.target.value)} id="name" className="form-control" type="text" />
            </div>

            <div className="form-group">
                <label htmlFor="location">Location</label>
                <input value={location} onChange={e=>setLocation(e.target.value)} id="location" className="form-control" type="text" />
            </div>

            <div className="form-group">
                <label htmlFor="price">Price Range</label>
                <input value={price} onChange={e=>setPrice(e.target.value)} id="price" className="form-control" type="number" />
            </div>

            <button onClick={handleSubmit} type="submit" className="btn btn-primary">Update</button>
        </form>
    </div>
  )
}

export default UpdateRestaurant