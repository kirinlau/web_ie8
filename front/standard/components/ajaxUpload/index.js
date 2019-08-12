const BaseComponent = require('../BaseComponent')
class ajaxUpload extends BaseComponent {
  constructor(val_) {
    super()
    this.init(arguments)
    this.ajaxUploadFun(arguments)
  }
  init(val_) {
    //this.render(tpl);

  }
  //初始化函数
  ajaxUploadFun(val_) {

    function log() {
      if (typeof (console) != 'undefined' && typeof (console.log) == 'function') {
        Array.prototype.unshift.call(arguments, '[Ajax Upload]');
      }
    }

    function addEvent(el, type, fn) {
      if (el.addEventListener) {
        el.addEventListener(type, fn, false);
      } else if (el.attachEvent) {
        el.attachEvent('on' + type, function () {
          fn.call(el);
        });
      } else {
        throw new Error('not supported or DOM not loaded');
      }
    }

    function addResizeEvent(fn) {
      var timeout;

      addEvent(window, 'resize', function () {
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(fn, 100);
      });
    }

    if (document.documentElement.getBoundingClientRect) {
      var getOffset = function (el) {
        var box = el.getBoundingClientRect();
        var doc = el.ownerDocument;
        var body = doc.body;
        var docElem = doc.documentElement; // for ie 
        var clientTop = docElem.clientTop || body.clientTop || 0;
        var clientLeft = docElem.clientLeft || body.clientLeft || 0;

        var zoom = 1;
        if (body.getBoundingClientRect) {
          var bound = body.getBoundingClientRect();
          zoom = (bound.right - bound.left) / body.clientWidth;
        }

        if (zoom > 1) {
          clientTop = 0;
          clientLeft = 0;
        }

        var top = box.top / zoom + (window.pageYOffset || docElem && docElem.scrollTop / zoom || body.scrollTop / zoom) - clientTop,
          left = box.left / zoom + (window.pageXOffset || docElem && docElem.scrollLeft / zoom || body.scrollLeft / zoom) - clientLeft;

        return {
          top: top,
          left: left
        };
      };
    } else {
      var getOffset = function (el) {
        var top = 0,
          left = 0;
        do {
          top += el.offsetTop || 0;
          left += el.offsetLeft || 0;
          el = el.offsetParent;
        } while (el);

        return {
          left: left,
          top: top
        };
      };
    }

    function getBox(el) {
      var left, right, top, bottom;
      var offset = getOffset(el);
      left = offset.left;
      top = offset.top;

      right = left + el.offsetWidth;
      bottom = top + el.offsetHeight;

      return {
        left: left,
        right: right,
        top: top,
        bottom: bottom
      };
    }

    function addStyles(el, styles) {
      for (var name in styles) {
        if (styles.hasOwnProperty(name)) {
          el.style[name] = styles[name];
        }
      }
    }

    function copyLayout(from, to) {
      var box = getBox(from);

      addStyles(to, {
        position: 'absolute',
        left: box.left + 'px',
        top: box.top + 'px',
        width: from.offsetWidth + 'px',
        height: from.offsetHeight + 'px'
      });
    }


    var toElement = (function () {
      var div = document.createElement('div');
      return function (html) {
        div.innerHTML = html;
        var el = div.firstChild;
        return div.removeChild(el);
      };
    })();


    var getUID = (function () {
      var id = 0;
      return function () {
        return 'ValumsAjaxUpload' + id++;
      };
    })();


    function fileFromPath(file) {
      return file.replace(/.*(\/|\\)/, "");
    }

    function getExt(file) {
      return (-1 !== file.indexOf('.')) ? file.replace(/.*[.]/, '') : '';
    }

    function hasClass(el, name) {
      var re = new RegExp('\\b' + name + '\\b');
      return re.test(el.className);
    }

    function addClass(el, name) {
      if (!hasClass(el, name)) {
        el.className += ' ' + name;
      }
    }

    function removeClass(el, name) {
      var re = new RegExp('\\b' + name + '\\b');
      el.className = el.className.replace(re, '');
    }

    function removeNode(el) {
      el.parentNode.removeChild(el);
    }

    window.AjaxUpload = function (button, options) {
      this._settings = {
        action: 'upload.php',
        name: 'userfile',
        data: {},
        autoSubmit: true,
        responseType: false,
        hoverClass: 'hover',
        disabledClass: 'disabled',
        onChange: function (file, extension) { },
        onSubmit: function (file, extension) { },
        onComplete: function (file, response) { }
      };

      for (var i in options) {
        if (options.hasOwnProperty(i)) {
          this._settings[i] = options[i];
        }
      }

      if (button.jquery) {
        button = button[0];
      } else if (typeof button == "string") {
        if (/^#.*/.test(button)) {
          button = button.slice(1);
        }

        button = document.getElementById(button);
      }

      if (!button || button.nodeType !== 1) {
        throw new Error("Please make sure that you're passing a valid element");
      }
      console.log(button.nodeName.toUpperCase())
      if (button.nodeName.toUpperCase() == 'A'||button.nodeName.toUpperCase() == 'BUTTON') {
        addEvent(button, 'click', function (e) {
          if (e && e.preventDefault) {
            e.preventDefault();
          } else if (window.event) {
            window.event.returnValue = false;
          }
        });
      }

      this._button = button;
      this._input = null;
      this._disabled = false;
      this.enable();
      this._rerouteClicks();
    };
    AjaxUpload.prototype = {
      setData: function (data) {
        this._settings.data = data;
      },
      disable: function () {
        addClass(this._button, this._settings.disabledClass);
        this._disabled = true;

        var nodeName = this._button.nodeName.toUpperCase();
        if (nodeName == 'INPUT' || nodeName == 'BUTTON') {
          this._button.setAttribute('disabled', 'disabled');
        }
        if (this._input) {
          this._input.parentNode.style.visibility = 'hidden';
        }
      },
      enable: function () {
        removeClass(this._button, this._settings.disabledClass);
        this._button.removeAttribute('disabled');
        this._disabled = false;

      },

      _createInput: function () {
        var self = this;

        var input = document.createElement("input");
        input.setAttribute('type', 'file');
        input.setAttribute('name', this._settings.name);

        addStyles(input, {
          'position': 'absolute',
          'right': 0,
          'margin': 0,
          'padding': 0,
          'fontSize': '480px',
          'cursor': 'pointer'
        });

        var div = document.createElement("div");
        addStyles(div, {
          'display': 'block',
          'position': 'absolute',
          'overflow': 'hidden',
          'margin': 0,
          'padding': 0,
          'opacity': 0,
          'direction': 'ltr',
          'zIndex': 2147483583
        });

        if (div.style.opacity !== "0") {
          if (typeof (div.filters) == 'undefined') {
            throw new Error('Opacity not supported by the browser');
          }
          div.style.filter = "alpha(opacity=0)";
        }

        addEvent(input, 'change', function () {

          if (!input || input.value === '') {
            return;
          }

          var file = fileFromPath(input.value);

          if (false === self._settings.onChange.call(self, file, getExt(file))) {
            self._clearInput();
            return;
          }

          if (self._settings.autoSubmit) {
            self.submit();
          }
        });

        addEvent(input, 'mouseover', function () {
          addClass(self._button, self._settings.hoverClass);
        });

        addEvent(input, 'mouseout', function () {
          removeClass(self._button, self._settings.hoverClass);

          input.parentNode.style.visibility = 'hidden';

        });

        div.appendChild(input);
        document.body.appendChild(div);

        this._input = input;
      },
      _clearInput: function () {
        if (!this._input) {
          return;
        }

        removeNode(this._input.parentNode);
        this._input = null;
        this._createInput();

        removeClass(this._button, this._settings.hoverClass);
      },

      _rerouteClicks: function () {
        var self = this;
        addEvent(self._button, 'mouseover', function () {
          if (self._disabled) {
            return;
          }

          if (!self._input) {
            self._createInput();
          }

          var div = self._input.parentNode;
          copyLayout(self._button, div);
          div.style.visibility = 'visible';

        });

      },

      _createIframe: function () {
        var id = getUID();
        var iframe = toElement('<iframe src="javascript:false;" name="' + id + '" />');
        iframe.setAttribute('id', id);
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        return iframe;
      },
      _createForm: function (iframe) {
        var settings = this._settings;
        var form = toElement('<form method="post" enctype="multipart/form-data"></form>');
        form.setAttribute('action', settings.action);
        form.setAttribute('target', iframe.name);
        form.style.display = 'none';
        document.body.appendChild(form);
        for (var prop in settings.data) {
          if (settings.data.hasOwnProperty(prop)) {
            var el = document.createElement("input");
            el.setAttribute('type', 'hidden');
            el.setAttribute('name', prop);
            el.setAttribute('value', settings.data[prop]);
            form.appendChild(el);
          }
        }
        return form;
      },
      _getResponse: function (iframe, file) {
        var toDeleteFlag = false,
          self = this,
          settings = this._settings;
        addEvent(iframe, 'load', function () {
          if ( // For Safari 
            iframe.src == "javascript:'%3Chtml%3E%3C/html%3E';" ||
            iframe.src == "javascript:'<html></html>';") {
            if (toDeleteFlag) {
              setTimeout(function () {
                removeNode(iframe);
              }, 0);
            }

            return;
          }

          var doc = iframe.contentDocument ? iframe.contentDocument : window.frames[iframe.id].document;
          if (doc.readyState && doc.readyState != 'complete') {
            return;
          }

          if (doc.body && doc.body.innerHTML == "false") {
            return;
          }
          var response;
          if (doc.XMLDocument) {
            response = doc.XMLDocument;
          } else if (doc.body) {
            response = doc.body.innerHTML;
            if (settings.responseType && settings.responseType.toLowerCase() == 'json') {
              if (doc.body.firstChild && doc.body.firstChild.nodeName.toUpperCase() == 'PRE') {
                response = doc.body.firstChild.firstChild.nodeValue;
              }

              if (response) {
                response = eval("(" + response + ")");
              } else {
                response = {};
              }
            }
          } else {
            response = doc;
          }

          settings.onComplete.call(self, file, response);
          toDeleteFlag = true;
          iframe.src = "javascript:'<html></html>';";
        });
      },
      submit: function () {
        var self = this,
          settings = this._settings;

        if (!this._input || this._input.value === '') {
          return;
        }
        var file = fileFromPath(this._input.value);
        if (false === settings.onSubmit.call(this, file, getExt(file))) {
          this._clearInput();
          return;
        }
        var iframe = this._createIframe();
        var form = this._createForm(iframe);
        removeNode(this._input.parentNode);
        removeClass(self._button, self._settings.hoverClass);
        form.id = "file_input";
        form.appendChild(this._input);
        form.submit();
        removeNode(form);
        form = null;
        removeNode(this._input);
        this._input = null;
        this._getResponse(iframe, file);
        this._createInput();
      }









    };



    document.domain = "kdfafa.com"; //主域名，需要两边站点都设置

    var g_AjxTempDir = "http://file.kdfafa.com/Temp/"; //临时文件url
    var doAction = "http://file.kdfafa.com/fileupload.ashx"; //上传文件请求的地址
    this.action = doAction
    init_file()

    //初始化
    function init_file() {
      var inits = document.getElementsByName("upload_init");
      if (inits.length <= 0) {
        return;
      }
      var ids = document.getElementsByName("hdnID");
      var hextmasks = document.getElementsByName("upload_hextmask");
      var hmaxsizes = document.getElementsByName("upload_hmaxsize");
      var hcounts = document.getElementsByName("upload_count");
      var hunits = document.getElementsByName("upload_hunit");
      var htype = document.getElementsByName("upload_htype");

      for (var i = 0; i < ids.length; i++) {
        var prefixID = "";
        var objHextmask = hextmasks[i];
        var objHmaxsize = hmaxsizes[i];
        var objHunit = hunits[i];
        var count = parseInt(hcounts[i].value, 10);
        for (var n = 0; n < count; n++) {
          prefixID = ids[i].value + n.toString();
          var objHd = document.getElementById(prefixID + "_hid");
          var btnUp = document.getElementById(prefixID + "_btn");
          if (htype[i].value == "0") {
            var objImg = document.getElementById(prefixID + "_img");
            g_AjxUploadPic(btnUp, objImg, objHd, objHextmask.value, objHmaxsize.value, objHunit.value);
          } else {
            var objFile = document.getElementById(prefixID + "_file");
            g_AjxUploadFile(btnUp, objFile, objHd, objHextmask.value, objHmaxsize.value, objHunit.value);
          }
        }
      }
    }

    function delImg(id) {
      var objImg = document.getElementById(id + "_img");
      objImg.src = "/images/public/img_upload.jpg";
      document.getElementById(id + "_hid").value = "";
      objImg.style.cursor = "default";
      objImg.onclick = function () { };
    }

    function delFile(id) {
      document.getElementById(id + "_file").innerHTML = "";
      document.getElementById(id + "_hid").value = "";
    }

    function g_AjxUploadFile(btn, doc, hidPut, hExtMask, hMaxSize, hUnit) {
      var button = btn,
        interval;
      new AjaxUpload(button, {
        action: doAction + '?ExtMask=' + hExtMask + '&MaxSize=' + hMaxSize + '&Unit=' + hUnit,
        data: {},
        name: 'myfile',
        onSubmit: function (file, ext) {
          //			$("#text").val(file);
          //上传加载优化
          //doc.innerHTML = "<img src='/images/common/Loader.gif' />";
          //上传加载优化end
          if (!(ext && /^(xls|xlsx|XLS|XLSX)$/.test(ext))) {
            alert("您上传的文档格式不对，请选择正确的Excel文档上传！");
            return false;
          }
          window.$("#text").val(file);
        },
        onComplete: function (file, response) {
          console.log(file, response)
          window.flagValue = response;
          if (window.flagValue == "2") {
            alert("您上传的文档格式不对，请重新选择！");
          } else if (window.flagValue == "3") {
            var maxSize = "5MB";
            if (hMaxSize != "0") {
              hUnit == "" ? "KB" : hUnit;
              maxSize = hMaxSize + hUnit;
            }
            alert("您上传的文档大于" + maxSize + "，请重新选择！");
          } else if (window.flagValue == "1") {
            alert("文档检测未通过，请重新选择！");
          } else {
            hidPut.value = response;
            //doc.innerHTML = "<a href='" + g_AjxTempDir + response + "' class='g-c-b'>" + response + "</a>";

          }
        }
      });
    }

    function g_AjxUploadPic(btn, img, hidPut, hExtMask, hMaxSize, hUnit) {
      console.log(btn, img, hidPut, hExtMask, hMaxSize, hUnit)
      var button = btn,
        interval;
      new AjaxUpload(button, {
        action: doAction + '?ExtMask=' + hExtMask + '&MaxSize=' + hMaxSize + '&Unit=' + hUnit,
        data: {},
        name: 'myfile',
        onSubmit: function (file, ext) {
          if (!(ext && /^(jpg|JPG|png|PNG|gif|GIF|JPEG|jpeg)$/.test(ext))) {
            alert("您上传的图片格式不对，请重新选择！");
            return false;
          }
        },
        onComplete: function (file, response) {
          window.flagValue = response;
          if (window.flagValue == "2") {
            // alert("您上传的图片格式不对，请重新选择！");
          } else if (window.flagValue == "3") {
            var maxSize = "3MB";
            if (hMaxSize != "0") {
              hUnit == "" ? "KB" : hUnit;
              maxSize = hMaxSize + hUnit;
            }
            alert("您上传的图片大于" + maxSize + "，请重新选择！");
          } else if (window.flagValue == "1") {
            alert("图片检测未通过，请重新选择！");
          } else {
            hidPut.value = response;
            img.src = g_AjxTempDir + response;
            img.style.cursor = "pointer";
            img.onclick = function () {
              window.open(this.src);
            }
          }
        }
      });
    }














  }
  // g_AjxUploadFile(btn, doc, hidPut, hExtMask, hMaxSize, hUnit) {
  //   var button = btn,
  //     interval;

