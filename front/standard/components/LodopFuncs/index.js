const BaseComponent = require('../BaseComponent')
require("./index.less");
class LodopFuncs extends BaseComponent {
  constructor() {
    super()
    this.init();
  }

  init() {
    
    var _this = this;
    var CreatedOKLodop7766 = null;

    //====判断是否需要安装CLodop云打印服务器:====
    function needCLodop() {

      try {
        var ua = navigator.userAgent;
        if (ua.match(/Windows\sPhone/i) != null) return true;
        if (ua.match(/iPhone|iPod/i) != null) return true;
        if (ua.match(/Android/i) != null) return true;
        if (ua.match(/Edge\D?\d+/i) != null) return true;

        var verTrident = ua.match(/Trident\D?\d+/i);
        var verIE = ua.match(/MSIE\D?\d+/i);
        var verOPR = ua.match(/OPR\D?\d+/i);
        var verFF = ua.match(/Firefox\D?\d+/i);
        var x64 = ua.match(/x64/i);
        if ((verTrident == null) && (verIE == null) && (x64 !== null))
          return true;
        else
          if (verFF !== null) {
            verFF = verFF[0].match(/\d+/);
            if ((verFF[0] >= 42) || (x64 !== null)) return true;
          } else
            if (verOPR !== null) {
              verOPR = verOPR[0].match(/\d+/);
              if (verOPR[0] >= 32) return true;
            } else
              if ((verTrident == null) && (verIE == null)) {
                var verChrome = ua.match(/Chrome\D?\d+/i);
                if (verChrome !== null) {
                  verChrome = verChrome[0].match(/\d+/);
                  if (verChrome[0] >= 42) return true;
                };
              };
        return false;
      } catch (err) {
        return true;
      };
    };

    //====页面引用CLodop云打印必须的JS文件：====
    if (needCLodop()) {
      var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
      var oscript = document.createElement("script");
      oscript.src = "http://localhost:8000/CLodopfuncs.js?priority=1";
      head.insertBefore(oscript, head.firstChild);

      //引用双端口(8000和18000）避免其中某个被占用：
      oscript = document.createElement("script");
      oscript.src = "http://localhost:18000/CLodopfuncs.js?priority=0";
      head.insertBefore(oscript, head.firstChild);
    };

    //====获取LODOP对象的主过程：====
    function getLodop(oOBJECT, oEMBED) {
      var ss = 0;
      var strHtml = "";
      var strHtmInstall = "<font color='#808080'>打印控件未安装!<br/>点击这里<a href='http://wdb.kdfafa.com/Lodop/install_lodop32.exe' target='_self'>下载安装</a>,安装后请刷新页面或重新进入。</font>";
      var strHtmUpdate = "<font color='#808080'>打印控件需要升级!<br/>点击这里<a href='http://wdb.kdfafa.com/Lodop/install_lodop32.exe' target='_self'>下载升级</a>,升级后请重新进入。</font>";
      var strHtm64_Install = "<font color='#808080'>打印控件未安装!<br/>点击这里<a href='http://wdb.kdfafa.com/Lodop/install_lodop64.exe' target='_self'>下载安装</a>,安装后请刷新页面或重新进入。</font>";
      var strHtm64_Update = "<font color='#808080'>打印控件需要升级!<br/>点击这里<a href='http://wdb.kdfafa.com/Lodop/install_lodop64.exe' target='_self'>下载升级</a>,升级后请重新进入。</font>";
      var strHtmFireFox = "<font color='#808080'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font><br/>";
      var strHtmChrome = "<font color='#808080'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font><br/>";
      var strCLodopInstall = "<font color='#808080'>您还没有安装电子面单打印控件,<br/>点击这里<a href='http://wdb.kdfafa.com/Lodop/CLodop_Setup_for_Win32NT.exe' target='_self'>下载安装</a>,<span style='color:red'>安装后请刷新页面。</span></font>";
      var strCLodopUpdate = "<font color='#808080'>CLodop云打印服务需升级!<br/>点击这里<a href='http://wdb.kdfafa.com/Lodop/CLodop_Setup_for_Win32NT.exe' target='_self'>下载升级</a>,升级后请刷新页面。</font>";

      try {
        var isIE = (navigator.userAgent.indexOf('MSIE') >= 0) || (navigator.userAgent.indexOf('Trident') >= 0);
        if (needCLodop()) {
          try {
            LODOP = getCLodop(oOBJECT, oEMBED);
          } catch (err) { };
          if (!LODOP && document.readyState !== "complete") {

            return;
          };
          if (!LODOP) {
            if (isIE) {
              console.log(strCLodopInstall)
              window.$("#_m-pop-kj").show();
              window.$(".kj-u-but-l a").attr("href", "http://wdb.kdfafa.com/Lodop/CLodop_Setup_for_Win32NT.exe");
              return false;

            } else {
              strHtml = strCLodopInstall + strHtml;
              console.log(strHtml)
              window.$("#_m-pop-kj").show();
              window.$(".kj-u-but-l a").attr("href", "http://wdb.kdfafa.com/Lodop/CLodop_Setup_for_Win32NT.exe");
              return false;

            }

            return;
          } else {

            if (CLODOP.CVERSION < "3.0.6.0") {
              if (isIE) {
                console.log(strCLodopUpdate)
                window.$("#_m-pop-kj").show();
                window.$(".kj-u-but-l a").attr("href", "http://wdb.kdfafa.com/Lodop/CLodop_Setup_for_Win32NT.exe");
                return false;
              } else {
                strHtml = strCLodopUpdate + strHtml;
                console.log(strHtml);
                window.$("#_m-pop-kj").show();
                window.$(".kj-u-but-l a").attr("href", "http://wdb.kdfafa.com/Lodop/CLodop_Setup_for_Win32NT.exe");
                return false;
              }

            };
            if (oEMBED && oEMBED.parentNode) oEMBED.parentNode.removeChild(oEMBED);
            if (oOBJECT && oOBJECT.parentNode) oOBJECT.parentNode.removeChild(oOBJECT);
          };
        } else {
          var is64IE = isIE && (navigator.userAgent.indexOf('x64') >= 0);
          //=====如果页面有Lodop就直接使用，没有则新建:==========
          if (oOBJECT != undefined || oEMBED != undefined) {
            if (isIE) LODOP = oOBJECT;
            else LODOP = oEMBED;
          } else if (CreatedOKLodop7766 == null) {
            LODOP = document.createElement("object");
            LODOP.setAttribute("width", 0);
            LODOP.setAttribute("height", 0);
            LODOP.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;");
            if (isIE) LODOP.setAttribute("classid", "clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
            else LODOP.setAttribute("type", "application/x-print-lodop");
            document.documentElement.appendChild(LODOP);
            CreatedOKLodop7766 = LODOP;
          } else LODOP = CreatedOKLodop7766;
          //=====Lodop插件未安装时提示下载地址:==========
          if ((LODOP == null) || (typeof (LODOP.VERSION) == "undefined")) {
            if (navigator.userAgent.indexOf('Chrome') >= 0) {
              strHtml = strHtmChrome + strHtml;
              //console.log(strHtml)
              //$("#_m-pop-kj").show();
              return false;

            }

            if (navigator.userAgent.indexOf('Firefox') >= 0) {
              strHtml = strHtmFireFox + strHtml;
              console.log(strHtml)
              window.$("#_m-pop-kj").show();
              window.$(".kj-text").html("注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它");
              window.$(".kj-but").hide();
              return false;
            }

            if (is64IE) {
              //alert(strHtm64_Install);
              window.$("#_m-pop-kj").show();
              window.$(".kj-u-but-l a").attr("href", "http://wdb.kdfafa.com/Lodop/install_lodop64.exe");
              return false;
            } else if (isIE) {
              console.log(strHtmInstall)
              window.$("#_m-pop-kj").show();
              window.$(".kj-u-but-l a").attr("href", "http://wdb.kdfafa.com/Lodop/install_lodop32.exe");
              return false;
            } else {
              strHtml = strHtmInstall + strHtml;
              console.log(strHtml)
              window.$("#_m-pop-kj").show();
              window.$(".kj-u-but-l a").attr("href", "http://wdb.kdfafa.com/Lodop/install_lodop32.exe");
              return false;
            }

            return LODOP;
          };
        };
        console.log(LODOP)
        if (LODOP.VERSION < "6.2.1.7") {
          if (needCLodop()) {
            strHtml = strCLodopUpdate + strHtml;
            console.log(strHtml)
            window.$("#_m-pop-kj").show();
            window.$(".kj-u-but-l a").attr("href", "http://wdb.kdfafa.com/Lodop/CLodop_Setup_for_Win32NT.exe");
            return false;
          } else
            if (is64IE) {
              console.log(strHtm64_Update)
              window.$("#_m-pop-kj").show();
              window.$(".kj-text").html("系统检测到您的打印控件需要升级，如未下载，请点击下载控件。如已安装，请启动后刷新页面");
              window.$(".kj-u-but-l a").attr("href", "http://wdb.kdfafa.com/Lodop/install_lodop64.exe");
              return false;

            } else {
              if (isIE) {
                console.log(strHtmUpdate)
                window.$("#_m-pop-kj").show();
                window.$(".kj-text").html("系统检测到您的打印控件需要升级，如未下载，请点击下载控件。如已安装，请启动后刷新页面");
                window.$(".kj-u-but-l a").attr("href", "http://wdb.kdfafa.com/Lodop/install_lodop32.exe");
                return false;
              } else {
                strHtml = strHtmUpdate + strHtml;
                console.log(strHtml)
                window.$("#_m-pop-kj").show();
                window.$(".kj-text").html("系统检测到您的打印控件需要升级，如未下载，请点击下载控件。如已安装，请启动后刷新页面");
                window.$(".kj-u-but-l a").attr("href", "http://wdb.kdfafa.com/Lodop/install_lodop32.exe");
                return false;
              }
            }

          return LODOP;
        };
        //===如下空白位置适合调用统一功能(如注册语句、语言选择等):===
        LODOP.SET_LICENSES("深圳市快金数据技术服务有限公司", "23E5EE3B666B5E5613985A63B0DBE0D3", "深圳市快金數據技術服務有限公司", "D736BB5B8CAE499924D4C317BA45F8EE");
        LODOP.SET_LICENSES("THIRD LICENSE", "", "ShenZhen Kuaijin Data Technology Service Co.,Ltd.", "C950EAA1BA64F44E0366CDEE055224EA");
        //===========================================================
        return LODOP;
      } catch (err) {
        console.log("getLodop出错:" + err)
        ss = 1;
        //$("body").append("getLodop出错:" + err);
      };

    };
    function myPreview() {
     
    };
    //打印开始
    this.BatchSubSucess = function BatchSubSucess(PrintTemplate) {
      //看看有木有打印控件啦
      try {
        LODOP = getLodop();
      } catch (err) {
        T.alert("初始化打印出错，请重试");
        return false;
      }
      var topNum = 0 + "mm";
      var leftNum = 0 + "mm";
      var toplong = 0;
      var leflong = 0;
      //打印的值 和 纸张尺寸
      var _PaperName = window.$("#dayinji").val();
      var _PrintIndex = window.$("#printing-size").val();
      LODOP.PRINT_INITA(topNum, leftNum, 100, 1680, _PaperName);
      LODOP.SET_SHOW_MODE("BKIMG_IN_PREVIEW", 1);
      LODOP.SET_SHOW_MODE("BKIMG_WIDTH", 100);
      LODOP.SET_SHOW_MODE("BKIMG_HEIGHT", 1680);
      LODOP.SET_SHOW_MODE("BKIMG_PRINT", 1);
      LODOP.SET_PRINT_STYLE("FontSize", 12);
      LODOP.SET_PRINT_PAGESIZE(1, 0, 0, _PaperName);
      LODOP.SET_PRINTER_INDEX(_PrintIndex);
      LODOP.NewPage();
      LODOP.ADD_PRINT_HTM(topNum, leftNum, 100, 1680, PrintTemplate);
      LODOP.PREVIEW();

    }

    var LODOP;
    //初始化， 加载打印机属性
    this.demo = function inits() {
      LODOP = getLodop();
      if (LODOP != undefined) {
        return true;
      } else {
        return false;
      }
    }
    //加载打印机 和 纸张属性
    this.init_pz = function init_pz() {
      window.$("#printing-size").html("");
      window.$("#dayinji").html("");
      for (var i = 0; i < LODOP.GET_PRINTER_COUNT(); i++) {
        window.$("#dayinji").append("<option value='" + i + "'>" + LODOP.GET_PRINTER_NAME(i) + "</option>")
      }
      var strList = LODOP.GET_PAGESIZES_LIST(0, ",");
      var pageSizeList = strList.split(",");
      for (var i = 0; i < pageSizeList.length; i++) {
        window.$("#printing-size").append('<option value="' + pageSizeList[i] + '">' + pageSizeList[i] + '</option>');
      }

      window.$("#dayinji").change(function () {
        window.$("#printing-size").html("");
        var eq = window.$(this).val();
        var strList = LODOP.GET_PAGESIZES_LIST(eq, ",");
        var pageSizeList = strList.split(",");
        for (var i = 0; i < pageSizeList.length; i++) {
          window.$("#printing-size").append('<option value="' + pageSizeList[i] + '">' + pageSizeList[i] + '</option>');
        }
      })
    }
//return inits();


  }





}
module.exports = LodopFuncs

