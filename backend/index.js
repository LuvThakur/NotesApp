
const connectomongo = require('./db');
const express = require('express')
var cors = require('cors')

connectomongo();

const app = express()
const port = 5000
app.use(cors())



// middleware for using req.body
app.use(express.json())

// availabele routes on route directory

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})