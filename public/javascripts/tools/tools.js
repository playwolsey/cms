/*
 * @desc tools page render&&event
 * @author awwwesssooooome <chengpengcp9@gmail.com>
 * @createTime 2015-08-08
 */

;(function($, win, undef) {
    var tools = {
        init: function() {
            this.initNode();
            this.bindEvent();
        },

        initNode: function() {
            this.$makeQr = $('.J_makeQr');
            this.$qrBox = $('.J_qrBox');
            this.$qrText = $('.J_qrText');
        },

        bindEvent: function() {
            var _this = this;

            this.$makeQr.on('click', function(e) {
                e.preventDefault();

                _this.$qrBox.wrapInner('<img src="http://qr.liantu.com/api.php?text=' + _this.$qrText.val() + '" />');
            });
        }
    };

    tools.init();
})(jQuery, window);
