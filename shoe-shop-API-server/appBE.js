//set dependencies 
const express = require('express');
const app = express(); 
const cors = require('cors'); 
const {Client} = require('pg'); 
const config = require('./config.js')[process.env.NODE_ENV ||"dev"]

const PORT = 3000; //config.port

const client = new Client ({
    connectionString: config.connectionString,
});

client.connect(); 


//set up middleware
app.use(cors());
app.use(express.json());

//set up routes 

//initial request route
app.get('/', (req,res)=>{
    res.send("Welcome to The ShoeShop.com")
});

//route to return all shoes in db

app.get('/api/shoes', (req,res,err)=>{
    client.query('SELECT * FROM shoes')
    .then(results=>{
        res.status(200); 
        res.send(results.rows);
    })
    .catch((err)=>console.log(error));
});

//route to get shoes by ID
app.get('/api/shoes/:id', (req,res,err)=>{
    client.query(`SELECT * FROM shoes WHERE id = ${req.params.id}`)
    .then(results=>{
        if(results.rows.length == 0){
            res.status(404);
            res.send(`Shoe ID not found in database`);
            return;
        }
        res.status(200);
        res.send(results.rows);
    })
    .catch((err)=>console.log('error'));
});

//route to get shoes by brand 
app.get('/api/shoes/brand/:brand', (req,res,err)=>{
    let brand = req.params.brand
    client.query(`SELECT * FROM shoes WHERE brand = '${brand}'`)
    .then(results=>{
        if(results.rows.length == 0){
            res.status(404);
            res.send(`Shoe Brand not found in database`);
            return;
        }
        res.status(200);
        res.send(results.rows);
    })
    .catch((err)=>console.log('error'));
});

//route to get shoe by category 
app.get('/api/shoes/category/:category',(req,res,err)=>{
    let category = req.params.category
    client.query(`SELECT * FROM shoes WHERE category = '${category}'`)
    .then(results=>{
        if(results.rows.length == 0){
            res.status(404);
            res.send(`shoe category not found in database`);
            return;
        }
            res.status(200);
            res.send(results.rows);
        })

    });


//route to post new shoes to database
app.post('/api/shoes', (req,res)=>{
    let newShoe = req.body; 
    if(newShoe.brand && newShoe.name && newShoe.price && newShoe.category && typeof newShoe.price == 'number' && newShoe.brand.length != 0 && newShoe.name.length != 0 && newShoe.price.length != 0 && newShoe.category.length != 0){
     client.query(`INSERT INTO shoes (brand,name,price,category) VALUES ('${newShoe.brand}','${newShoe.name}',${newShoe.price},'${newShoe.category}')`,   
    (err)=>{
        if(err){
            console.error(err);
        }else{
            let newShoeString = JSON.stringify(newShoe);
            res.status(200);
            res.send(`Shoe information added to database: ${newShoeString}`);
             }
        });
    }else{
        res.status(404);
        res.send(`404 ERROR: bad input please provide shoe: brand|name|price as integer|category`);
        }
});

//route to delete shoe from database by id
app.delete('/api/shoes/:id', (req,res)=>{
    client.query(`SELECT FROM shoes WHERE id =${req.params.id}`)
    .then(results=>{
        if (results.rows.length ==0){
            res.status(404); 
            res.send(`shoe doesn't exist in the database`);
            return;
        }else{
            let deletedShoe = JSON.stringify(results.rows);
            res.status(200);
            res.send(`Shoe data deleted from database: ${deletedShoe}`);
            client.query(`DELETE FROM shoes WHERE id = ${req.params.id}`);
        }
    })
});

//route to patch shoe in database by id
app.patch('/api/shoes/:id', (req,res)=>{
    let shoeUpdate = req.body;
    if(shoeUpdate.brand && shoeUpdate.name && shoeUpdate.price && shoeUpdate.category && typeof shoeUpdate.price == 'number' && shoeUpdate.brand.length != 0 && shoeUpdate.name.length != 0 && shoeUpdate.price.length != 0 && shoeUpdate.category.length != 0){
        client.query(`UPDATE shoes SET brand = '${shoeUpdate.brand}', name = '${shoeUpdate.name}', price = ${shoeUpdate.price}, category = '${shoeUpdate.category}' WHERE id = ${req.params.id}`)
        .then(results=>{
            res.status(200); 
            let shoeUpdateString = JSON.stringify(shoeUpdate);
            res.send(`shoe at ID ${req.params.id} updated to: ${shoeUpdateString}`);
        })
    }else{
        res.status(404); 
        res.send(`404 ERROR: Bad Patch request please provide shoe: brand|name|price as integer|category`);
    }
});


//listen on a port
app.listen(PORT, ()=>{
    console.log(`server is running on port: ${PORT}`);
});