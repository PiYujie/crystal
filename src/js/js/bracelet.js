define(["jquery"],function(){
	function init(){
		//数据添加
		$(function(){
			addDate();
		})
	}
	return {
		init:init
	}
	function addDate(){
		var str = '';//商品显示
		var strNew = '';//每日新品
		var strHot = '';//水晶吊坠热卖
		var strHotNum = '';//热卖排行榜
		var n = 1;
		var num = 0;
		//获取cookie
		if($.cookie('cart')){
			var obj = JSON.parse($.cookie('cart')); 
		}else{
			var obj = {};
		}
		//获取ajax
		$.ajax({
			type:"get",
			url:"../../data.json",
			dataType:"json",
			success:function(data){
				//第一层遍历
				for(var i in data){
					//第二层遍历，不同的大类别
					for(var j in data[i]){
						//第三层遍历，不同小类别
						for(var k in data[i][j]){
							for(var l in data[i][j][k]){
								//水晶手链
								if(j=="水晶手链"){
									str += '<li><a href="#"><img src="../'+data[i][j][k][l].img.img1+'" data-id="'+data[i][j][k][l].id+'"/>'+data[i][j][k][l].name+'</a><em>￥'+data[i][j][k][l].price+' <del>￥'+data[i][j][k][l].highprice+ '</del></em><p><strong>人气：<i>'+data[i][j][k][l].popularity+'</i></strong><a href="#" class="addCart">加入购物车</a><a href="#">收藏</a></p></li>';
									//水晶吊坠热卖
									if(data[i][j][k][l].salehot){
										strHot += '<div><h4><span>'+n+'</span><a href="#">'+data[i][j][k][l].name+'</a></h4><h5><a href="#"><img src="../'+data[i][j][k][l].img.img1+'" data-id="'+data[i][j][k][l].id+'"/></a><p><em>促销：￥'+data[i][j][k][l].price+'</em><strong>销量：<i>'+data[i][j][k][l].volume+'</i>件</strong><strong>人气：<i>'+data[i][j][k][l].popularity+'</i></strong><strong>评价：<i>7</i>条</strong></p></h5></div>';
										n++;
										//热卖排行榜
//										if(data[i][j][k][l].volume>num){
//											
//										}
									}
									//如果存在每日新品表识显示
									if(data[i][j][k][l].newpro){
										strNew += '<li><a href="#"><img src="../'+data[i][j][k][l].img.img1+'" data-id="'+data[i][j][k][l].id+'"/></a><p><a href="#">'+data[i][j][k][l].name+'</a><em>售价：￥'+data[i][j][k][l].price+'</em></p></li>';
									}
								}
							}
						}
					}
					
				}
				//插入所有商品
				$(".allmess>ul").html(str);
				//每日新品
				$(".everyNew>ul").html(strNew);
				$(".everyNew>ul>li").click(function(){
					var li = $(this);
					var id = li.find("img").attr("data-id");
					location.href = 'Detail.html?'+id;
				});
				//插入水晶吊坠热卖
				strHot = '<h3>水晶吊坠热卖</h3>'+strHot;
				$(".brac_hot").html(strHot);
				$(".brac_hot>div").click(function(){
					var div = $(this);
					var id = div.find("img").attr("data-id");
					location.href = 'Detail.html?'+id;
				});
				//点击图片跳至详情页
				$(".allmess>ul>li>a").click(function(){
					var li = $(this);
					var id = li.find("img").attr("data-id");
					location.href = 'Detail.html?'+id;
				});
				//点击加入购物车
				$(".addCart").click(function(){
					var li = $(this).parent().parent();
					var id = li.find("img").attr("data-id");
					obj[id] = 1;
					$.cookie('cart',JSON.stringify(obj));
					location.href = 'ShopCart.html';
				});
			}
		});
		
		//顶部切换
		$(".introduce>h3>a").click(function(){

			$(".intro").toggle();
		});
	}
})