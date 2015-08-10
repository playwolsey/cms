/*
 * @desc index page controllers
 * @author awwwesssooooome <chengpengcp9@gmail.com>
 * @createTime 2015-08-10
 */

function index(req, res) {
    res.render('tms/tms', {
        title: '页面工具',
        menu: 'tms'
    });
}

exports.index = index;
