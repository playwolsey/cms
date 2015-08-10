/*
 * @desc tms index page render&&event
 * @author awwwesssooooome <chengpengcp9@gmail.com>
 * @createTime 2015-08-10
 */

;(function($, win, undef) {
    var tms = {
        init: function() {
            this.initNode();
            this.bindEvent();
        },

        initNode: function() {
            this.$createBtn = $('.J_create');
            this.$myModal = $('#myModal');
            this.$submitBtn = $('.J_submit');
            this.$addTmsForm = $('.J_addTmsForm');
        },

        bindEvent: function() {
            var _this = this;

			this.$createBtn.on('click', function() {
				_this.$myModal.removeClass('fade').show();
			});

            this.$submitBtn.on('click', function(e) {
                e.preventDefault();
                _this.$addTmsForm.submit();
            });
        }
    };

    tms.init();
})(jQuery, window);
