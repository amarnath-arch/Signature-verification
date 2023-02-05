const express= require('express');
const app = express()
const path = require('path');
const port = 5000;
 
app.use('/',require(path.join(__dirname,'routes/signature.js')))

app.listen(port,()=>{
    // res.send('')
    console.log(`app is running on port : ${port}`)
})