const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    res.json('Main route works');
});

const PORT = 5000 || process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Magic happened on port ${PORT}`);
});