const BaseComponent = require('../BaseComponent')
require("./index.less");
const tpl = require("./index.ejs");
//分页
const page = require("@components/page");
class Address extends BaseComponent {
	constructor() {
		super()
		this.init()

	}

	init() {
		this.num_page = 0;
		this.num_pages = 0;
		this.add_Name = "";
		this.add_Mobile = "";
		this.add_wuliugs = "";
		//加载模版
		this.render(tpl);

		//初始绑定
		this.bangFun()
	}
	//初始绑定
	bangFun() {
		//关闭按钮
		this.closeBut();
		//弹窗地址库数据请求
		this.addressFun();
		window.json_num = 0;
		//搜索
		this.ss_kdy();
	}
	//搜索
	ss_kdy() {
		var _this = this;
		// this.add_Name = window.$("#add_Name").val();
		// this.add_Mobile= window.$("#add_Mobile").val();
		// this.add_wuliugs= window.$("#add_wuliugs").val();
		_this.$("#add_but").on("click", function() {
			_this.num_page = 0;
			_this.num_pages = 0;
			var ss_eq = _this.$(this).attr("eq");
			_this.address_jiazais(1);
		});
		_this.$(".huiche").keyup(function(event) {
			var e = (event) ? event : window.event;
			if(e.keyCode == 13) {
				_this.num_page = 0;
				_this.num_pages = 0;
				var ss_eq = _this.$(this).attr("eq");
				_this.address_jiazais(1);
			}
		});
	};
	//选择打开的寄件地址还是收件地址库
	addressFun() {
		var _this = this;
		//打开按钮事件
		this.$(".address_").on("click", (e, a) => {
			var ss = this.$.cookie('wddp_user_app_Token');
			if(ss == undefined) {
				this.$(window).trigger('show-login');
				return false;
			} else {
				//清空弹窗的搜索默认值
				this.$("#add_Name").val("");
				this.$("#add_Mobile").val("");
				this.$("#add_wuliugs").val("");
				//智能识别返回默认状态
				this.$(".ul_collection").show();
				this.$("._collection").hide();
				//判断是寄件地址还是收件地址库
				var ss = e.currentTarget.attributes;
				this.$.each(ss, (a, b) => {
					if(b.nodeValue == "0") {
						window.json_num = 0;
						this.address_jiazai(1, 1);

					} else if(b.nodeValue == "1") {
						window.json_num = 0;
						this.address_jiazai_x(1, 2);
					}
				});
			}
		});

		window.$("#modifyAddr").click(function() {
			_this.address_jiazai(1, 1);
		})

	}
	//关闭按钮事件
	closeBut() {
		window.$(".address-all .img-a").click(function() {
			window.$("#_m-pop-address").hide();
			window.$("#wrap2").show();
			window.$("#wrap3").hide();

		})

	}

	demo() {
		console.log("11111111111111111111")
	}

