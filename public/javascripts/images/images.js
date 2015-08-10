/*
 * @desc images page render&&event
 * @author awwwesssooooome <chengpengcp9@gmail.com>
 * @createTime 2015-08-10
 */

;(function($, win, undef) {
    Dropzone.options.myAwesomeDropzone = {
        maxFilesize: 4 // MB
    };

    var myDropzone = new Dropzone(".dropzone", {
        url: "/images/upload",
        acceptedFiles : "image/*",
        fallback: function() {
            alert('用个好点的浏览器吧');
        },
        init: function() {
            this.on('success',function(file,formData,res) {
                $(file.previewElement).append('<button class="copy" data-url="' + formData.url + '" type="button" title="复制链接到">复制链接</button>');

                var client = new ZeroClipboard($(file.previewElement).find(".copy"));

                client.on( 'ready', function(event) {
                    client.on( 'copy', function(event) {
                        event.clipboardData.setData('text/plain', formData.url);
                    });

                    client.on( 'aftercopy', function(event) {
                        $(file.previewElement).find(".copy").addClass('blue').text('复制成功');
                        setTimeout(function(){
                            $(file.previewElement).find(".copy").text('复制链接');
                        }, 1000);
                    });
                });
            }).on('canceled',function(){
            }).on('error',function(){
                alert('卧槽，上传失败了');
            })
        }
    });
})(jQuery, window);
