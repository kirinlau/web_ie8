const BaseComponent = require('../BaseComponent')
require('imports-loader?define=>false!./jQuery-File-Upload-9.28.0/js/vendor/jquery.ui.widget')
require('imports-loader?define=>false!./jQuery-File-Upload-9.28.0/js/jquery.iframe-transport')
require('imports-loader?define=>false!./jQuery-File-Upload-9.28.0/js/jquery.fileupload')


class ajaxUpload extends BaseComponent {
  constructor() {
    super()
    this.init()
  }
  init(selector){
    document.domain="kdfafa.com"
    $('#fileupload').fileupload({
      url: 'http://file.kdfafa.com/fileupload.ashx?ExtMask=|.xls|.xlsx|' + '&MaxSize='  + '&Unit=' ,
      // dataType: 'json',
      forceIframeTransport: true,
      done: function (e, data) {
        console.log(data)
        window.res = data
      },
      // progressall: function (e, data) {
      //     var progress = parseInt(data.loaded / data.total * 100, 10);
      //     $('#progress .progress-bar').css(
      //         'width',
      //         progress + '%'
      //     );
      // }
  }).prop('disabled', !$.support.fileInput)
      .parent().addClass($.support.fileInput ? undefined : 'disabled');
  }
}
module.exports = ajaxUpload

