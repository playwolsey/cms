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
router.get('/template/:id', tms.template);
router.post('/tms/change', tms.change);
router.post('/tms/modify', tms.modify);
router.post('/tms/del', tms.del);

router.get('/mods', mods.index);
router.post('/mods', mods.add);
router.get('/mods/:id', mods.edit);
router.get('/mods/preview/:id', mods.preview);
router.post('/mods/save', mods.save);

router.get('/images', images.index);

router.get('/tools', tools.index);

router.get('/members', members.index);

module.exports = router;
