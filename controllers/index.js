/*
 * index page controller
 */

function index(req, res) {
    res.render('index/index', {
        title: '首页',
        menu: 'index'
    });
}

exports.index = index;
