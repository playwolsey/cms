/*
 * @desc images page controllers
 * @author awwwesssooooome <chengpengcp9@gmail.com>
 * @createTime 2015-08-10
 */

function index(req, res) {
    res.render('images/images', {
        title: '图片空间',
        menu: 'images'
    });
}

function upload(req, res) {
    res.json({
        title: '图片空间',
        menu: 'images',
        url: '',
        file_path: '',
        data: {
        }
    })
}

exports.index = index;
exports.upload = upload;
