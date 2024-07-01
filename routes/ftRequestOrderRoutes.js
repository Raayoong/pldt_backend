const express = require('express');
const router = express.Router();

// insert 
router.post('/', (req, res)=>{
    const db = require('../server')
    const {ftTel, type, brand, oldModel, oldSN, newSN} = req.body
    const sql = "INSERT INTO `ft_request_order`( `ft_telno`, `type`,`brand`, `old_model`, `old_sn`, `new_sn`) VALUES (?,?,?,?,?,?)";

    db.query(sql, [ftTel, type, brand, oldModel, oldSN, newSN], (err, data)=> {
        if(err){
            res.send(err)
        }
        res.status(200).json(data);
    })
})


// get all 
router.get('/ro_list', (req,res)=> {
    const db = require('../server')
    const sql = "SELECT * FROM ft_request_order WHERE status=0";
    
    db.query(sql, (err, data)=> {
        if(err){
            res.send(err)
        }
        res.status(200).json(data);
    })
})

// update status 
router.patch('/update/:id', (req,res)=>{
    const db = require('../server');
    const {status} = req.body
    const id = req.params.id
    const sql = "UPDATE `ft_request_order` SET `status`=? WHERE ro_id=?";

    db.query(sql, [status, id], (err,data) => {
        if(err){
            res.send(err)
        }
        res.status(200).json(data);
    })
})


module.exports = router;