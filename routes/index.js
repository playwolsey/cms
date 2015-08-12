var express = require('express');
var router = express.Router();

var index = require('../controllers/index'),
    tms = require('../controllers/tms'),
    mods = require('../controllers/mods'),
    images = require('../controllers/images'),
    tools = require('../controllers/tools'),
    members = require('../controllers/members');


router.get('/', index.index);

router.get('/tms', tms.index);
router.post('/tms', tms.add);
router.get('/tms/:id', tms.edit);
router.get('/tms/preview/:id', tms.preview);

router.get('/mods', mods.index);

router.get('/images', images.index);

router.get('/tools', tools.index);

router.get('/members', members.index);

module.exports = router;
