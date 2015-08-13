/*
 * @desc mods_id page render&&event
 * @author awwwesssooooome <chengpengcp9@gmail.com>
 * @createTime 2015-08-12
 */

;(function($, win, undef) {
    var htmlPanel, cssPanel, jsPanel, confPanel,

    mod = {
        init: function() {
            this.initCodeMirror();
            this.bindEvent();
        },

        initCodeMirror: function() {
            htmlPanel = CodeMirror.fromTextArea(document.getElementById('html-textarea'), {
                mode: 'text/html',
                indentUnit: 4,
                tabSize: 4,
                theme: 'ambiance',
                lineNumbers: true,
                styleActiveLine: true,
                matchBrackets: true
            });

            cssPanel = CodeMirror.fromTextArea(document.getElementById('css-textarea'), {
                mode: 'text/css',
                indentUnit: 4,
                tabSize: 4,
                theme: 'ambiance',
                lineNumbers: true,
                styleActiveLine: true,
                matchBrackets: true
            });

            jsPanel = CodeMirror.fromTextArea(document.getElementById('js-textarea'), {
                mode: 'text/javascript',
                indentUnit: 4,
                tabSize: 4,
                theme: 'ambiance',
                lineNumbers: true,
                styleActiveLine: true,
                matchBrackets: true
            });

            confPanel = CodeMirror.fromTextArea(document.getElementById('conf-textarea'), {
                mode: 'text/javascript',
                indentUnit: 4,
                tabSize: 4,
                theme: 'ambiance',
                lineNumbers: true,
                styleActiveLine: true,
                matchBrackets: true
            });
        },

        bindEvent: function() {
            $('.J_saveBtn').on('click', function(e) {
                e.preventDefault();

                $.post('/mods/save', {
                    'mid': $('#J_mid').val(),
                    'css': cssPanel.doc.getValue().replace(/"/g, '\\"'),
                    'html': htmlPanel.doc.getValue().replace(/"/g, '\\"'),
                    'js': jsPanel.doc.getValue().replace(/"/g, '\\"'),
                    'conf': confPanel.doc.getValue().replace(/"/g, '\\"')
                }, function(resp){
                    alert('保存成功');
                    window.frames['previewFrame'].location.reload();
                });

            });
        }
    };

    mod.init();
})(jQuery, window)
