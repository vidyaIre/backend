const express = require('express');
const router = require('./routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', router);


app.get('/', (req, res) => {
    res.send('Welcome to the API');
});



const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})