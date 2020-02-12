const express = require('express');
const dbConnection = require('../database/db_connection');

const router = express.Router();


router.get('/', (req, res) => {
    res.render('home', {
        layout: 'login'
    })
})
router.get('/getWord', (req, res) => {
    console.log("aaaaaaaaaaaaa");
    dbConnection.query(`SELECT doodle FROM round  
    ORDER BY RANDOM() LIMIT 1`, (err, result) => {
    res.json(result.rows)
    })
})

router.post('/auth', (req, res) => {
    dbConnection.query('SELECT * FROM usernames WHERE $1 = name and $2 = password', [req.body.inputUserName, req.body.inputPassword], (err, result) => {
        if (result.rows.length) {
            res.redirect('game')
        } else {
            res.render('home', {
                layout: 'login'
            })
        }
    })
})


router.get('/game', (req, res) => {
    res.render('game', {

    })
})


module.exports = router;