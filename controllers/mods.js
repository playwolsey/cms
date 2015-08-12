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
                title: '',
                menu: 'mod',
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
            res.redirect('/mod/' + mid);

            connection.release();
        });
    });
};


exports.index = index;
exports.add = add;
