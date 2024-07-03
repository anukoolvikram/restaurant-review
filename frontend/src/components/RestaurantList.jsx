import React, {useContext, useEffect} from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';



const RestaurantList = () => {

    const {restaurants, setRestaurants}=useContext(RestaurantsContext);
    let navigate=useNavigate();

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const response=await RestaurantFinder.get('/');
                
                setRestaurants(response.data.data.restaurants);
                
            }
            catch(err){
                console.log(err);
            }
        };

        fetchData();
    },[])


    const handleDelete=async(e,id)=>{
        e.stopPropagation()
        try{
            const response=await RestaurantFinder.delete(`/${id}`);
            setRestaurants(restaurants.filter(restaurant=>{
                return restaurant.id!=id;
            }))    
        }
        catch(err){
            console.log(err);
        }
    }

    const handleUpdate=(e,id)=>{
        e.stopPropagation()
        navigate(`restaurants/${id}/update`);
    }

    const handleRestaurant=(id)=>{
        navigate(`/restaurants/${id}`);
    }

    const renderRatinng=(restaurant)=>{
        if(!restaurant.count){
            return <span className='text-warning'>0 reviews</span>
        }
        return(
            <>
            <StarRating rating={restaurant.average_rating}/>
            <span className='text-warning ml-1'>({restaurant.count})</span>
            </>
        )
    }

  return (
    <div className='list-group'>
        <table className="table table-dark table-hover">
            <thead>
                <tr className="table-primary">
                    <th scope='col'>Restaurant</th>
                    <th scope='col'>Location</th>
                    <th scope='col'>Price Range</th>
                    <th scope='col'>Ratings</th>
                    <th scope='col'>Edit</th>
                    <th scope='col'>Delete</th>
                </tr>
            </thead>
            <tbody>
                { restaurants && restaurants.map((restaurant)=>{
                    return(
                        <tr onClick={()=>handleRestaurant(restaurant.id)} key={restaurant.id}>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{"$".repeat(restaurant.price)}</td>
                        <td>{renderRatinng(restaurant)}</td>
                        <td><button onClick={(e)=>handleUpdate(e,restaurant.id)} className="btn btn-warning">Update</button></td>
                        <td><button onClick={(e)=>handleDelete(e,restaurant.id)} className="btn btn-danger">Delete</button></td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
  )
}

export default RestaurantList