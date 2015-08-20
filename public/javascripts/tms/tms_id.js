/*
 * @desc tms_id page render&&event
 * @author awwwesssooooome <chengpengcp9@gmail.com>
 * @createTime 2015-08-12
 */

;(function($, win, undef) {
    var doc = win.document,
        current_trigger,
        current_modal;

    var Storage, QrView, TMS, DnD;

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
				widgetLen = $widgets.length,
				i, j, attrs, attrLen;

            for (; i < widgetLen; i++) {
				attrs = $widgets[i].attributes,
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

    // 拖拽对象
    DnD = {
        bind: function() {
            $(".J_widgetDrag").draggable({
                helper: "clone"
            });

            $("#J_screen").droppable({
                drop: function(event, ui) {
                    var widget_name = $(ui.draggable).attr('widget-name'),
                        $widget;

                    if (!$(ui.draggable).hasClass('J_widgetDrag')) {
                        return;
                    }

                    if (widget_name == 'banner') {
                        $widget = $('<div class="J_widget widget-box" widget-name="' + widget_name + '">' +
                                        '<div class="wrapper">' +
                                            '<div class="banner">' +
                                                '<a href="http://yixin.im"><img src="http://b0.hucdn.com/party/default/f2a8c505f91aba660bac5732395c947e.jpg"/></a>' +
                                            '</div>' +
                                        '</div>' +
                                        '<a class="up">上</a>' +
                                        '<a class="down">下</a>' +
                                        '<a class="J_edit edit" trigger-widget="' + widget_name + '">改</a>' +
                                        '<a class="J_del del">删</a>' +
                                        '<a class="anchor-edit"></a>' +
                                    '</div>');
                    } else if (widget_name == 'text') {
                        $widget = $('<div class="J_widget widget-box" widget-name="' + widget_name + '">' +
                                        '<div class="wrapper">' +
                                            '<div class="text">' +
                                                '<a><img src="http://b0.hucdn.com/party/default/8ddd21cb4781ec57aa1fe9a7a91b3888.jpg"/></a>' +
                                            '</div>' +
                                        '</div>' +
                                        '<a class="up">上</a>' +
                                        '<a class="down">下</a>' +
                                        '<a class="J_edit edit" trigger-widget="' + widget_name + '">改</a>' +
                                        '<a class="J_del del">删</a>' +
                                        '<a class="anchor-edit"></a>' +
                                    '</div>');
                    } else if (widget_name == 'nav') {
                        $widget = $('<div class="J_widget widget-box" widget-name="' + widget_name + '">' +
                                        '<div class="wrapper">' +
                                            '<div class="nav">' +
                                                '<a><img src="http://b0.hucdn.com/party/default/0fc4e35c36f8414fdc78f272362c2684.png"/></a>' +
                                            '</div>' +
                                        '</div>' +
                                        '<a class="up">上</a>' +
                                        '<a class="down">下</a>' +
                                        '<a class="J_edit edit" trigger-widget="' + widget_name + '">改</a>' +
                                        '<a class="J_del del">删</a>' +
                                        '<a class="anchor-edit"></a>' +
                                    '</div>');
                    } else if (widget_name == 'diy') {
                        var mid = $(ui.draggable).attr('widget-mid');

                        $widget = $('<div class="J_widget widget-box" widget-name="diy" widget-mid="'+mid+'">' +
                                        '<img src="http://b0.hucdn.com/party/default/37b66d74cea626bbc15ca6e671ca0f99.jpg">' +
                                        '<a class="up">上</a>' +
                                        '<a class="down">下</a>' +
                                        '<a class="J_edit edit" trigger-widget="' + widget_name + '">改</a>' +
                                        '<a class="J_del del">删</a>' +
                                        '<a class="anchor-edit"></a>' +
                                    '</div>');
                    }
                    
                    if ($widget instanceof jQuery) {
                        $widget.droppable({
                            drop: function(event, ui) {
                                if ($(ui.draggable).hasClass('mod-timer') && ($(this).has('.timer-edit').length === 0)) {
                                    event.stopPropagation();
                                    $(this).append('<i class="icon clock timer-edit"></i>');
                                }
                            }
                        });

                        $(this).append($widget);
                        Storage.save();
                    }
                }
            });
            
        },

        render: function() {
            this.bind();
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
            DnD.render();
        },

        bindEvent: function() {
            var _this = this;

            this.$globalSettingSubmitBtn.on('click', function(e) {
                _this.storeGlobal();
            });

            $('#J_screen').on('click', function(e) {
                if ($(e.target).hasClass('J_del')) {
                    _this.deleteMods(e);
                } else if ($(e.target).hasClass('J_edit')) {
                    _this.editMods(e);
                }
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
        },

        deleteMods: function(e) {
            e.preventDefault();

            if (!confirm('确定删除么')) {
                return;
            }

            var $widget = $(e.target).parent('.J_widget');

            //如果移除的是导航模块，删除所有对应的锚点
            if ($widget.attr('widget-name') === 'nav') {
                var navdata = JSON.parse('[' + ($widget.attr('widget-data') || '') + ']');
                navdata.forEach(function(nd, idx){
                    $('.widget-box', '#J_screen').eq(nd.navhole).removeClass('anchored');
                });
            }
            $(e.target).parent('.J_widget').remove();
            Storage.save();
        },

        editMods: function(e) {
            e.preventDefault();

            current_trigger = $(e.target).parent('.J_widget');
            var widget = $(e.target).attr('trigger-widget');
            current_modal = '#J_modal' + widget;
            $(current_modal).modal();
        }
    };

    TMS.init();
})(jQuery, window);