  //   new AjaxUpload(button, {
  //     action: this.action + '?ExtMask=' + hExtMask + '&MaxSize=' + hMaxSize + '&Unit=' + hUnit,
  //     data: {},
  //     name: 'myfile',
  //     onSubmit: function (file, ext) {
  //       //			$("#text").val(file);
  //       //上传加载优化
  //       //doc.innerHTML = "<img src='/images/common/Loader.gif' />";
  //       //上传加载优化end
  //       if (!(ext && /^(xls|xlsx|XLS|XLSX)$/.test(ext))) {
  //         alert("您上传的文档格式不对，请选择正确的Excel文档上传！");
  //         return false;
  //       }
  //       window.$("#text").val(file);
  //     },
  //     onComplete: function (file, response) {
  //       console.log(file, response)
  //       window.flagValue = response;
  //       if (window.flagValue == "2") {
  //         alert("您上传的文档格式不对，请重新选择！");
  //       } else if (window.flagValue == "3") {
  //         var maxSize = "5MB";
  //         if (hMaxSize != "0") {
  //           hUnit == "" ? "KB" : hUnit;
  //           maxSize = hMaxSize + hUnit;
  //         }
  //         alert("您上传的文档大于" + maxSize + "，请重新选择！");
  //       } else if (window.flagValue == "1") {
  //         alert("文档检测未通过，请重新选择！");
  //       } else {
  //         hidPut.value = response;
  //         //doc.innerHTML = "<a href='" + g_AjxTempDir + response + "' class='g-c-b'>" + response + "</a>";

  //       }
  //     }
  //   });
  // }

}

module.exports = ajaxUpload

