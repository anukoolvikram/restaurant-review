import React, { useContext, useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const Addrestaurant = () => {

    const {addRestaurants} =useContext(RestaurantsContext);

    const [name, setName]=useState("")
    const [location, setLocation]=useState("")
    const [price, setPrice]=useState("")

    const handleSubmit=async(e)=>{
        e.preventDefault(); //prevents reloading the page
        try{
            console.log("Before API call");
            const response = await RestaurantFinder.post('/', {
              name: name,
              location: location,
              price: price
            });
            console.log("After API call:", response);
            addRestaurants(response.data.data.restaurant);
        }
        catch(err){
            console.log(err);
        }
    }

  return (
    <div className='mb-4'>
        <form action="">
            <div className="row g-3 align-items-center">
                {/* now adding three columns */}
                <div className="col">
                    <input value={name} onChange={e=>setName(e.target.value)} type="text" className='form-control' placeholder='Name'/>
                </div>
                <div className="col">
                    <input value={location} onChange={e=>setLocation(e.target.value)} type="text" className='form-control' placeholder='Location' />
                </div>
                <div className="col-auto">
                <select value={price} onChange={e=>setPrice(e.target.value)} className="form-select form-select-sm" aria-label="Small select example">
                    <option defaultValue={"Price Range"}>Price Range</option>
                    <option value="1">$</option>
                    <option value="2">$$</option>
                    <option value="3">$$$</option>
                    <option value="3">$$$$</option>
                </select>
                </div>
                <div className="col-auto">
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">Add</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Addrestaurant