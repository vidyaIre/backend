const express = require('express');
const app = express();

app.get('/', (req, res) =>{
    res.status(200).send('Hello Express !');
});
app.get('/about', (req, res) =>{
    res.status(200).send('Hello  Now you are in about page!');
});
app.get('/user', (req, res) =>{
    res.status(200).send('Hello  user vidya!');
});

const PORT = 5000;
app.listen(PORT, () =>{
    console.log(`Server is running on PORT ${PORT}`);
})