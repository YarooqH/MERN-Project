const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({
        text: 'Henlo World'
    })
})

module.exports = router;