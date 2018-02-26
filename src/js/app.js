require(["config"],function(){
	require(["jquery","cookie","swiper","banner","header","footer","home","bracelet","detail","shopcart","login"],function(jquery,cookie,swiper,banner,header,footer,home,bracelet,detail,shopcart,login){
		banner.init()
		header.init()
		footer.init()
		home.init()
		bracelet.init()
		detail.init()
		shopcart.init()
		login.init()
	})
});

