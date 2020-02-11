const express = require('express');
const dbConnection = require('../database/db_connection');

const router = express.Router();


router.get('/', (req, res) => {
    res.render('home', {
        layout: 'login'
    })
})

router.post('/auth', (req, res) => {
    console.log(req.body)
    dbConnection.query('SELECT * FROM usernames WHERE $1 = name and $2 = password', [req.body.inputUserName, req.body.inputPassword], (err, result) => {
        if (result.rows.length) {
            console.log('work')
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