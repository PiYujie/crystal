define(["jquery","swiper"],function(){
	function init(){
		 var mySwiper = new Swiper ('.swiper-container', {
		 	//水平vertical horizontal
		    direction: 'horizontal',
		    loop: true,
		    autoplay:3000,
		    // 如果需要分页器
		    pagination: '.swiper-pagination',
		    paginationClickable:true,
		    autoplayDisableOnInteraction:false,
		    
		    // 如果需要前进后退按钮
		    nextButton: '.swiper-button-next',
		    prevButton: '.swiper-button-prev',
		  })        
	}
	return {
		init:init
	}
})