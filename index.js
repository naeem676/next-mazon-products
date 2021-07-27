const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb');
require('dotenv').config();
const app = express()
const port = 5000

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zhlqw.mongodb.net/new-amazon?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("new-amazon").collection("products");

  app.get('/allProducts', (req, res)=>{
    collection.find({})
    .toArray((err, documents)=>{
      res.send(documents)
    })
  })




  app.post('/products', (req, res)=>{
    const products = req.body;
    collection.insertMany(products)
    .then(result => {
      res.status(200).send(result.insertedCount > 0)
    })
  })
});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)