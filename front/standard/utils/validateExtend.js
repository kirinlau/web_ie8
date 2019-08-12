module.exports=function (jQuery){
  var rule={
		// email: {
		// 	pattern: /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/,
		// 	msg: '必须是正确的邮件地址'
		// },
		plusdecimal: {
			pattern: /(^\d+)(\.\d+)?$/,
			msg: '必须是数字(正整数[小数])'
		},
		plusnumber: {
			pattern: /^[0-9]*$/,
			msg: '必须是数字(正整数)'
		},
		decimal: {
			pattern: /(^-?\d+)(\.\d+)?$/,
			msg: '必须是数字(正负(整数)小数)'
		},
		number: {
			pattern: /^[+-]?[0-9]*$/,
			msg: '必须是数字'
		},
		thenzero: {
			pattern: /^\+?[1-9]\d*$/,
			msg: '必须是大于零的整数'
		},
		url: {
			pattern: "^((https|http|ftp|rtsp|mms)?://)" + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + "(([0-9]{1,3}.){3}[0-9]{1,3}" + "|" + "([0-9a-z_!~*'()-]+.)*" + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." + "[a-z]{2,6})" + "(:[0-9]{1,4})?" + "((/?)|" + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$",
			msg: '网址输入有误'
		},
		mobile: {
			pattern: /^1[3|5|7|8][0-9]{9}$/,
			msg: '手机号码错误'
		},
		tel: {
			pattern: /^(((?:[\+0]\d{1,3}-[1-9]\d{1,2})|\d{3,4})-)?\d{5,8}$|^1[3|5|7|8][0-9]{9}$/,
			msg: '电话号码格式不对'
		},
		ExpNo: { //运单编号
			pattern: /^[0-9|a-z|A-Z]{7,}$/,
			msg: '字母或数字且大于6位'
		},
		CExpNo: { //运单编号
			pattern: /^[^ ][0-9]{5,}$/,
			msg: '请输入正确的运单号'
		},
		user: { //运单编号
			pattern: /^[^ ][0-9]{5,}$/,
			msg: '请输入正确的运单号'
		},
		// 银行卡号 运单编号
		cardNumber: {
			pattern: /^[0-9|a-z|A-Z]*$/,
			msg: '必须是字母或数字'
		}
  }
  for(let key in rule){
    jQuery.validator.addMethod(key, function(value, element) {
      return this.optional(element) || rule[key].pattern.test(value);
    }, rule[key].msg);   
  }
}


