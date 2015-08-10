var express = require('express');
var router = express.Router();

var index = require('../controllers/index'),
    tms = require('../controllers/tms'),
    tools = require('../controllers/tools'),
    members = require('../controllers/members');

router.get('/', index.index);
router.get('/tms', tms.index);
router.get('/tools', tools.index);
router.get('/members', members.index);

module.exports = router;
