define(["jquery"],function(){
	function init(){
		//数据添加
		$(function(){
			findDate();
		})
	}
	return {
		init:init
	}
	function findDate(){
		var bStop = false;
		//登录验证
		$("#userName").blur(function(){
			var val = $(this).val();
			if(val.length==0){
				bStop = false;
				$("#userName").next().css({"display":"block"});
				$("#userName").next().html("用户名不可为空！");
			}else{
				if(/[a-zA-Z0-9]{5,10}/.test(val)){
					bStop = true;
					$("#userName").next().css({"display":"none"});
				}else{
					$("#userName").next().css({"display":"block"});
					$("#userName").next().html("用户名不合法！");
				}
			}
		});
		//注册验证
		$("#passWord").blur(function(){
			var val = $(this).val();
			var b = $("#passWord").next().next().next();
			console.log(b)
			if(val.length==0){
				bStop = false;
				b.css({"display":"block"});
				b.html("密码不可为空！");
			}else{
				if(/[a-zA-Z0-9]{5,10}/.test(val)){
					bStop = true;
					b.css({"display":"none"});
				}else{
					b.css({"display":"block"});
					b.html("密码不合法！");
				}
			}
		});
	}
})