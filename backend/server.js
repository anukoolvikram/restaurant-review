import express from "express";
import 'dotenv/config';
import db from './db/index.js';
import cors from 'cors';

const app=express();
const port=process.env.PORT || 5000 ;

app.use(cors());
app.use(express.json());

app.get('/api/v1/restaurants', async (req, res)=>{
  try{
    // const result= await db.query("select * from restaurants;");
    const ratingsData=await db.query(" select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id=reviews.restaurant_id;");
    
    res.status(200).json({
        "status": "success",
        "results":ratingsData.rows.length,
        "data":{
            "restaurants": ratingsData.rows
        }
    });
  }
  catch(err){
    res.status(400).json(err);
  }
});


app.get('/api/v1/restaurants/:id', async(req,res)=>{
    try{
        // const restaurant= await db.query(`select * from restaurants where id=$1`, [req.params.id]);
        const restaurant= await db.query(` select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id=reviews.restaurant_id where id=$1`, [req.params.id]);
        const reviews= await db.query(`select * from reviews where restaurant_id=$1`, [req.params.id]);

        res.status(200).json({
            "restaurant": restaurant.rows[0],
            "reviews": reviews.rows

        });
    }
    catch(err){
        console.log(err);
        res.status(400).json(err);
    }
    
});


// app.post('/api/v1/restaurants/', async(req, res)=>{
//     try{
//         const result=await db.query("insert into restaurants ( name, location, price) values ($1, $2, $3)", [
//             req.body.name, req.body.location, req.body.price
//         ]);
//         console.log(result);
//     }
//     catch(err){
//         console.log(err);
//     }
// });
app.post("/api/v1/restaurants", async (req, res) => {
  
    try {
      const results = await db.query(
        "INSERT INTO restaurants (name, location, price) values ($1, $2, $3) returning *",
        [req.body.name, req.body.location, req.body.price]
      );
      
      res.status(201).json({
        status: "succes",
        data: {
          restaurant: results.rows[0],
        },
      });
    } catch (err) {
      console.log(err);
    }
  });
  

//update
app.put('/api/v1/restaurants/:id', async(req, res)=>{
    try{
        const result=await db.query('update restaurants set name=$1, location=$2, price=$3 where id=$4 returning *', [
            req.body.name, req.body.location, req.body.price, req.params.id
        ]);
        console.log(result.rows[0]);
        res.status(200).json({
          status:"success",
          data:{
            restaurant: result.rows[0]
          }
        });
    }
    catch(err){
        console.log("there is an error", err);
    }
});

app.delete('/api/v1/restaurants/:id',async (req, res)=>{
    try
    {   
        const reviews=await db.query(`DELETE FROM reviews WHERE restaurant_id = $1`, [req.params.id]);
        const result=await db.query('DELETE from restaurants where id=$1',[req.params.id]);
        res.json({
            "status":"success"
        });
    }
    catch(err){
        console.log(err);
    }
});


app.post('/api/v1/restaurants/:id/addReview', async(req,res)=>{

  try{
    const response= await db.query('Insert into reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4)', [
      req.params.id, req.body.name, req.body.review, req.body.rating
    ]);
    res.status(201).json({
      status: "success",
      data:{
        review: response.rows
      }
    })
  }
  catch(err){
    console.log(err);
  }
})





app.listen(port, ()=>{
    console.log(`Server is up and listening on port ${port}`);
})