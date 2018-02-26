define(["jquery","cookie"],function(){
	function init(){
		//数据添加
		$(function(){
			var id = location.href.split('?')[1];
			if(id){
				id = id.split('#')[0];
				addDate(id);
			}
			
		})
	}
	return {
		init:init
	}
	function addDate(id){
		var strBig = '';//商品左侧图片-大-显示
		var strSma = '';//商品左侧图片-小-显示
		var strPic = '';
		var strDet = '';//详细信息显示
		var strCho = '';//详细信息显示并选择
		var idNum = 0;
		
		//获取cookie
		if($.cookie('cart')){
			var obj = JSON.parse($.cookie('cart')); 
			for(var i in obj){
				if(i==id){
					idNum = obj[i];
				}
			}
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
								if(id==data[i][j][k][l].id){
									strBig = '<img src="../'+data[i][j][k][l].img.img1+'"/><em></em><p id="big"><img src="../'+data[i][j][k][l].img.img1+'"/></p>';
									for(var w in data[i][j][k][l].smallpic){
										strSma += '<li><img src="../'+data[i][j][k][l].smallpic[w]+'"/></li>'
									}
									for(var v in data[i][j][k][l].img){
										strPic += '<img src="../'+data[i][j][k][l].img[v]+'"/>'
									}
									strDet = '<tr><th width="12%">宝石材质</th><td width="38%">'+data[i][j][k][l].texture+'</td><th width="12%">实际大小</th><td width="38%">'+data[i][j][k][l].size+'</td></tr><tr><th>原石产地</th><td>'+data[i][j][k][l].source+'</td><th>商品配送</th><td>精美包装盒+礼品</td></tr><tr><th>佩戴效果</th><td>'+data[i][j][k][l].effect+'</td><th>鉴定证书</th><td>暂无</td></tr><tr><th>宝石百科</th><td colspan="3">'+data[i][j][k][l].cyclopedia+'</td></tr>';
									strCho = '<h3><span>'+data[i][j][k][l].name+'</span><em>货号：'+data[i][j][k][l].id+'</em></h3><h5>'+data[i][j][k][l].describe+'</h5><ul class="goodsprops clearfix"><li><span>商品重量：</span><span id="goodsWeight">'+data[i][j][k][l].weight+'&nbsp;&nbsp;克(g)</span></li><li><span>品  牌：</span>水晶一百</li><li><span>吊坠造型：</span>平安扣</li><li><span>吊坠大小：</span>中型L</li><li><span>价格区间：</span>100-499元</li></ul><div class="detail_price"><p>市场价：<del>￥'+data[i][j][k][l].highprice+'</del></p><h3><span>本站价：<b>￥'+data[i][j][k][l].price+'</b><em>免运费</em></span>比专柜省：￥'+(data[i][j][k][l].highprice-data[i][j][k][l].price)+'</h3><p>销&ensp;&ensp;量：<span>'+data[i][j][k][l].volume+' 件</span></p><p>服&ensp;&ensp;务：从<span>江苏连云港</span> 发货并由 <span>水晶一百</span> 提供售后服务。</p><div><h4><a href="#">天然正品</a><em> | </em><a href="#">7天退换</a><em> | </em><a href="#">支持复检</a><em> | </em><a href="#">售后保障</a></h4><p><a href="#"><img src="../img/yi.gif"/></a><a href="#"><img src="../img/jing.gif"/></a><a href="#"><img src="../img/kefu_p.gif"/></a></p></div></div><div class="choose"><h2><span>款型选择：</span><div class="choose_check"><em>1</em><img src="../'+data[i][j][k][l].smallpic.pic1+'"/><b>￥'+data[i][j][k][l].price+'</b><i></i></div></h2><h2><span>数&ensp;&ensp;&ensp; 量：</span><p><input type="text" value="'+idNum+'" /><strong><input type="button" id="add"/><input type="button" id="sub"/></strong>件</p><em>( 库存 '+data[i][j][k][l].inventory+' )</em></h2><h2><a href="#" id="addCart">加入购物车</a></h2></div></div>';
									//当前位置
									$(".locat").html(data[i][j][k][l].name);
									//当前位置父级
									$(".locat").prev().html(k);
									$(".locat").prev().prev().html(j);
								}
							}
						}
					}
					
				}
				//插入
				$(".img").html(strBig);
				$(".small_pic>ul").html(strSma);
				$('#commodity>div').html(strPic);
				$('.ds_right>table').html(strDet);
				$(".detail_cont").html(strCho);
				//layer.confirm('is not?', {icon: 3, title:'提示'}, function(index){
  //do something
  
//layer.close(index);
//});
				//点击加入购物车
				$("#addCart").click(function(){
					var val = $("#addCart").parent().prev().find("input[type='text']").val();
					obj[id] = val;
					$.cookie('cart',JSON.stringify(obj));
					location.href = 'ShopCart.html';
				});
				//点击添加数量
				$("#add").click(function(){
					var val = $("#add").parent().prev().val();
					val++;
					$("#add").parent().prev().val(val);
				});
				//点击减少数量
				$("#sub").click(function(){
					var val = $("#sub").parent().prev().val();
					val--;
					if(val<=0)val=0;
					$("#sub").parent().prev().val(val);
				});
				//hover图片切换
				$(".small_pic>ul>li").mouseover(function(){
					var src = $(this).children().attr('src');
					src = src.slice(12,16);
					src = '../img/pic'+src+'.jpg';
					$(".img").find('img').attr({'src':src});
				});
				//放大镜效果
				$(".img").bind('mousemove',function(e){
					$(".img>em").css("display","block")
			    	var left = e.pageX - $(".img").offset().left - $(".img>em").width()/2;
			    	var top = e.pageY - $(".img").offset().top - $(".img>em").height()/2;
			    	if(left<=0){left=0;}
			    	if(left>=190){left=190;}
			    	if(top<=0){top=0;}
			    	if(top>=200){top=200;}
					$(".img>em").css({"left":left,"top":top})
					$("#big>img").css({"left":-5/3*left,"top":-5/3*top})
			    });
			    $(".img").bind('mouseout',function(){
					$(".img>em").css("display","none");
			    });
			}
		});
	}
})