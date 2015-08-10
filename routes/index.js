var express = require('express');
var router = express.Router();

var index = require('../controllers/index'),
    tms = require('../controllers/tms'),
    images = require('../controllers/images'),
    tools = require('../controllers/tools'),
    members = require('../controllers/members');

router.get('/', index.index);

router.get('/tms', tms.index);
router.post('/tms', tms.add);

router.get('/images', images.index);
router.get('/tools', tools.index);
router.get('/members', members.index);

module.exports = router;
