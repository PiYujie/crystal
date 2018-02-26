define(["jquery","cookie"],function(){
	function init(){
		//数据添加
		$(function(){
			addCart();
		})
	}
	return {
		init:init
	}
	function addCart(){
		var strCart = '';//商品左侧图片-大-显示
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
//				for(var i in data[0]){
//					console.log(i,data[0][i]);
//					for(var j in data[0][i]){
//						console.log(j,data[0][i][j]);
//					}
//				}
//				//第一层遍历
				for(var i in data){
					//第二层遍历，不同的大类别
					for(var j in data[i]){
						//第三层遍历，不同小类别
						for(var k in data[i][j]){
							for(var l in data[i][j][k]){
								for(var v in obj){
//									console.log(v,data[i][j][k][l].id)
									if(v==data[i][j][k][l].id){
										strCart += '<li><p><a href="#"><img src="../'+data[i][j][k][l].img.img1+'" data-id="'+v+'"/>'+data[i][j][k][l].name+'</a></p><strong> </strong><b>￥'+data[i][j][k][l].price+'</b><em><button>-</button><input type="text" class="count" value="'+obj[v]+'" /><button>+</button></em><i>￥'+(obj[v]*data[i][j][k][l].price)+'</i><a href="##" class="del">删除</a></li>';
									}
									
								}
							}
						}
					}
					
				}
				//在购物车页面显示所有信息
				$(".shop_cont>ul").html(strCart);
				//点击减少数量
				$(".count").prev().click(function(){
					var val = $(this).next().val();
					var price = $(this).parent().prev().html();
					var this_id = $(this).parent().parent().find('img').attr('data-id');
					price = price.split('￥')[1];
					var whole = $(this).parent().next();
					val--;
					if(val<=0)val=0;
					whole.html('￥'+Number(val * price));
					$(this).next().val(val);
					getPrice();
					getNum();
					obj[this_id] = val;
					$.cookie('cart',JSON.stringify(obj)); 
				});
				//点击添加数量
				$(".count").next().click(function(){
					var val = $(this).prev().val();
					var price = $(this).parent().prev().html();
					var this_id = $(this).parent().parent().find('img').attr('data-id');
					price = price.split('￥')[1];
					var whole = $(this).parent().next();
					val++;
					whole.html('￥'+Number(val * price));
					$(this).prev().val(val);
					getPrice();
					getNum();
					obj[this_id] = val;
					$.cookie('cart',JSON.stringify(obj));
				});
				//点击删除
				$(".del").click(function(){
					var delId = $(this).parent().find('img').attr('data-id');
					delete obj[delId];
					$.cookie('cart',JSON.stringify(obj)); 
					$(this).parent().remove();
					getNum();
				});
				//获得总价
				getPrice();
				getNum();
				//点击清空购物车
				$(".settle>a").click(function(){
					obj = {};
					$.cookie('cart',JSON.stringify(obj));
					$(".shop_cont>ul").html(' ');
					getNum();
					getPrice();
				});
				
			}
		});
	}
	function getPrice(){
		var gep = $(".shop_cont>ul>li");
		var money = 0;
		$.each( gep, function(i, n){
		  var cont = $(gep[i]).find('i').html().split('￥')[1];
		  money += Number(cont);
		});
		$(".settle").find('b').html('￥'+money);
	}
	function getNum(){
		var count = $(".count");
		var num = 0;
		$.each(count, function(i, n){
		  num += Number($(count[i]).val());
		  
		});
		$(".cont_title>p>em").html(num);
	}
})