	//请求地址库数据
	address_jiazais(eq, list) {
		
	window.$("#wrap2").show();
	window.$("#wrap3").hide();
		console.log(window.$("#add_Mobile").val())
		var _this = this;
		this.http(this.api.GetAddressListByPage, {
			"addressType": window.$("#_m-pop-address").attr("eq"),
			"Name": window.$("#add_Name").val(),
			"Mobile": window.$("#add_Mobile").val(),
			"SearchKey": window.$("#add_wuliugs").val(),
			"allowPaging": "true",
			"pageSize": 5,
			PageIndex: eq,
		}).then(function(_date) {
			if(_date.Code == 0) {
				var ajaxData = _date.Result;
				window.$("#_m-pop-address .ul .sc").remove();
				if(ajaxData.ResultList == "" || ajaxData.ResultList == null) {
					var ss = '<li class="sc" style=" text-align: center; "><img style=" margin-top: 50px; " src="/public/standard/vendor/images/not_neirong.png" /></li>';
					window.$("#_m-pop-address .ul").append(ss);
					window.$("#_m-pop-address .ul").append('<li class="sc" style="    position: relative; padding-top:10px; text-align: center; "><span class="s-f14 f-cus fanhui_list s-color-l" style="position: absolute;left: 413px;top: -24px;    font-size: 17px;">返回列表</span></li>');
					window.$("#wrap2").hide();
					window.$(".fanhui_list").on("click", function() {
						console.log("123")
						window.$("#add_Name").val("");
						window.$("#add_Mobile").val("");
						window.$("#add_wuliugs").val("");
						window.$(".fanhui_list").hide();
						window.$("#wrap2").show();
						var ss_eq = window.$(this).attr("eq");
						
						if(ss_eq == 0) {
							_this.address_jiazais(1, 1);
						} else {
							_this.address_jiazai_x(1, 2);
						}

					});
				} else {
					window.$.each(ajaxData.ResultList, function(i, d) {
						i = i + 1;
						if(d.Company == null) {
							var Company = "";
						} else {
							var Company = d.Company;
						}
						if(window.$("#_m-pop-address").attr("eq") == 1) {
							if(d.Type == 0) {
								var moren_dagou = '<span class="add-li-tb"><label style=" margin-top: 10px; margin-left: 10px; " for="moirrengou' + i + '" class="_addresss auto_login" style=""><input checked="checked" AddressID="' + d.AddressID + '" type="checkbox" id="moirrengou' + i + '" name="auto_login" value="0" class="u-ra moren_gouxuan_js"></label></span>';
							} else {
								var moren_dagou = '<span class="add-li-tb"><label style=" margin-top: 10px; margin-left: 10px; " for="moirrengou' + i + '" class="_addresss auto_login" style=""><input AddressID="' + d.AddressID + '" type="checkbox" id="moirrengou' + i + '" name="auto_login" value="0" class="u-ra moren_gouxuan_js"></label></span>';
							}
							ss = '<li class="li sc">' +
								'<span class="add-li-ta">' + i + '</span>' +
								moren_dagou +
								'<span class="add-li-tb" id="f-dz-Name">' + d.Name + '</span>' +
								'<span class="add-li-tc" id="f-dz-Mobile">' + d.Mobile + '</span>' +
								'<span class="add-li-tc" id="f-dz-wuliu">' + Company + '</span>' +
								'<span class="add-li-te" id="f-dz-city" City="' + d.ProvinceName + "-" + d.CityName + "-" + d.AreaName + '" ProvinceName="' + d.ProvCode + '" CityName="' + d.CityCode + '" AreaName="' + d.AreaCode + '" Detail="' + d.Detail + '">' + d.ProvinceName + d.CityName + d.AreaName + d.Detail + '</span>' +
								'<span class="add-li-tf s-color-l f-cus pri_add_selsect" addressid="' + d.AddressID + '">选择</span>' +
								'</li>';
							window.$("#_m-pop-address .ul").append(ss);
						} else {
							ss = '<li class="li sc">' +
								'<span class="add-li-ta">' + i + '</span>' +
								'<span class="add-li-tb" id="f-dz-Name">' + d.Name + '</span>' +
								'<span class="add-li-tc" id="f-dz-Mobile">' + d.Mobile + '</span>' +
								'<span class="add-li-tc" id="f-dz-wuliu">' + Company + '</span>' +
								'<span class="add-li-te" id="f-dz-city" City="' + d.ProvinceName + "-" + d.CityName + "-" + d.AreaName + '" ProvinceName="' + d.ProvCode + '" CityName="' + d.CityCode + '" AreaName="' + d.AreaCode + '" Detail="' + d.Detail + '">' + d.ProvinceName + d.CityName + d.AreaName + d.Detail + '</span>' +
								'<span class="add-li-tf s-color-l f-cus pri_add_selsect">选择</span>' +
								'</li>';
							window.$("#_m-pop-address .ul").append(ss);
							window.$(".moren_node").hide();
						}

						window.$('.pageTest').html("");

					});

					// var onPagechange = function(page) {
					//   chaxun_adders(page);
					// }
					// console.log(window.num_pageadd)
					if(window.num_page == 0) {
						//总数
						var _pages = _date.Result.TotalPage;
						//调用分页
						var _pagejs = new page();

						//加载分页
						_pagejs.initfun().Page(window.$("#wrap2"), 0, _pages, 1);
						//绑定分页返回的页数 从0开始
						_pagejs.initfun().init(window.$("#wrap2"), pageChange);

						function pageChange(i) {
							var pages = i + 1;
							_this.address_jiazais(pages);
							_pagejs.initfun().Page(window.$("#wrap2"), i, _pages, 1);
						}
					}

					window.num_page++;

					window.$(".moren_gouxuan_js").on("click", function() {
						var eq = window.$(this).index(".moren_gouxuan_js");
						moren_gouxuan_js(eq);
					});
					if(list == 1) {

					} else {
						window.$("#wrap2").prepend("<span style='position:absolute; right:65px; z-index:100; top:-35px;' class='s-f14 f-cus fanhui_list s-color-l'>返回列表</span>")
						window.$(".fanhui_list").on("click", function() {
							window.$("#add_Name").val("");
							window.$("#add_Mobile").val("");
							window.$("#add_wuliugs").val("");
							window.$(".fanhui_list").hide();
							//chaxun_adders(1, 1)
							//							_this.address_jiazais(1, 1);
							var ss_eq = window.$("#add_but").attr("eq");
							if(ss_eq == 0) {
								_this.address_jiazai(1, 1);
							} else {
								_this.address_jiazai_x(1, 2);
							}

						});
					}

					//选择地址库
					window.$(".pri_add_selsect").on("click", function() {
						window.$("#batchLogin").html(window.$(this).siblings("#f-dz-Name").html() + " " + window.$(this).siblings("#f-dz-Mobile").html() + " " + window.$(this).siblings("#f-dz-wuliu").html() +
							" " + window.$(this).siblings("#f-dz-city").attr("city") + " " + window.$(this).siblings("#f-dz-city").attr("detail"));
						window.$("#batchLogin").attr("provincevalue", window.$(this).siblings("#f-dz-city").attr("provincename"));
						window.$("#batchLogin").attr("cityvalue", window.$(this).siblings("#f-dz-city").attr("cityname"));
						window.$("#batchLogin").attr("areavalue", window.$(this).siblings("#f-dz-city").attr("areaname"));
						window.$("#batchLogin").attr("addressid", window.$(this).attr("addressid"));
						if(window.$("#_m-pop-address").attr("eq") == 1) {
							//上面的地址
							//姓名
							window.$("#jj-name-a").val(window.$(this).siblings("#f-dz-Name").html());
							//手机
							window.$("#jj-phone-a").val(window.$(this).siblings("#f-dz-Mobile").html());
							window.$("#wuliu_a").val(window.$(this).siblings("#f-dz-wuliu").html())
							//市区
							window.$("#txt_SendAddress0").val(window.$(this).siblings("#f-dz-city").attr("city"));
							//具体地址
							window.$("#txt_ddress0").val(window.$(this).siblings("#f-dz-city").attr("detail"));
							//市区的code
							window.$("#txt_SendAddress0").attr("provincevalue", window.$(this).siblings("#f-dz-city").attr("provincename"));
							window.$("#txt_SendAddress0").attr("cityvalue", window.$(this).siblings("#f-dz-city").attr("cityname"));
							window.$("#txt_SendAddress0").attr("areavalue", window.$(this).siblings("#f-dz-city").attr("areaname"));
							window.$("#_m-pop-address").hide();
							window.$("#wrap2").show();
							window.$("#wrap3").hide();

						} else {
							//下面的地址

							//姓名
							window.$("#jj-name-b").val(window.$(this).siblings("#f-dz-Name").html());
							//手机
							window.$("#jj-phone-b").val(window.$(this).siblings("#f-dz-Mobile").html());
							window.$("#wuliu_b").val(window.$(this).siblings("#f-dz-wuliu").html())
							//市区
							window.$("#txt_SendAddress1").val(window.$(this).siblings("#f-dz-city").attr("city"));
							//具体地址
							window.$("#txt_ddress1").val(window.$(this).siblings("#f-dz-city").attr("detail"));
							//市区的code
							window.$("#txt_SendAddress1").attr("provincevalue", window.$(this).siblings("#f-dz-city").attr("provincename"));
							window.$("#txt_SendAddress1").attr("cityvalue", window.$(this).siblings("#f-dz-city").attr("cityname"));
							window.$("#txt_SendAddress1").attr("areavalue", window.$(this).siblings("#f-dz-city").attr("areaname"));
							window.$("#_m-pop-address").hide();
							window.$("#wrap2").show();
							window.$("#wrap3").hide();

						}
					});

				}

			} else if(_date.Code == 1) {

			} else if(_date.Code == 2) {

			}
		});
	}
	address_jiazai(num, eq) {
		window.$("#add_but").attr("eq", 0);
		console.log(num + "1111111111111111111")
		console.log(eq + "2222222222222222222")
		var _this = this;
		_this.http(_this.api.GetAddressListByPage, {
			"addressType": eq,
			"allowPaging": "true",
			"pageSize": 5,
			"pageIndex": num,
			"Name": '',
			"Mobile": '',
			"SearchKey": "",
		}).then(function(_date) {
			window.$("#_m-pop-address").attr("eq", eq);
			window.$("#_m-pop-address").show();
			var ajaxData = _date.Result;
			var z_page = ajaxData.TotalCount;
			var s_page = ajaxData.PageSize;
			window.$("#_m-pop-address .ul .sc").remove();
			window.$.each(ajaxData.ResultList, function(i, d) {
				i = i + 1;
				if(d.Company == null) {
					var Company = "";
				} else {
					var Company = d.Company;
				}
				var ss = "";

				if(eq == 1) {
					if(d.Type == 0) {
						var moren_dagou = '<span class="add-li-tb"><label style=" margin-top: 10px; margin-left: 10px; " for="moirrengou' + i + '" class="_addresss auto_login" style=""><input checked="checked" AddressID="' + d.AddressID + '" type="checkbox" id="moirrengou' + i + '" name="auto_login" value="0" class="u-ra moren_gouxuan_js"></label></span>';
					} else {
						var moren_dagou = '<span class="add-li-tb"><label style=" margin-top: 10px; margin-left: 10px; " for="moirrengou' + i + '" class="_addresss auto_login" style=""><input AddressID="' + d.AddressID + '" type="checkbox" id="moirrengou' + i + '" name="auto_login" value="0" class="u-ra moren_gouxuan_js"></label></span>';
					}
					ss = '<li class="li sc">' +
						'<span class="add-li-ta">' + i + '</span>' +
						moren_dagou +
						'<span class="add-li-tb" id="f-dz-Name">' + d.Name + '</span>' +
						'<span class="add-li-tc" id="f-dz-Mobile">' + d.Mobile + '</span>' +
						'<span class="add-li-tc" id="f-dz-wuliu">' + Company + '</span>' +
						'<span class="add-li-te" id="f-dz-city" City="' + d.ProvinceName + "-" + d.CityName + "-" + d.AreaName + '" ProvinceName="' + d.ProvCode + '" CityName="' + d.CityCode + '" AreaName="' + d.AreaCode + '" Detail="' + d.Detail + '">' + d.ProvinceName + d.CityName + d.AreaName + d.Detail + '</span>' +
						'<span class="add-li-tf s-color-l f-cus pri_add_selsect " addressid="' + d.AddressID + '">选择</span>' +
						'</li>';
					window.$("#_m-pop-address .ul").append(ss);
					window.$(".moren_node").show();
				} else {

					ss = '<li class="li sc">' +
						'<span class="add-li-ta">' + i + '</span>' +
						'<span class="add-li-tb" id="f-dz-Name">' + d.Name + '</span>' +
						'<span class="add-li-tc" id="f-dz-Mobile">' + d.Mobile + '</span>' +
						'<span class="add-li-tc" id="f-dz-wuliu">' + Company + '</span>' +
						'<span class="add-li-te" id="f-dz-city" City="' + d.ProvinceName + "-" + d.CityName + "-" + d.AreaName + '" ProvinceName="' + d.ProvCode + '" CityName="' + d.CityCode + '" AreaName="' + d.AreaCode + '" Detail="' + d.Detail + '">' + d.ProvinceName + d.CityName + d.AreaName + d.Detail + '</span>' +
						'<span class="add-li-tf s-color-l f-cus pri_add_selsect">选择</span>' +
						'</li>';
					window.$("#_m-pop-address .ul").append(ss);
					window.$(".moren_node").hide();
				}
				var _pagejs = new page();
				var _pages = _date.Result.TotalPage;
				_pagejs.initfun().Page(window.$("#wrap2"), num - 1, _pages, 1);
				if(ajaxData.ResultList.length == i) {
					console.log(eq)
					if(_this.num_page == 0) {
						//总数
						var _pages = _date.Result.TotalPage;
						//调用分页
						var _pagejs = new page();
						//加载分页
						_pagejs.initfun().Page(window.$("#wrap2"), 0, _pages, 1);
						//绑定分页返回的页数 从0开始
						_pagejs.initfun().init(window.$("#wrap2"), pageChange);

						function pageChange(qq) {
							var pages = qq + 1;
							_this.address_jiazai(pages, eq);

							_pagejs.initfun().Page(window.$("#wrap2"), qq, _pages, 1);
						}
					}
					_this.num_page++;

				}

			});
			if(num == 1) {
				//window.$(".moren_gouxuan_js").eq(0).attr("checked", true);
				//window.$(".moren_gouxuan_js").eq(0)[0].checked = true;
			}

			window.$(".moren_gouxuan_js").on("click", function() {
				var eq = window.$(this).index(".moren_gouxuan_js");
				moren_gouxuan_js(eq);
			});

			function moren_gouxuan_js(eq) {
				console.log(_this.api)
				window.$(".moren_gouxuan_js").attr("checked", false);
				//window.$(".moren_gouxuan_js").eq(eq).attr("checked", true);
				window.$(".moren_gouxuan_js").eq(eq)[0].checked = true;
				var AddressID = window.$(".moren_gouxuan_js").eq(eq).attr("addressid");

				_this.http(_this.api.SetDefaultAddress, {
					"AddressType": 1,
					"AddressID": AddressID
				}).then(function(_date) {
					if(_date.Code == 0) {
						//上面的地址
						//姓名
						window.$("#jj-name-a").val(window.$(".moren_gouxuan_js").eq(eq).parent().parent().siblings("#f-dz-Name").html());
						//手机
						window.$("#jj-phone-a").val(window.$(".moren_gouxuan_js").eq(eq).parent().parent().siblings("#f-dz-Mobile").html());
						window.$("#wuliu_a").val(window.$(".moren_gouxuan_js").eq(eq).parent().parent().siblings("#f-dz-wuliu").html())
						//市区
						window.$("#txt_SendAddress0").val(window.$(".moren_gouxuan_js").eq(eq).parent().parent().siblings("#f-dz-city").attr("city"));
						//具体地址
						window.$("#txt_ddress0").val(window.$(".moren_gouxuan_js").eq(eq).parent().parent().siblings("#f-dz-city").attr("detail"));
						//市区的code
						window.$("#txt_SendAddress0").attr("provincevalue", window.$(".moren_gouxuan_js").eq(eq).parent().parent().siblings("#f-dz-city").attr("provincename"));
						window.$("#txt_SendAddress0").attr("cityvalue", window.$(".moren_gouxuan_js").eq(eq).parent().parent().siblings("#f-dz-city").attr("cityname"));
						window.$("#txt_SendAddress0").attr("areavalue", window.$(".moren_gouxuan_js").eq(eq).parent().parent().siblings("#f-dz-city").attr("areaname"));

					}
				});

			}
			//选择地址库
			window.$(".pri_add_selsect").on("click", function() {
				window.$("#batchLogin").html(window.$(this).siblings("#f-dz-Name").html() + " " + window.$(this).siblings("#f-dz-Mobile").html() + " " + window.$(this).siblings("#f-dz-wuliu").html() +
					" " + window.$(this).siblings("#f-dz-city").attr("city") + " " + window.$(this).siblings("#f-dz-city").attr("detail"));

				window.$("#batchLogin").attr("provincevalue", window.$(this).siblings("#f-dz-city").attr("provincename"));
				window.$("#batchLogin").attr("cityvalue", window.$(this).siblings("#f-dz-city").attr("cityname"));
				window.$("#batchLogin").attr("areavalue", window.$(this).siblings("#f-dz-city").attr("areaname"));
				window.$("#batchLogin").attr("addressid", window.$(this).attr("addressid"));

				if(window.$("#_m-pop-address").attr("eq") == 1) {
					//上面的地址
					//姓名
					window.$("#jj-name-a").val(window.$(this).siblings("#f-dz-Name").html());
					//手机
					window.$("#jj-phone-a").val(window.$(this).siblings("#f-dz-Mobile").html());
					window.$("#wuliu_a").val(window.$(this).siblings("#f-dz-wuliu").html())
					//市区
					window.$("#txt_SendAddress0").val(window.$(this).siblings("#f-dz-city").attr("city"));
					//具体地址
					window.$("#txt_ddress0").val(window.$(this).siblings("#f-dz-city").attr("detail"));
					//市区的code
					window.$("#txt_SendAddress0").attr("provincevalue", window.$(this).siblings("#f-dz-city").attr("provincename"));
					window.$("#txt_SendAddress0").attr("cityvalue", window.$(this).siblings("#f-dz-city").attr("cityname"));
					window.$("#txt_SendAddress0").attr("areavalue", window.$(this).siblings("#f-dz-city").attr("areaname"));
					window.$("#_m-pop-address").hide();
					window.$("#wrap2").show();
					window.$("#wrap3").hide();

				} else {
					//下面的地址
					//姓名
					window.$("#jj-name-b").val(window.$(this).siblings("#f-dz-Name").html());
					//手机
					window.$("#jj-phone-b").val(window.$(this).siblings("#f-dz-Mobile").html());
					window.$("#wuliu_b").val(window.$(this).siblings("#f-dz-wuliu").html())
					//市区
					window.$("#txt_SendAddress1").val(window.$(this).siblings("#f-dz-city").attr("city"));
					//具体地址
					window.$("#txt_ddress1").val(window.$(this).siblings("#f-dz-city").attr("detail"));
					//市区的code
					window.$("#txt_SendAddress1").attr("provincevalue", window.$(this).siblings("#f-dz-city").attr("provincename"));
					window.$("#txt_SendAddress1").attr("cityvalue", window.$(this).siblings("#f-dz-city").attr("cityname"));
					window.$("#txt_SendAddress1").attr("areavalue", window.$(this).siblings("#f-dz-city").attr("areaname"));
					window.$("#_m-pop-address").hide();
					window.$("#wrap2").show();
					window.$("#wrap3").hide();

				}

			});

			window.$("#_m-pop-address").show();
		});
	}

