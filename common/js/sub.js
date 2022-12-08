try {
	(function($) {
		'use strict';

		if(typeof $ === 'function') {

			//사이드메뉴
			$(function() {
				$('.side_menu .menu').menu({
					cut : {},
					event : 'click',
					namespace : 'side'
				});
			});

			//sns공유
			$(function(){

				// 공유아이콘 틀릭 열기/닫기 이벤트
				$('.share_open button').on('click', function(event) {
					$('.share').addClass('share_active');
				});

				$('.share_close button').on('click', function(event) {
					$('.share').removeClass('share_active');
				});

				// SNS 아이콘 별 이벤트 추가
				$(".share_content a").click(function(){

					var elmId = $(this).attr("id");

					// 해당 페이지 URL
					// var snsShareURL = document.querySelector("meta[property='og:url']").content;
					var snsShareURL = location.href;

					// 해당페이지 제목
					var text = $("#sub01 > div.sub_visual > div > div > div.sub_title > h2").text();

					var href = "";

					if( elmId == "share_popup_twitter" || elmId == "share_popup_facebook" || elmId == "share_popup_band"){
						if( elmId == "share_popup_twitter"){
							href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) + "&url="+ encodeURIComponent(snsShareURL);
						} else if ( elmId == "share_popup_facebook"){
							href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(snsShareURL);
						} else if ( elmId == "share_popup_band"){
							href = "http://share.naver.com/web/shareView.nhn?url=" +  encodeURIComponent(snsShareURL) + "&title=" + encodeURIComponent(text);
						}
						window.open(href, "blogShare", "width=400, height=450, scrollbars=yes, resizable=yes");
					} else if ( elmId=="share_popup_kko"){
						fnKakaoLink();
					} else if ( elmId=="share_popup_story"){
						fnKakaoStoryLink();
					}


				});

				function fnKakaoLink(){
					var snsShareURL = location.href;
					Kakao.Link.sendDefault({
					  objectType: 'feed',
					  content: {
						title: '안산시 코로나19 대응 지원시책',
						description: '#안산시#코로나19대응지원시책',
						imageUrl: 'http://www.ansan.go.kr/site/www/images/popup/as_logo.png',
						link: {
						  mobileWebUrl: snsShareURL,
						  webUrl: snsShareURL
						}
					  },
					  buttons: [
						{
						  title: '자세히 보기',
						  link: {
							mobileWebUrl: snsShareURL,
							webUrl: snsShareURL
						  }
						}
					  ]
					});
				}

				function fnKakaoStoryLink(){

					var snsShareURL = location.href;

					Kakao.Story.share({
					  url: snsShareURL,
					  text: '#안산시#코로나19대응지원시책'
					});
				}
			});

			$(function() {
				$('table.table.responsive').not($('.prettyprint').children()).each(function() {
					var RowSpanExist = $(this).find('td, th').is('[rowspan]'),
						TheadExist = $(this).find('thead').length;
					if((RowSpanExist==false) && (TheadExist!=0)){//rowspan이 없을 경우만 실행 (rowspan이 있으면 지원불가)
						$(this).children('tbody').children('tr').find('th, td').each(function() {
							var ThisIndex = $(this).index(),
								TheadText = $(this).parents('tbody').siblings('thead').find('th').eq(ThisIndex).text();
							$(this).attr('data-content', TheadText);
						});
						$(this).children('tfoot').children('tr').find('th, td').each(function() {
							var ThisIndex = $(this).index(),
								TheadText = $(this).parents('tfoot').siblings('thead').find('th').eq(ThisIndex).text();
							$(this).attr('data-content', TheadText);
						});
					};
				});
			});

			$(function(){
				$('.temp_map_btn').on('click', function(event) {
					if($('.temp_map_img').hasClass("open")) {
						$('.temp_map_img').removeClass("open");
						$(this).text("약도보기");
					} else {
						$('.temp_map_img').addClass("open");
						$(this).text("약도닫기");
					}
				});
				var
					home = $('#container'),
					temp_ruins = home.temp_ruins = {},
					$temp_ruins_box = $('.temp_ruins'),
					$temp_ruinsPrev = $temp_ruins_box.find('.temp_ruins_control .prev'),
					$temp_ruinsNext  = $temp_ruins_box.find('.temp_ruins_control .next'),
					$temp_ruinsCurrent = $temp_ruins_box.find('.temp_ruins_control .current'),
					$temp_ruinsTotal = $temp_ruins_box.find('.temp_ruins_control .total'),
					$temp_ruinsList = $temp_ruins_box.find('.slide_box');

				$temp_ruinsList.slick({
					swipe : true,
					draggable : false,
					slidesToShow : 1,
					slidesToScroll: 1,
					speed: 1100,
					infinite: true,
					autoplay : false,
					variableWidth: false,
					dots : false,
					arrows: true,
					playText : '재생',
					pauseText : '정지',
					prevArrow : $temp_ruinsPrev,
					nextArrow : $temp_ruinsNext,
					current : $temp_ruinsCurrent,
					total : $temp_ruinsTotal,
					responsive: [
						{
							breakpoint: 1280,
							settings: {
								draggable : true,
								variableWidth: false
							}
						}
					]
				});
			});

		}else{
			throw '제이쿼리가 없습니다.';
		}
	})(window.jQuery);
}catch(e) {
	console.error(e);
}