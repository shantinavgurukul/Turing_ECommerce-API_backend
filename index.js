const express = require('express');
const app = express();
app.use(express.json());
const router = require('./routes/router')
app.use(router);
const PORT = 5000;

app.listen(PORT,() =>{
    console.log(`server is working with ${PORT}`);
})

