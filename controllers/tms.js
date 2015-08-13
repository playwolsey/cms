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


var index = function(req, res) {
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

var add = function(req, res) {
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

var edit = function(req, res) {
    var pageSql = 'select * from tms_page where pid ="' + req.params.id + '"',
        modSql = 'select * from tms_mod';

    pool.getConnection(function(err, connection) {
        connection.query(pageSql, function(err, results, fields) {
            if (err) {
                throw err;
            }

            connection.query(modSql, function(err, results, fields) {
                if (err) {
                    throw err;
                }

                fs.readFile(path.normalize(__dirname + "/../plugins/mods/mods.json"), "utf8", function(e, data) {
                    if (e) {
                        throw e;
                    }
                    if(data && JSON.parse(data)) {
                        res.render('tms/tms_id', {
                            title: '编辑 - 页面工具',
                            menu: 'tms',
                            mods: results,
                            pid: req.params.id,
                            data: JSON.parse(data)
                        });
                    }else{
                        res.send('Sorry I have no data!');
                    }
                });

                connection.release();
            });
        });
    });
}

var preview = function(req, res) {
    res.render('tms/preview', {
        title: '预览 - 页面工具',
        menu: 'tms',
        pid: req.params.id
    });
}


exports.index = index;
exports.add = add;
exports.edit = edit;
exports.preview = preview;
