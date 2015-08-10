/*
 * @desc tools page controllers
 * @author awwwesssooooome <chengpengcp9@gmail.com>
 * @createTime 2015-08-10
 */

function index(req, res) {
    res.render('tools/tools', {
        title: '测试工具',
        menu: 'tools'
    });
}

exports.index = index;
