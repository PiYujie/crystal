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
		var strNew = '';//每日新品
		var strHot = '';//热荐单品
		var strPur = '';//限时抢购
		var str1F = '';//1F开运水晶
		var str2F = '';//2F水晶手链
		var str3F = '';//3F水晶吊坠
		var str4F = '';//4F戒指耳饰
		var str5F = '';//5F水晶摆件
		var str6F = '';//特价热卖
		var n = 2;var n1=0;
		var n2=0;var n3=0;var n4=0;var n5=0;
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
								//如果存在每日新品表识显示
								if(data[i][j][k][l].newpro){
									strNew += '<li><a href="#"><img src="'+data[i][j][k][l].img.img1+'" data-id="'+data[i][j][k][l].id+'"/><em>'+data[i][j][k][l].name+'</em><p><span>本站：<b>￥'+data[i][j][k][l].price+'</b></span><del>￥'+data[i][j][k][l].highprice+'</del></p></a></li>';
								}
								//如果存在推荐标识
								if(data[i][j][k][l].recommend){
									strHot = '<a href="#"><img src="'+data[i][j][k][l].img.img1+'" data-id="'+data[i][j][k][l].id+'"/><em>'+data[i][j][k][l].name+'</em><p><span>抢购</span><b>￥'+data[i][j][k][l].price+'</b><del>￥'+data[i][j][k][l].highprice+'</del></p></a>';
								}
								//限时抢购
								if(n>0){
									strPur += '<li><a href="#"><img src="'+data[i][j][k][l].img.img1+'" data-id="'+data[i][j][k][l].id+'"/><em>'+data[i][j][k][l].name+'</em><p><span>抢购</span><b>￥'+data[i][j][k][l].price+'</b><del>￥'+data[i][j][k][l].highprice+'</del></p></a></li>';
									n--;
								}
								//1F开运水晶
								if(n1<6){
									str1F += '<li><a href="#"><img src="'+data[i][j][k][l].img.img1+'" data-id="'+data[i][j][k][l].id+'"/><em>'+data[i][j][k][l].name+'</em><p><span>本站：</span><b>￥'+data[i][j][k][l].price+'</b><del>￥'+data[i][j][k][l].highprice+'</del></p></a></li>';
									n1++;
								}
								//2F水晶手链
								if(j=="水晶手链"&&n2<6){
									str2F += '<li><a href="#"><img src="'+data[i][j][k][l].img.img1+'" data-id="'+data[i][j][k][l].id+'"/><em>'+data[i][j][k][l].name+'</em><p><span>本站：</span><b>￥'+data[i][j][k][l].price+'</b><del>￥'+data[i][j][k][l].highprice+'</del></p></a></li>';
									n2++;
								}
								//3F
								if(j=="水晶项链"&&n3<6){
									str3F += '<li><a href="#"><img src="'+data[i][j][k][l].img.img1+'" data-id="'+data[i][j][k][l].id+'"/><em>'+data[i][j][k][l].name+'</em><p><span>本站：</span><b>￥'+data[i][j][k][l].price+'</b><del>￥'+data[i][j][k][l].highprice+'</del></p></a></li>';
									n3++;
								}
								//4F
								if(j=="戒指耳饰"&&n4<6){
									str4F += '<li><a href="#"><img src="'+data[i][j][k][l].img.img1+'" data-id="'+data[i][j][k][l].id+'"/><em>'+data[i][j][k][l].name+'</em><p><span>本站：</span><b>￥'+data[i][j][k][l].price+'</b><del>￥'+data[i][j][k][l].highprice+'</del></p></a></li>';
									n4++;
								}
								//5F
								if(j=="水晶摆件"&&n5<6){
									str5F += '<li><a href="#"><img src="'+data[i][j][k][l].img.img1+'" data-id="'+data[i][j][k][l].id+'"/><em>'+data[i][j][k][l].name+'</em><p><span>本站：</span><b>￥'+data[i][j][k][l].price+'</b><del>￥'+data[i][j][k][l].highprice+'</del></p></a></li>';
									n5++;
								}
								//特价热卖
								if(data[i][j][k][l].salehot){
									str6F += '<li><a href="#"><img src="'+data[i][j][k][l].img.img1+'" data-id="'+data[i][j][k][l].id+'"/><em>'+data[i][j][k][l].name+'</em><p><span>本站：</span><b>￥'+data[i][j][k][l].price+'</b><del>￥'+data[i][j][k][l].highprice+'</del></p></a></li>';
								}
							}
						}
						
						
					}
					
				}
				//插入每日新品
				$(".newr_cont>ul").html(strNew);
				//插入热荐单品
				$(".reco_left>div").html(strHot);
				//插入限时抢购
				$(".reco_right>ul").html(strPur);
				//插入1F
				$(".flo1>div>ul").html(str1F);
				//插入2F
				$(".flo2>div>ul").html(str2F);
				//插入3F
				$(".flo3>div>ul").html(str3F);
				//插入4F
				$(".flo4>div>ul").html(str4F);
				//插入5F
				$(".flo5>div>ul").html(str5F);
				//特价热卖
				$(".flohot>div>ul").html(str6F);
				//点击图片跳至详情页
//				console.log($(".newr_cont>ul>li"));
				$(".newr_cont>ul>li").click(function(){
					var li = $(this);
					var id = li.find("img").attr("data-id");
					location.href = 'html/Detail.html?'+id;
				});
				//点击热荐单品下的图片跳转页面
				$(".reco_left>div").click(function(){
					var li = $(this);
					var id = li.find("img").attr("data-id");
					location.href = 'html/Detail.html?'+id;
				});
				//点击限时抢购
				$(".reco_right>ul>li").click(function(){
					var li = $(this);
					var id = li.find("img").attr("data-id");
					location.href = 'html/Detail.html?'+id;
				});
				//点击楼层图片
				$(".floor>div>ul>li").click(function(){
					var li = $(this);
					var id = li.find("img").attr("data-id");
					location.href = 'html/Detail.html?'+id;
				});
				
			}
		});
			
	}
})