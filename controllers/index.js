/*
 * @desc index page controllers
 * @author awwwesssooooome <chengpengcp9@gmail.com>
 * @createTime 2015-08-08
 */

function index(req, res) {
    res.render('index/index', {
        title: '首页',
        menu: 'index'
    });
}

exports.index = index;
