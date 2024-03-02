// Nodemon, short for Node Monitor, is a utility for Node.js that helps in development by automatically restarting the Node application when file changes in the directory are detected.
const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

// this specifies that a JSON body nneds to be accepted from the APIwebiste
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// you dont have to stop and restart again thats why we use nodemon
// routes to see on web browser
app.get('/', (req, res)=>{
    res.send('Hello NODE API')
})

app.get('/blog', (req, res)=>{
    res.send('Hello blog')
})

app.get('/products', async(req,res) => {
    try{
        const product = await Product.find({})
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

app.put('/products/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `Cannot find any product with id ${id}`});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

app.delete('/products/:id', async(req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `Cannot find any product with id ${id}`});
        }
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
// in Postman say i send JSON
// {
//     "name": "soap",
//     "quantity": 1,
//     "price": 5,
//     "image": "https://st.depositphotos.com/1782880/1328/i/450/depositphotos_13289946-stock-photo-bar-of-soap.jpg"
// }
// STATUS 200 - CREATED
// STATUS 500 - ERROR
app.post('/products', async(req,res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product);
    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
    console.log(req.body);
    res.send(req.body)
})

// from MongoDB create the database give the username: admin and password:SimpleAPI
mongoose.connect('mongodb+srv://admin:SimpleAPI@simpleapi.7qopbqc.mongodb.net/')
.then(() => {
    console.log('connected to MongoDB')
    // Listen to port 3000 after connecting to MongoDB and put a call back function
    app.listen(3000, () =>{
        console.log(`Node API app is running on port 3000`)
    })
}).catch((error) => {
    console.log(error)
})