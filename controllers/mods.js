/*
 * @desc mods page controllers
 * @author awwwesssooooome <chengpengcp9@gmail.com>
 * @createTime 2015-08-12
 */

/*
 * module depends
 */
var fs = require('fs'),
    md5 = require('MD5'),
    path = require('path'),
    http = require('http');

var pool = require('../models/db');

var index = function(req, res) {
    var sql = 'select * from tms_mod';

    pool.getConnection(function(err, connection) {
        connection.query(sql, function(err, results, fields) {
            if (err) {
                throw err;
            }

            res.render('mods/mods', {
                title: '模块',
                menu: 'mods',
                data: results
            });

            connection.release();
        });
    });
};

var add = function(req, res) {
    var mid = md5(Date.parse(new Date())),
        sql = 'INSERT INTO tms_mod SET mid = ?, name = ?, owner = ?, password = ?',
        params = [mid, req.param('name'), req.param('owner'), req.param('password')];

    pool.getConnection(function(err, connection) {
        connection.query(sql, params, function(err, results, fields) {
            res.redirect('/mods/' + mid);

            connection.release();
        });
    });
};

var edit = function(req, res) {
    var sql = 'select * from tms_mod where mid ="' + req.params.id + '"';

    pool.getConnection(function(err, connection) {
        connection.query(sql, function(err, results, fields) {
            if (err) {
                throw err;
            }

            res.render('mods/mods_id', {
                title: '编辑模块',
                menu: 'mods',
                mid: req.params.id,
                html: results[0].html,
                css: results[0].css,
                js: results[0].js,
                conf: results[0].conf
            });

            connection.release();
        });
    });
};

var save = function(req, res) {
    var findSql = 'select * from tms_mod where mid ="' + req.param('mid') + '"',
        upSql = 'update tms_mod set html="' + req.param('html') +
            '",css="' + req.param('css') +
            '",js="' + req.param('js') +
            '",conf="' + req.param('conf') +
            '" where mid="'+req.param('mid')+'"';

    pool.getConnection(function(err, connection) {
        connection.query(findSql, function(err, results, fields) {
            if (err) throw err;

            connection.query(upSql, function(err, results, fields) {
                if (err) throw err;
                res.json({
                    status: 1, 
                    msg: '提交成功'
                });
                connection.release();
            });
        });
    });
};

var preview = function(req, res) {
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', req.params.id);
    var sql = 'select * from tms_mod where mid ="' + req.params.id + '"';

    pool.getConnection(function(err, connection) {
        connection.query(sql, function(err, results, fields) {
            if (err) {
                throw err;
            }

            res.render('mods/preview', {
                title: '模块预览',
                html: results[0].html,
                css: results[0].css,
                js: results[0].js,
                conf: results[0].conf
            });

            connection.release();
        });
    });
};


exports.index = index;
exports.add = add;
exports.edit = edit;
exports.save = save;
exports.preview = preview;
