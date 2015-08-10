/*
 * @desc tms page controllers
 * @author awwwesssooooome <chengpengcp9@gmail.com>
 * @createTime 2015-08-10
 */


/*
 * module depends
 */
var md5 = require('MD5');

function index(req, res) {
    res.render('tms/tms', {
        title: '页面工具',
        menu: 'tms'
    });
}

function add(req, res) {
    var tid = md5(Date.parse(new Date()));
    res.redirect('/tms/' + tid);
}

//function add(req, res){
//    console.log(req.param('name'));
//    pool.getConnection(function(err, connection) {
//        var tid = md5(Date.parse(new Date()));
//        connection.query(
//            'INSERT INTO '+tablename+' '+
//                'SET pid = ? , name = ?, owner = ?, password = ?',
//            [tid, req.param("name"), req.param("owner"), req.param("password")],
//
//            function selectCb(err, resuluts, fields){
//                connection.release();
//
//                fs.open(path.normalize(__dirname+"/../plugins/templates/"+tid+".json"),"a",function(e,fd){
//                    if(e) throw e;
//                    res.redirect('/tms/'+tid);
//                });
//
//            });
//    });
//};


exports.index = index;
exports.add = add;
