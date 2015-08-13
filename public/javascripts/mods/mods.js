/*
 * @desc mods page render&&event
 * @author awwwesssooooome <chengpengcp9@gmail.com>
 * @createTime 2015-08-12
 */

;(function($, win, undef) {
    var mods = {
        init: function() {
            this.bindEvent();
        },

        bindEvent: function() {
            $('.J_submit').on('click', function(e){
                e.preventDefault();
                $('.J_addModForm').submit();
            });
        }
    };

    mods.init();
})(jQuery, window)
