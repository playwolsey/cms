/*
 * @desc tms preview page render&&event
 * @author awwwesssooooome <chengpengcp9@gmail.com>
 * @createTime 2015-08-12
 */

;(function($, win, undef) {
    var preview = {
        pid: '',

        init: function() {
            this.initNode();
            this.bindEvent();
        },

        initNode: function() {
            this.$editPageBtn = $('.J_editPage');
            this.$editSubmitBtn = $('.J_editSubmit');
            this.$delSubmitBtn = $('.J_delSubmit');

            this.$nameInput = $('.J_pageName');
            this.$ownerInput = $('.J_pageOwner');
            this.$passwordInput = $('.J_pagePwd');
            this.$delPasswordInput = $('.J_delPagePwd');
        },

        bindEvent: function() {
            var _this = this;

            this.$editPageBtn.on('click', function(e) {
                _this.getInfo(e);
            });

            this.$editSubmitBtn.on('click', function(e) {
                _this.upPageInfo(e);
            });

            this.$delSubmitBtn.on('click', function(e) {
                _this.delPageInfo(e);
            });
        },

        getInfo: function(e) {
            e.preventDefault();

            var _this = this;
            this.pid = $(e.target).attr('data-pid');

            $.post('/tms/change', {
                "pid": _this.pid
            }, function(resp) {
                _this.$nameInput.val(resp.data.name);
                _this.$ownerInput.val(resp.data.owner);
            });
        },

        upPageInfo: function(e) {
            e.preventDefault();

            var _this = this;

            $.post('/tms/modify', {
                "pid": _this.pid,
                "name": _this.$nameInput.val(),
                "owner": _this.$ownerInput.val(),
                "password": _this.$passwordInput.val()
            }, function(resp) {
                if (resp.status == 0) {
                    alert('密码错误');
                } else {
                    alert(resp.msg);
                    window.location = '/tms';
                }
            });
        },

        delPageInfo: function(e) {
            e.preventDefault();

            var _this = this;

            $.post('/tms/del', {
                "pid": $(e.target).attr('data-pid'),
                "password": _this.$delPasswordInput.val()
            }, function(resp) {
                if (resp.status == 0) {
                    alert('密码错误');
                } else {
                    alert(resp.msg);
                    window.location = '/tms';
                }
            });
        }
    };

    preview.init();
})(jQuery, window);
