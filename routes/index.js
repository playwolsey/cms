var express = require('express');
var router = express.Router();

var index = require('../controllers/index'),
    tms = require('../controllers/tms');

router.get('/', index.index);
router.get('/tms', tms.index);

module.exports = router;
