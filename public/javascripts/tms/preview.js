/*
 * @desc tms preview page render&&event
 * @author awwwesssooooome <chengpengcp9@gmail.com>
 * @createTime 2015-08-12
 */

;(function($, win, undef) {
    var preview = {
        init: function() {
            this.initNode();
            this.bindEvent();
        },

        initNode: function() {
            this.$editPageBtn = $('.J_editPage');
            this.$nameInput = $('.J_pageName');
            this.$ownerInput = $('.J_pageOwner');
        },

        bindEvent: function() {
            var _this = this;

            this.$editPageBtn.on('click', function(e) {
                e.preventDefault();

                pid = $(e.target).attr('data-pid');

                $.post('/tms/change', {
                    "pid": pid
                }, function(resp) {
                    _this.$nameInput.val(resp.data.name);
                    _this.$ownerInput.val(resp.data.owner);
                });
            });
        }
    };

    preview.init();
})(jQuery, window);
