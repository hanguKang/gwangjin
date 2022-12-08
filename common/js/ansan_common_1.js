try {
	//$ 중첩 방지
	(function($) {
		'use strict';

		//제이쿼리가 있는지 확인
		if(typeof $ === 'function') {
			 $(function() {
				var $lnbNav = $('.lnb [data-menu-type]'),
					$lnbNavActivedText = $lnbNav.find('[data-menu-actived]'),
					lnbNavMenuType = parseInt($lnbNav.attr('data-menu-type'), 10) || 1,
					lnbNavOption = {
						cut : {},
						namespace : 'menu',
						confirm : '콘텐츠로 이동하시겠습니까?'
					};

				// $('.lnb [data-menu-type]').menu({
				//      event : 'mouse',
				//      namespace : 'lnb',
				// });


				$('.search_open_btn button').on('click.common', function(event) {
					$('body').addClass('search_active');
				});

				$('.search_close_btn button').on('click.common', function(event) {
					$('body').removeClass('search_active');
				});

				$(function(){

					 //홈
					 var home = container.home = {},
						 $home = home.$element = $('#home');

					 //search_keyword
					 var search_keyword = home.search_keyword = {},
						 $search_keyword_box = $('.search_keyword.normal'),
						 $search_keywordPrev = search_keyword.$prev = $search_keyword_box.find('.search_keyword_control .prev'),
						 $search_keywordNext = search_keyword.$next = $search_keyword_box.find('.search_keyword_control .next'),
						 $search_keywordList = $search_keyword_box.find('.slide_box');


					 $search_keywordList.slick({
						 swipe : true,
						 draggable : false,
						 slidesToShow : 3,
						 slidesToScroll: 1,
						 speed: 1000,
						 infinite: true,
						 autoplay : false,
						 prevArrow : $search_keywordPrev,
						 nextArrow : $search_keywordNext,
						 variableWidth: false,
						 dots : false,
						 arrows: true
					 });
				});

                 //동적컨트롤시
                 $(document).ajaxComplete(function() {
                     setTimeout(function(){
                         //홈
                         var home = container.home = {},
                             $home = home.$element = $('#home');

                         //search_keyword
                         var search_keyword = home.search_keyword = {},
                             $search_keyword_box = $('.search_keyword.ajax'),
                             $search_keywordPrev = search_keyword.$prev = $search_keyword_box.find('.search_keyword_control .prev'),
                             $search_keywordNext = search_keyword.$next = $search_keyword_box.find('.search_keyword_control .next'),
                             $search_keywordList = $search_keyword_box.find('.slide_box');


                         $search_keywordList.slick({
                             swipe : true,
                             draggable : false,
                             slidesToShow : 1,
                             slidesToScroll: 1,
                             speed: 1000,
                             infinite: true,
                             autoplay : false,
                             prevArrow : $search_keywordPrev,
                             nextArrow : $search_keywordNext,
                             variableWidth: false,
                             dots : false,
                             arrows: true
                         });
                     }, 200);
                 });

				$(window).on('responsive', function(event) {
					//wide, web, tablet, phone분기에 걸렸을때
					if($.inArray(event.state, event.settings.rangeProperty) > -1) {
						var menuEvent = 'click',
							menuType = 4;

						//wide 또는 web일때
						if(event.state === 'wide' || event.state === 'web') {
							menuEvent = 'mouse';
							menuType = lnbNavMenuType;
							$lnbNavActivedText.removeAttr('data-menu-actived');
						}else{
							$lnbNavActivedText.attr('data-menu-actived', '');
						}

						//현재 메뉴 이벤트와 분기에 따른 메뉴 이벤트가 다를때
						if(lnbNavOption.event !== menuEvent) {
							//메뉴 이벤트 변경
							lnbNavOption.event = menuEvent;
							if($lnbNav.length >0){
							//data-menu-type변경하고 새로운메뉴 생성 후 data-menu-type복귀
							$lnbNav.attr('data-menu-type', menuType).menu(lnbNavOption).attr('data-menu-type', lnbNavMenuType);
							}
						}
					}
				});
			 });

			 $(document).on('ready', function(event) {
				$.responsive({
					range : {
						wide : {
							horizontal : {
								from : 9999,
								to : 1281
							}
						},
						web : {
							horizontal : {
								from : 1280,
								to : 1001
							}
						},
						tablet : {
							horizontal : {
								from : 1000,
								to : 641
							}
						},
						phone : {
							horizontal : {
								from : 640,
								to : 0
							}
						}
					},
					lowIE : {
						property : 'web'
					}
				});
			 });

			$(function(){
				/*액티브 박스-공통*/
				$('.active_box button.active_btn').on('click', function() {
					var $this = $(this);
					if(!$this.hasClass('on')) {
						$this.attr('title','닫기').addClass('on').parent('.active_box').addClass('active');
					}else{
						$this.attr('title','열기').removeClass('on').parent('.active_box').removeClass('active');
					}
				});
			});
		}else{
			throw '제이쿼리가 없습니다.';
		}
	})(window.jQuery);
}catch(e) {
	console.error(e);
}



