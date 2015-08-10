/*
 * @desc members page controllers
 * @author awwwesssooooome <chengpengcp9@gmail.com>
 * @createTime 2015-08-10
 */

function index(req, res) {
    res.render('members/members', {
        title: '开发人员',
        menu: 'members'
    });
}

exports.index = index;
