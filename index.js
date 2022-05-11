const express = require('express')
const app = express()
const port = process.env.PORT || 5000;

app.get('', (req, res) => {
    res.send('running my crud operations')
})


// Server Listening 
app.listen(port, () => {
    console.log('CRUD server is running', port);
})