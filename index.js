const express = require('express')
const app = express()

const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({extended:false}))

const db = require("./models");
db.sequelize.sync({force:true})  
    .then(err => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.use('/laporan' , require('./routes/router-laporan'))
app.use('/kendaraan' , require('./routes/router-kendaraan'))
app.use('/tag' , require('./routes/router-tag'))
app.use('/pujian' , require('./routes/router-pujian'))

app.use('/', (req,res) => {
    console.log("Handle empty path");
    res.json({
        message: "this is an empty page"
    })
})

app.listen(PORT, () => {
    console.log(`Running in http://localhost:${PORT}`);
})