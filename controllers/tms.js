/*
 * @desc tms page controllers
 * @author awwwesssooooome <chengpengcp9@gmail.com>
 * @createTime 2015-08-10
 */


/*
 * module depends
 */
var fs = require('fs'),
    md5 = require('MD5'),
    path = require('path'),
    http = require('http'),
    domain = require('domain');

var pool = require('../models/db');


function index(req, res) {
    var sql = 'select * from tms_page';

    pool.getConnection(function(err, connection) {
        connection.query(sql, function(err, results, fields) {
            if (err) {
                throw err;
            }

            res.render('tms/tms', {
                title: '页面工具',
                menu: 'tms',
                data: results
            });

            connection.release();
        });
    });
}

function add(req, res) {
    var tid = md5(Date.parse(new Date())),
        sql = 'INSERT INTO tms_page SET pid = ?, name = ?, owner = ?, password = ?',
        params = [tid, req.param('name'), req.param('owner'), req.param('password')];

    pool.getConnection(function(err, connection) {
        connection.query(sql, params, function(err, results, fields) {
            if (err) {
                throw err;
            }

            connection.release();

            res.redirect('/tms/' + tid);
            //fs.open(path.normalize(__dirname+"/../plugins/templates/"+tid+".json"), 'a', function(err, fd) {
            //    if(err) throw err;
            //    res.redirect('/tms/' + tid);
            //});
        });
    });
}

function edit(req, res) {
    res.render('tms/tms_id', {
        title: '编辑',
        menu: 'tms'
    });
}

function preview(req, res) {
    res.render('tms/preview', {
        title: '预览',
        menu: 'tms',
        pid: req.params.id
    });
}


exports.index = index;
exports.add = add;
exports.edit = edit;
exports.preview = preview;