// 탭메뉴 공통적으로 사용
function tabOn(tab,num,img) {
	var $tab,$tab_btn;
	var tabid=tab, n=num-1, btn_img=img;

	$tab = $(tabid+'> ul > li');
	$tab_btn = $(tabid+'> ul > li > a');

	$tab_btn.siblings().hide();
	$tab.eq(n).addClass('active');
	$tab.eq(n).children('a').siblings().show();

	if(btn_img =='img'){
		var btn = $tab.eq(n).children('a').find("img");
		btn.attr("src",btn.attr("src").replace("_off","_on"));
	}

	$tab_btn.on("click",function(event){
		var realTarget = $(this).attr('href');

		if(realTarget != "#"){
			return
		}
		if(btn_img =='img'){
			for(var i=0;i<$tab.size();i++){
				var btn = $tab.eq(i).children('a').find("img");
				btn.attr("src",btn.attr("src").replace("_on","_off"));
			}
			var active = $(this).parent().attr('class');
			if(active != 'active'){
				var btn_img_off = $(this).find('img')[0];
				btn_img_off.src =  btn_img_off.src.replace('_off','_on');
			}
		}
		$tab_btn.siblings().hide();
		$tab_btn.parent().removeClass('active');

		$(this).siblings().show();
		$(this).parent().addClass('active');

		event.preventDefault();
	});
}

function tabOrg(tabid,a,img) {
	var $tab, $tab_btn,$obj,$obj_view;
	var tabid = tabid, num = a, btn_img = img;

	$tab = $(tabid+' .tab_item  li');
	$tab_btn = $(tabid+' .tab_item li a',tabid+' .tab_item li button');
	$obj = $(tabid+' .tab_obj');
	$obj_view = $(tabid+' .tab_obj.n'+num);

	$tab.eq(num-1).addClass('active').children('a,button').attr('title','선택됨');
	$obj_view.show();

	if(btn_img =='img'){
		var btn = $tab.eq(num-1).children('a,button').find("img");
		btn.attr("src",btn.attr("src").replace("_off","_on"));
	}

	$tab.bind("click",function(event){
		if(btn_img =='img'){
			for(var i=0;i<$tab.size();i++){
				var btn = $tab.eq(i).children('a,button').find("img");
				btn.attr("src",btn.attr("src").replace("_on","_off"));
			}
			var active = $(this).parent().attr('class');
			if(active != 'active'){
				var btn_img_off = $(this).find('img')[0];
				btn_img_off.src =  btn_img_off.src.replace('_off','_on');
			}
		}

		var this_eq = $tab.index( $(this) );
		$tab.removeClass('active').children('a,button').removeAttr('title');
		$tab.eq(this_eq).addClass('active').children('a,button').attr('title','선택됨');

		$obj.hide();
		$(tabid+' .tab_obj.n'+(this_eq+1)).show();

		event.preventDefault ();
	});
}

function tabOrg2(tabid,a,img) {
	// display:none 일 경우 레이아웃이 틀어질때 대비해서 사용
	// display:nonoe 대신  visibility 사용함.
	// 지도 api가 탭 콘텐츠에 있을경우 주로 사용
	// 
	var $tab, $tab_btn,$obj,$obj_view;
	var tabid = tabid, num = a, btn_img = img;

	$tab = $(tabid+' .tab_item  li');
	$tab_btn = $(tabid+' .tab_item li a',tabid+' .tab_item li button');
	$obj = $(tabid+' .tab_obj');
	$obj_view = $(tabid+' .tab_obj.n'+num);

	$tab.eq(num-1).addClass('active').children('a,button').attr('title','선택됨');
	$obj.css({"visibility": "visible", "height": 0});
	$obj_view.css({"visibility": "visible", "height": "auto"});


	if(btn_img =='img'){
		var btn = $tab.eq(num-1).children('a').find("img");
		btn.attr("src",btn.attr("src").replace("_off","_on"));
	}

	$tab.bind("click",function(event){
		if(btn_img =='img'){
			for(var i=0;i<$tab.size();i++){
				var btn = $tab.eq(i).children('a').find("img");
				btn.attr("src",btn.attr("src").replace("_on","_off"));
			}
			var active = $(this).parent().attr('class');
			if(active != 'active'){
				var btn_img_off = $(this).find('img')[0];
				btn_img_off.src =  btn_img_off.src.replace('_off','_on');
			}
		}

		var this_eq = $tab.index( $(this) );
		$tab.removeClass('active').children('a,button').removeAttr('title');
		$tab.eq(this_eq).addClass('active').children('a,button').attr('title','선택됨');

		$obj.css({"visibility": "visible", "height": 0});
		$(tabid+' .tab_obj.n'+(this_eq+1)).css({"visibility": "visible", "height": "auto"});

		event.preventDefault ();
	});
}