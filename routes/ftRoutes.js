const express = require('express');
const router = express.Router();


//  get all fault tickets
router.get('/', (req,res)=>{
    const db = require('../server')
    const sql = "SELECT * FROM fault_tickets"
    db.query(sql, (err, data)=>{
        if(err){
            res.status(400).json(err,"no data fetched!")

        }
        res.status(200).json(data);
    })
})

// get single tickets
router.get('/:id', (req, res) => {
    const db = require('../server');
    const id = req.params.id;
    const sql = "SELECT * FROM fault_tickets WHERE ft_id=?";
    
    db.query(sql,[id],(err, data)=> {
        if(err){
            res.send(err);
        }
        res.status(200).json(data);
    })

})

// insert 
router.post('/', (req, res)=>{
    const db = require('../server')
    const {ftNo, ftSubsName, ftTelNo, ftContactNo, ftRemarks, ftStatus} = req.body
    const sql = "INSERT INTO `fault_tickets`(`ft_no`, `ft_telno`, `ft_subsname`, `ft_contactno`, `ft_remarks`, `ft_status`) VALUES (?,?,?,?,?,?)";

    db.query(sql, [ftNo, ftSubsName, ftTelNo, ftContactNo, ftRemarks, ftStatus], (err, data)=> {
        if(err){
            res.send(err)
        }
        res.status(200).json(data);
    })
})

// delete single ft
router.delete('/:id', (req,res)=> {
    const db = require('../server');
    const id = req.params.id;
    const sql = "DELETE FROM fault_tickets WHERE ft_id=?";

    db.query(sql, [id], (err, data)=> {
        if(err){
            res.send(err);
        }
        res.status(200).json(data);
    })
})




module.exports = router;