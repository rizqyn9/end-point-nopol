const express = require('express')
const app = express()
const mongoose = require('mongoose')


const PORT = 3000
const URIS = 'mongodb://localhost:27017/akbar'

mongoose.connect(URIS,{useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false})
.then(()=> console.log("Terhubung ke Database"))
.catch(err => console.log(err))

app.use(express.json())
app.use('/', require('./controllers/kendaraan'))
    
app.use('/', (req,res) => {
    console.log("Okay");
})

app.listen(PORT, () => {
    console.log(`Running in http://localhost:${PORT}`);
})