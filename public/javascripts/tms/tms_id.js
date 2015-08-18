/*
 * @desc tms_id page render&&event
 * @author awwwesssooooome <chengpengcp9@gmail.com>
 * @createTime 2015-08-12
 */

;(function($, win, undef) {
    var doc = win.document,
        current_trigger,
        current_modal;

    var Storage, QrView, TMS;

    // 本地存储对象封装
    Storage = {
        ls: win.localStorage,
        colorStoreNum: 5,
        sign: location.href.split('/tms/')[1].replace('#', ''),

        get: function(key) {
            return this.ls.getItem(key);
        },

        set: function(key, value) {
			this.ls.setItem(key, value);
        },

        clear: function() {
			this.ls.clear();
        },

        save: function() {
            var cached = [],
                $widgets = $('.J_widget'),
				widgetLen = widgets.length,
				i, j, attrs, attrLen;

            for (; i < widgetLen; i++) {
				attrs = widgets[i].attributes,
				attrLen = attrs.length;
				cached[i] = {};

                for (; j < attrLen; j++) {
					cached[i][attrs[j].name] = attrs[j].value;
                }
            }

            this.set(this.sign, JSON.stringify(cached));
        },

        saveGlobal: function() {
            this.set('global_setting_' + this.sign, $('.J_pageGlobalSetting').attr('data-global'));
        },

        saveColor: function() {
            var color = $(current_modal).find('').val().toUpperCase(),
                colors = this.loadColor();

            if (colors.indexOf(color) < 0) {
                colors.push(color);
            }

            if (colors.length > this.colorStoreNum) {
                colors.shift();
            }

            this.set('latest_color', JSON.stringify(colors));
        },

		loadColor : function() {
			return (this.get('latest_color') && $.parseJSON(this.get('latest_color'))) || [];
		}
    };

    // 二维码对象
	QrView = {
		$el: $('#view-qr'),
		$closeEl: $('.link-popup-close'),

		render: function() {
			this.$el.on('click', function() {
				$('#qr-popup').show();
			});
			this.$closeEl.on('click', function(){
				$(this).parents('.link-popup').hide();
			});
		}
	};

    TMS = {
        init: function() {
            this.initNode();
            this.bindEvent();
            this.render();
        },

        initNode: function() {
            this.$globalSettingSubmitBtn = $('.J_globalSettingSubmit');
        },

        render: function() {
            QrView.render();
        },

        bindEvent: function() {
            var _this = this;

            this.$globalSettingSubmitBtn.on('click', function(e) {
                _this.storeGlobal();
            });
        },

        storeGlobal: function(e) {
            e.preventDefault();

            var data_groups = $(e.target).parents('.modal').find('textarea'),
                global = {};

            $.each(data_groups, function(i, t) {
                if ($(t).val()) {
                    global[$(t).attr('name')] = $(t).val();
                }
            });

            $('.J_globalSettingPanel').attr('data-global', JSON.stringify(global));
            Storage.saveGlobal();
            
            $('#globalModal').modal('hide');
        }
    };

    TMS.init();
})(jQuery, window);
