const BaseComponent = require('../BaseComponent')
require("./index.less");
//const tpl = require("./index.ejs");
//1，点击便签
//2，地址类型固定2
//3,input便签
//4，弹窗的标签
//new tripleAddress(window.$("#txt_SendAddress0"), 2, 'txt_SendAddress0', 'hd_SendAddress0');
class tripleAddress extends BaseComponent {
  constructor(val_) {
    super()
    this.init(arguments)
    this.addressFun(arguments)
  }
  init(val_) {
    //this.render(tpl);
  }

  addressFun(val_) {
    var _this = this;
    function doCallbackFn(fn, args) {
      fn.apply(this, args);
    }
    var City = {};
    City.showType = -1; //显示样式:0-省,1-市,2-区
    City.hideBtn = 0; //隐藏确定按钮:1-隐藏，其他不隐藏
    City.FnName = null; //回调函数
    City.ProvinceText = "";
    City.ProvinceValue = "";
    City.CityText = "";
    City.CityValue = "";
    City.AreaText = "";
    City.AreaValue = "";
    City.ChoiceTextID = "";
    City.ChoiceValueID = "";
    City.namespace = function (str) {
      var arr = str.split("."),
        o = City;
      for (var i = (arr[0] == "City") ? 1 : 0; i < arr.length; i++) {
        o[arr[i]] = o[arr[i]] || {};
        o = o[arr[i]];
      }
    }


    // //=====城市选择=====
    City.namespace("Ct");
    //切换城市
    City.Ct.CitySwitch = function () {
      window.$("#div_area > ul > li:eq(0) > span").each(function (index) {
        window.$(this).click(function () {
          window.$(this).addClass("cu").siblings().removeClass("cu");
          window.$("#div_area > ul >li:eq(1) > div:eq(" + index + ")").removeClass("g-d-n").siblings(":not(p)").addClass("g-d-n");
        })
      });
    }

    City.Ct.SetCitySwitch = function (index) {
      window.$("#div_area > ul > li:eq(0) > span:eq(" + index + ")").addClass("cu").siblings().removeClass("cu");
      window.$("#div_area > ul >li:eq(1) > div:eq(" + index + ")").removeClass("g-d-n").siblings(":not(p)").addClass("g-d-n");
    }

    //弹出选择区域:showType显示样式:0-省,1-市,2-区
    City.Ct.CityOpen = function (showType, textID, valueID, hideBtn, fnName) {
      //window.$(".city-sheng").off()
      var ev = window.event || arguments.callee.caller.arguments[0];;
      if (ev && ev.stopPropagation) {
        ev.stopPropagation();
      } else if (window.event) {
        window.event.cancelBubble = true; //兼容IE
      }
      City.ChoiceTextID = textID;
      City.ChoiceValueID = valueID;
      City.hideBtn = hideBtn;
      City.FnName = fnName;
      City.ProvinceText = "";
      City.ProvinceValue = "";
      City.CityText = "";
      City.CityValue = "";
      City.AreaText = "";
      City.AreaValue = "";
      if (City.showType == showType) {
        window.$("#div_area").css("display", "block");
        window.$("#area_county").text('');
        window.$("#area_city").text('');
        City.Ct.SetCitySwitch(0);

        var tb = window.$("#" + textID);
        var h = tb.height() + 3;
        var citybox = window.$("#div_area");

        var boxy = tb.offset().top;
        var boxx = tb.offset().left;

        citybox.css({
          "top": (boxy + h) + "px",
          "left": boxx + "px"
        });
      } else {
        var obj = window.$("#div_area");
        if (obj) {
          obj.remove();
        }
        City.showType = showType;

        function sparam(param) {
          param.SearchType = 0;
          return param;
        };

        _this.http(_this.api.area, {
        }).then(function (result) {
          var result = result.Result;
          if (result) {
            var buffer = new City.Ct.StringBuffer();
            buffer.append("<div class='g-city' id='div_area' >");
            //<a href=\"javascript:City.Ct.CityClose();\" class='city-close'><i class='fa fa-close'></i></a>
            buffer.append("<ul><li class='city-head'>");
            //菜单
            //buffer.append("<span class='city-title cu'>常用</span>");
            buffer.append("<span class='city-title cu'>省份</span>");
            if (showType > 0)
              buffer.append("<span class='city-title'>城市</span>");
            if (showType > 1)
              buffer.append("<span class='city-title'>区县</span>");
            buffer.append("</li><li class='city-con'>");
            //常用
            //                    buffer.append("<div>");
            //                    buffer.append("<a href='javascript:;' onclick=\"City.Ct.GetCity('div_area',this,3,3)\" class='city-item' citycode='0' cityname='北京' >常用</a>");
            //                    buffer.append("<a href=\"javascript:;\" class='city-item'>常用</a>");
            //                    buffer.append("</div>");class='g-d-n'
            //省
            buffer.append("<div >");

            buffer.append("<div class='g-p-r'>");
            //buffer.append("<span class='g-p-a city-firstletter'><div class='city-f-AZ'>A-G</div><div class='city-f-AZ'>H-K</div><div class='city-f-AZ'>L-S</div><div class='city-f-AZ'>T-Z</div></span>");
            buffer.append("<div class='city-citycon'>");
            for (var i = 0; i < result.length; i++) {
              if (showType == 0)
                buffer.append("<a href=\"javascript:;\" AreaName='" + result[i]["AreaName"] + "' AreaCode='" + result[i]["AreaCode"] + "'  class=\"city-item city-sheng\" id=\"p_" + result[i]["AreaCode"] + "\">" + result[i]["AreaName"] + "</a>");
              else {
                buffer.append("<a href=\"javascript:;\" AreaName='" + result[i]["AreaName"] + "' AreaCode='" + result[i]["AreaCode"] + "' val_city='1' class=\"city-item city-sheng\" id=\"p_" + result[i]["AreaCode"] + "\">" + result[i]["AreaName"] + "</a>");
              }
            }
            buffer.append("</div>");
            buffer.append("</div>");
            buffer.append("</div>");
            //市
            if (showType > 0) {
              buffer.append("<div class='g-d-n' id='area_city'></div>");
            }
            //区
            if (showType > 1) {
              buffer.append("<div class='g-d-n' id='area_county'></div>");
            }

            if (City.hideBtn == 1) {

            } else {
              buffer.append("<p class=\"g-ta-r\"><a href=\"javascript:;\" class=\"g-btn g-btn-default sanlian_btn size-MINI radius\">确认</a></p>");
            }

            buffer.append("</li></ul>");

            buffer.append("</div>");
            window.$(document.body).append(buffer.toString());
            City.Ct.CitySwitch();
            var tb = window.$("#" + textID);
            var h = tb.height() + 3;
            var citybox = window.$("#div_area");

            var boxy = tb.offset().top;
            var boxx = tb.offset().left;

            citybox.css({
              "top": (boxy + h) + "px",
              "left": boxx + "px"
            });

            window.$(".sanlian_btn").click(function(){
              City.Ct.SetCity();
            })
            window.$(".city-sheng").click(function () {
              var AreaName = window.$(this).attr("AreaName");
              var val_city = window.$(this).attr("val_city");
              var AreaCode = window.$(this).attr("AreaCode");
              if (val_city == undefined) {
                City.Ct.GetCity(AreaName, AreaCode);
              } else {
                City.Ct.GetCity(AreaName, "1", AreaCode);
              }

            })
          }

        });


      }

    }





    City.Ct.CityClose = function () {
      window.$("#div_area").css("display", "none");
    }

    City.Ct.GetCity = function (text, areaType, provinceID, cityID) {



      window.$("#area_county").text('');
      if (areaType == 1) {
        City.ProvinceText = text;
        City.ProvinceValue = provinceID;
        window.$("#area_city").text('');
        cityID = provinceID;

        var ss = {
          provinceID: cityID,
          searchType: areaType
        };

      } else if (areaType == 2) {

        City.CityText = text;
        City.CityValue = cityID;
        var ss = {
          provinceID: provinceID,
          cityID: cityID,
          searchType: areaType
        };
      }
      _this.http(_this.api.area, {
        provinceID: provinceID,
        cityID: cityID,
        searchType: areaType
      }).then(function (result) {
        var result = result.Result;
        if (result) {
          var buffer = new City.Ct.StringBuffer();
          buffer.append("<div class='g-p-r'>");
          //buffer.append("<span class='g-p-a city-firstletter'>A-G</span>");
          buffer.append("<div class='city-citycon'>");

          for (var i = 0; i < result.length; i++) {
            if (areaType == 1) { //市
              if (City.showType > 1) //显示样式:0-省,1-市,2-区

                buffer.append("<a href=\"javascript:;\" provinceID='" + provinceID + "' AreaName='" + result[i]["AreaName"] + "' val_city='2' AreaCode='" + result[i]["AreaCode"] + "' class=\"city-item city-shi\" id=\"c_" + result[i]["AreaCode"] + "\">" + result[i]["AreaName"] + "</a>");
              else
                buffer.append("<a href=\"javascript:;\" AreaName='" + result[i]["AreaName"] + "'  AreaCode='" + result[i]["AreaCode"] + "' class=\"city-item city-shi\" id=\"c_" + result[i]["AreaCode"] + "\">" + result[i]["AreaName"] + "</a>");
            } else if (areaType == 2) { //县
              buffer.append("<a href=\"javascript:;\" AreaName='" + result[i]["AreaName"] + "'  AreaCode='" + result[i]["AreaCode"] + "' class=\"city-item city-qu\" id=\"a_" + result[i]["AreaCode"] + "\">" + result[i]["AreaName"] + "</a>");
            }
          }
          buffer.append("</div>");
          buffer.append("</div>");
          if (areaType == 1)
            window.$("#area_city").append(buffer.toString());
          else if (areaType == 2)
            window.$("#area_county").append(buffer.toString());

          if (areaType == 1 && City.showType > 0) //0 - 省, 1 - 市, 2 - 区
          {
            City.Ct.SetCitySwitch(1);
          }
          else if (areaType == 2 && City.showType > 1) {
            City.Ct.SetCitySwitch(2);
            window.$(".city-qu").click(function () {
              var AreaName = window.$(this).attr("AreaName");
              var AreaCode = window.$(this).attr("AreaCode");
              City.Ct.SetCity(AreaName, AreaCode)
            })
          }


          window.$(".city-shi").click(function () {
            var AreaName = window.$(this).attr("AreaName");
            var val_city = window.$(this).attr("val_city");
            var AreaCode = window.$(this).attr("AreaCode");
            var provinceID_ = window.$(this).attr("provinceID");
            if (val_city == undefined) {
              City.Ct.GetCity(AreaName, AreaCode);
            } else {
              City.Ct.GetCity(AreaName, "2", provinceID_, AreaCode);
            }

          })
        }

        window.$(".city-item").on("click", function () {
          var val = window.$("#txt_SendAddress0").attr("AreaValue");
          if (val != "") {
            window.$("#txt_SendAddress0").removeClass("error");
            window.$("#txt_SendAddress0").parent().parent().siblings(".f-erro-li-print").html("");
          }
        })
      });

      // window.$.ajax({
      //   type: "GET",
      //   url: get_url.area_node,
      //   async: true,
      //   data:ss,
      //   success: function(result) {

      //   },
      // });


    }

    City.Ct.SetCity = function (text, value) {
      if (text)
        City.AreaText = text;
      if (value)
        City.AreaValue = value;

      var choiceText = City.ProvinceText;
      var choiceValue = City.ProvinceValue;

      window.$("#" + City.ChoiceTextID).attr("ProvinceValue", City.ProvinceValue);
      window.$("#" + City.ChoiceTextID).attr("CityValue", City.CityValue);
      window.$("#" + City.ChoiceTextID).attr("AreaValue", City.AreaValue);
      if (City.CityText) {
        choiceText += "-" + City.CityText;
        choiceValue += "," + City.CityValue;
      }
      if (City.AreaText) {
        choiceText += "-" + City.AreaText;
        choiceValue += "," + City.AreaValue;
      }
      window.$("#" + City.ChoiceTextID).val(choiceText);
      window.$("#" + City.ChoiceValueID).val(choiceValue);
      window.$(".city-shi").off()
      window.$(".city-qu").off()
      City.Ct.CityClose();
      if (City.FnName) {
        doCallbackFn(City.FnName, [choiceText, choiceValue]);
      }
    }
    City.Ct.StringBuffer = function () {
      this.__strings__ = [];
    }
    City.Ct.StringBuffer.prototype.append = function (str) {
      this.__strings__.push(str);
    };
    City.Ct.StringBuffer.prototype.toString = function () {
      return this.__strings__.join('');
    };
    // //循环判断当前点击区域是否在此范围，不在时隐藏
    window.$(document).bind('click', function (e) {
      var e = e || window.event; //浏览器兼容性 
      var elem = e.target || e.srcElement;
      while (elem) { //循环判断至跟节点，防止点击的是div子元素
        if (elem.id && elem.id == 'div_area') {
          return;
        }
        elem = elem.parentNode;
      }
      window.$('#div_area').css('display', 'none');
      window.$(".city-shi").off()
      window.$(".city-qu").off()
    });









    val_[0].click(function () {
      City.Ct.CityOpen(val_[1], val_[2], val_[3])
    })
  }


}

module.exports = tripleAddress

