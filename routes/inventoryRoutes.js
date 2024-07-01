const express = require('express');
const router = express.Router();

//  get all inventory
router.get('/', (req,res)=>{
    const db = require('../server')
    const sql = "SELECT * FROM inventory"
    db.query(sql, (err, data)=>{
        if(err){
            res.status(400).json(err,"no data fetched!")

        }
        res.status(200).json(data);
    })
})
//  get all inventory where onhand is more than 0
router.get('/onhand', (req,res)=>{
    const db = require('../server')
    const sql = "SELECT * FROM inventory WHERE onhand!=0"
    db.query(sql, (err, data)=>{
        if(err){
            res.status(400).json(err,"no data fetched!")

        }
        res.status(200).json(data);
    })
})


// get brands group by brand
router.get('/:type/brands', (req,res)=>{
    const db = require('../server')
    const type = req.params.type
    const sql = "SELECT * FROM inventory WHERE type=? GROUP BY brand"
    db.query(sql,[type], (err, data)=>{
        if(err){
            res.status(400).json(err,"no data fetched!")

        }
        res.status(200).json(data);
    })
})

//  get all Onu inventory
router.get('/:brand', (req,res)=>{
    const db = require('../server')
    const brand = req.params.brand
    const sql = "SELECT * FROM inventory WHERE brand=? AND onhand!=0"
    db.query(sql, [brand],(err, data)=>{
        if(err){
            res.status(400).json(err,"no data fetched!")
        }
        res.status(200).json(data);
    })
})



// get single data inventory
router.get('/:id', (req, res) => {
    const db = require('../server');
    const id = req.params.id;
    const sql = "SELECT * FROM inventory WHERE inventory_id=?";
    
    db.query(sql,[id],(err, data)=> {
        if(err){
            res.send(err);
        }
        res.status(200).json(data);
    })

})

// insert new inventory
router.post('/', (req, res)=>{
    const db = require('../server')
    const {brand, type, model, serial} = req.body
    const sql = "INSERT INTO `inventory`(`brand`, `type`, `model`, `serial_no`, `onhand`, `pending`) VALUES (?,?,?,?,1,0)";

    db.query(sql, [brand, type, model, serial], (err, data)=> {
        if(err){
            res.send(err)
        }
        res.status(200).json(data);
    })
})

// update existing inventory
router.patch('/update', (req, res) => {
    const db = require('../server');
    
    const sql = "UPDATE inventory JOIN ft_request_order ON ft_request_order.new_sn = inventory.serial_no SET onhand=0";
    
    db.query(sql,(err, data)=> {
        if(err){
            res.send(err);
        }
        res.status(200).json(data);
    })

})

// delete single inventory
router.delete('/:id', (req,res)=> {
    const db = require('../server');
    const id = req.params.id;
    const sql = "DELETE FROM inventory WHERE inventory_id=?"

    db.query(sql, [id], (err, data)=> {
        if(err){
            res.send(err);
        }
        res.status(200).json(data);
    })
})


module.exports = router;