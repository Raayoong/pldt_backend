require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors')
const inventoryRouter = require('./routes/inventoryRoutes')
const faultTicketRouter = require('./routes/ftRoutes')
const requestOrderRouter = require('./routes/ftRequestOrderRoutes')
// middleware
app.use(express.json())
app.use(cors())

app.use((req,res,next)=>{
    console.log(req.path,req.method,res)
    next();
})

// routes
app.use('/inventory', inventoryRouter)
app.use('/fault_tickets', faultTicketRouter);
app.use('/ft_request_order', requestOrderRouter)

// create connection to db
const db = mysql.createConnection({
    host: process.env.DB_LOCALHOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
db.connect();
console.log(db)


app.get('/', (req,res) => {
    res.send('Hellow World from backend')
});

app.listen(process.env.PORT, ()=>{
    console.log(`Listening to port ${process.env.PORT}`)
})

module.exports = db;