	address_jiazai_x(num, eq) {
		window.$("#add_but").attr("eq", 1);
		window.$("#wrap2").hide();
		window.$("#wrap3").show();
		console.log(num + "1111111111111111111")
		console.log(eq + "2222222222222222222")
		var _this = this;
		_this.http(_this.api.GetAddressListByPage, {
			"addressType": eq,
			"allowPaging": "true",
			"pageSize": 5,
			"pageIndex": num,
			"Name": '',
			"Mobile": '',
			"SearchKey": "",
		}).then(function(_date) {
			window.$("#_m-pop-address").attr("eq", eq);
			window.$("#_m-pop-address").show();
			var ajaxData = _date.Result;
			var z_page = ajaxData.TotalCount;
			var s_page = ajaxData.PageSize;
			window.$("#_m-pop-address .ul .sc").remove();
			window.$.each(ajaxData.ResultList, function(i, d) {
				i = i + 1;
				if(d.Company == null) {
					var Company = "";
				} else {
					var Company = d.Company;
				}
				var ss = "";

				if(eq == 1) {
					if(d.Type == 0) {
						var moren_dagou = '<span class="add-li-tb"><label style=" margin-top: 10px; margin-left: 10px; " for="moirrengou' + i + '" class="_addresss auto_login" style=""><input checked="checked" AddressID="' + d.AddressID + '" type="checkbox" id="moirrengou' + i + '" name="auto_login" value="0" class="u-ra moren_gouxuan_js"></label></span>';
					} else {
						var moren_dagou = '<span class="add-li-tb"><label style=" margin-top: 10px; margin-left: 10px; " for="moirrengou' + i + '" class="_addresss auto_login" style=""><input AddressID="' + d.AddressID + '" type="checkbox" id="moirrengou' + i + '" name="auto_login" value="0" class="u-ra moren_gouxuan_js"></label></span>';
					}
					ss = '<li class="li sc">' +
						'<span class="add-li-ta">' + i + '</span>' +
						moren_dagou +
						'<span class="add-li-tb" id="f-dz-Name">' + d.Name + '</span>' +
						'<span class="add-li-tc" id="f-dz-Mobile">' + d.Mobile + '</span>' +
						'<span class="add-li-tc" id="f-dz-wuliu">' + Company + '</span>' +
						'<span class="add-li-te" id="f-dz-city" City="' + d.ProvinceName + "-" + d.CityName + "-" + d.AreaName + '" ProvinceName="' + d.ProvCode + '" CityName="' + d.CityCode + '" AreaName="' + d.AreaCode + '" Detail="' + d.Detail + '">' + d.ProvinceName + d.CityName + d.AreaName + d.Detail + '</span>' +
						'<span class="add-li-tf s-color-l f-cus pri_add_selsect " addressid="' + d.AddressID + '">选择</span>' +
						'</li>';
					window.$("#_m-pop-address .ul").append(ss);
					window.$(".moren_node").show();
				} else {

					ss = '<li class="li sc">' +
						'<span class="add-li-ta">' + i + '</span>' +
						'<span class="add-li-tb" id="f-dz-Name">' + d.Name + '</span>' +
						'<span class="add-li-tc" id="f-dz-Mobile">' + d.Mobile + '</span>' +
						'<span class="add-li-tc" id="f-dz-wuliu">' + Company + '</span>' +
						'<span class="add-li-te" id="f-dz-city" City="' + d.ProvinceName + "-" + d.CityName + "-" + d.AreaName + '" ProvinceName="' + d.ProvCode + '" CityName="' + d.CityCode + '" AreaName="' + d.AreaCode + '" Detail="' + d.Detail + '">' + d.ProvinceName + d.CityName + d.AreaName + d.Detail + '</span>' +
						'<span class="add-li-tf s-color-l f-cus pri_add_selsect">选择</span>' +
						'</li>';
					window.$("#_m-pop-address .ul").append(ss);
					window.$(".moren_node").hide();
				}
				var _pagejs = new page();
				var _pages = _date.Result.TotalPage;
				_pagejs.initfun().Page(window.$("#wrap3"), num - 1, _pages, 1);
				if(ajaxData.ResultList.length == i) {
					console.log(eq)
					if(_this.num_pages == 0) {
						//总数
						var _pages = _date.Result.TotalPage;
						//调用分页
						var _pagejs = new page();

						//加载分页
						_pagejs.initfun().Page(window.$("#wrap3"), 0, _pages, 1);
						//绑定分页返回的页数 从0开始
						_pagejs.initfun().init(window.$("#wrap3"), pageChange);

						function pageChange(qq) {
							var pages = qq + 1;
							_this.address_jiazai_x(pages, 2);
							_pagejs.initfun().Page(window.$("#wrap3"), qq, _pages, 1);
						}
					}
					_this.num_pages++;

				}

			});
			if(num == 1) {
				//window.$(".moren_gouxuan_js").eq(0).attr("checked", true);
				//window.$(".moren_gouxuan_js").eq(0)[0].checked = true;
			}

			window.$(".moren_gouxuan_js").on("click", function() {
				var eq = window.$(this).index(".moren_gouxuan_js");
				moren_gouxuan_js(eq);
			});

			function moren_gouxuan_js(eq) {
				console.log(_this.api)
				window.$(".moren_gouxuan_js").attr("checked", false);
				//window.$(".moren_gouxuan_js").eq(eq).attr("checked", true);
				window.$(".moren_gouxuan_js").eq(eq)[0].checked = true;
				var AddressID = window.$(".moren_gouxuan_js").eq(eq).attr("addressid");

				_this.http(_this.api.SetDefaultAddress, {
					"AddressType": 1,
					"AddressID": AddressID
				}).then(function(_date) {
					if(_date.Code == 0) {
						//上面的地址
						//姓名
						window.$("#jj-name-a").val(window.$(".moren_gouxuan_js").eq(eq).parent().parent().siblings("#f-dz-Name").html());
						//手机
						window.$("#jj-phone-a").val(window.$(".moren_gouxuan_js").eq(eq).parent().parent().siblings("#f-dz-Mobile").html());
						window.$("#wuliu_a").val(window.$(".moren_gouxuan_js").eq(eq).parent().parent().siblings("#f-dz-wuliu").html())
						//市区
						window.$("#txt_SendAddress0").val(window.$(".moren_gouxuan_js").eq(eq).parent().parent().siblings("#f-dz-city").attr("city"));
						//具体地址
						window.$("#txt_ddress0").val(window.$(".moren_gouxuan_js").eq(eq).parent().parent().siblings("#f-dz-city").attr("detail"));
						//市区的code
						window.$("#txt_SendAddress0").attr("provincevalue", window.$(".moren_gouxuan_js").eq(eq).parent().parent().siblings("#f-dz-city").attr("provincename"));
						window.$("#txt_SendAddress0").attr("cityvalue", window.$(".moren_gouxuan_js").eq(eq).parent().parent().siblings("#f-dz-city").attr("cityname"));
						window.$("#txt_SendAddress0").attr("areavalue", window.$(".moren_gouxuan_js").eq(eq).parent().parent().siblings("#f-dz-city").attr("areaname"));

					}
				});

			}
			//选择地址库
			window.$(".pri_add_selsect").on("click", function() {
			
				if(window.$("#_m-pop-address").attr("eq") == 1) {
					//上面的地址
					//姓名
					window.$("#jj-name-a").val(window.$(this).siblings("#f-dz-Name").html());
					//手机
					window.$("#jj-phone-a").val(window.$(this).siblings("#f-dz-Mobile").html());
					window.$("#wuliu_a").val(window.$(this).siblings("#f-dz-wuliu").html())
					//市区
					window.$("#txt_SendAddress0").val(window.$(this).siblings("#f-dz-city").attr("city"));
					//具体地址
					window.$("#txt_ddress0").val(window.$(this).siblings("#f-dz-city").attr("detail"));
					//市区的code
					window.$("#txt_SendAddress0").attr("provincevalue", window.$(this).siblings("#f-dz-city").attr("provincename"));
					window.$("#txt_SendAddress0").attr("cityvalue", window.$(this).siblings("#f-dz-city").attr("cityname"));
					window.$("#txt_SendAddress0").attr("areavalue", window.$(this).siblings("#f-dz-city").attr("areaname"));
					window.$("#_m-pop-address").hide();
					window.$("#wrap2").show();
					window.$("#wrap3").hide();

				} else {
					//下面的地址
					//姓名
					window.$("#jj-name-b").val(window.$(this).siblings("#f-dz-Name").html());
					//手机
					window.$("#jj-phone-b").val(window.$(this).siblings("#f-dz-Mobile").html());
					window.$("#wuliu_b").val(window.$(this).siblings("#f-dz-wuliu").html())
					//市区
					window.$("#txt_SendAddress1").val(window.$(this).siblings("#f-dz-city").attr("city"));
					//具体地址
					window.$("#txt_ddress1").val(window.$(this).siblings("#f-dz-city").attr("detail"));
					//市区的code
					window.$("#txt_SendAddress1").attr("provincevalue", window.$(this).siblings("#f-dz-city").attr("provincename"));
					window.$("#txt_SendAddress1").attr("cityvalue", window.$(this).siblings("#f-dz-city").attr("cityname"));
					window.$("#txt_SendAddress1").attr("areavalue", window.$(this).siblings("#f-dz-city").attr("areaname"));
					window.$("#_m-pop-address").hide();
					window.$("#wrap2").show();
					window.$("#wrap3").hide();

				}

			});

			window.$("#_m-pop-address").show();
		});
	}

	//关闭地址库弹窗
	addressHide() {
		window.$("#_m-pop-address").hide();
		window.$("#wrap2").show();
		window.$("#wrap3").hide();

	}
	//显示地址库弹窗
	addressShow() {
		window.$("#_m-pop-address").show();
	}

}
module.exports = Address