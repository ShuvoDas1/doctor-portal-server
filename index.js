
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;

const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = 4000

console.log(process.env.DB_USER);
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vktpy.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });


client.connect(err => {
  const appointmentCollection = client.db("doctorsPortal").collection("appointments");
  
  app.post('/addappointment',(req,res)=>{
    const appointment =  req.body;
    console.log(appointment);
    appointmentCollection.insertOne(appointment)
    .then(result=>{
      res.send(result)
    })
  })

  app.post('/appointmentByDate',(req,res)=>{
    const date =  req.body;
    console.log(date);
    appointmentCollection.find({date:date.date})
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })

});


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)