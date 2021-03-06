const express=require('express'); //express
const app=express(); // express --> app
const bodyParser = require('body-parser') // body parser
var cors = require('cors'); // cors
app.use(cors()); // cors --> app
app.use(bodyParser.json()) // body parser --> app
app.use(bodyParser.urlencoded({ extended: false })) // use body parser middleware for url encoded
const ObjectId=require('mongodb').ObjectID // object id is needed to match data in database
// set password from mongodb cluster
const password="9augustbd";


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://demoUser:9augustbd@cluster0.rwjuz.mongodb.net/amazon?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("amazon").collection("amazon-list");
  const orderCollection = client.db("amazon").collection("order-list");
  
  //load all data
  app.get('/info',(req,res)=>{
    collection.find({}) //find all data from database
    .toArray((err,document)=>{ // to array is being used to load all data from db
      res.send(document) //data send to html
    })
  })

  // post bulk of data
  app.post('/addProducts',(req,res)=>{
    const pd=req.body;
    console.log(pd);
    collection.insertMany(pd)
    .then(result=>{
      console.log("Data saved");
      // res.redirect('/') // stopping it to go other page
    })
  })


  // single-product saves
  app.post('/addOne',(req,res)=>{
    const pd=req.body;
    console.log(pd);
    collection.insertOne(pd)
    .then(result=>{
      console.log("Data saved");
      // res.redirect('/') // stopping it to go other page
      res.send("Data has been saved");
    })
    
  })



  // single-product order saves
  app.post('/addOrder',(req,res)=>{
    const pd=req.body;
    console.log(pd);
    orderCollection.insertOne(pd)
    .then(result=>{
      console.log("Data saved");
      // res.redirect('/') // stopping it to go other page
      res.send("Data has been saved");
    })
    
  })


  app.post('/productsByKeys',(req,res)=>{
    const productKeys=req.body;
    collection.find({key:{$in: productKeys}})
    .toArray((err,documents)=>{
      res.send(documents);  
    })
  })

  console.log("connected")
});


// app listen
app.listen(3010,()=>{
	console.log("Listening to port at 3010 ");
})