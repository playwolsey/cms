/*
 * tms page controller
 */

function index(req, res) {
    res.render('tms/tms', {
        title: '页面工具',
        menu: 'tms'
    });
}

exports.index = index;
