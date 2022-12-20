try {
	(function($) {
		'use strict';



		//제이쿼리가 있을 때
		if(typeof $ === 'function') {

			//사이드메뉴
			// $(function() {
			// 	$('.side_menu .menu').menu({
			// 		cut : {},
			// 		event : 'click',
			// 		namespace : 'side'
			// 	});
			// });

			//네비게이션 페이지별로 active
			$(()=>{
				//spotNavActive('.menu_item a');
			});
			// (function () {
				
			// 	spotNavActive('.menu_item a');
			// 	// let current = location.pathname.split('/');
			// 	// current = current[current.length-1];
			// 	// if (current === "") return;
			// 	// let menuItems = document.querySelectorAll('.menu_item a');
			// 	// for (let i = 0, len = menuItems.length; i < len; i++) {
			// 	// 		if (menuItems[i].getAttribute("href").indexOf(current) !== -1) {
			// 	// 				//menuItems[i].className += "active";
			// 	// 				menuItems[i].parentElement.classList.add("active"); //각 페이지 현재url에 해당하는 a요소의 부모 li
			// 	// 				//menuItems[i].parentElement.parentElement //최하단 li요소의 부모 ul요소
			// 	// 				//menuItems[i].parentElement.parentElement.parentElement //최하단 li요소의 부모 ul요소의 부모 li요소
			// 	// 				if(!menuItems[i].parentElement.parentElement.parentElement) return; 
			// 	// 				menuItems[i].parentElement.parentElement.parentElement.classList.add("active");
			// 	// 		}
			// 	// }
			// })();
			/* sub 페이지 lnb관련 */
			/* lnb 관련 */
			$('#lnb .dep2 > li ').each(function () {
				if ($(this).hasClass('active')) { 
						$(this).children('.dep3').slideDown(200);
				}
			});

			//lnb dep2클릭시
			$(document).on('click', '#lnb .dep2>li>a', function (e) {
				e.preventDefault();
				let _this = this; 
				makeDropDownNav( _this );
			});

			//input 파일첨부
			var $fileBox = null;
  
			$(function() {
				init_file();
			});
			

			
			function init_file() {
				$fileBox = $('.input_file');
				fileLoad();
			}

			function fileLoad() {
				$.each($fileBox, function(idx){
					var $this = $fileBox.eq(idx),
							$btnUpload = $this.find('[type="file"]'),
							$label = $this.find('.file_label');
					
					
					$btnUpload.on('change', function() {
						var $target = $(this),
								fileName = $target.val(),
								$fileText = $target.siblings('.file_name');
						$fileText.val(fileName);
					})
					
					$btnUpload.on('focusin focusout', function(e) {
						
						e.type == 'focusin' ? $label.addClass('file_focus') : $label.removeClass('file_focus');
					})
					
				})
			}


			//sns공유
			$(function(){
				
				// 공유아이콘 틀릭 열기/닫기 이벤트
				$('.share button').on('click', function(e) {
					console.log(e.target);
					e.preventDefault();
					$('.share').addClass('active');
				});

				$('.share_close').on('click', function(e) {
					e.preventDefault();
					$('.share').removeClass('active');
				});

				// SNS 아이콘 별 이벤트 추가
				$(".share_box a").click(function(){

					let elmId = $(this).attr("id");

					// 해당 페이지 URL
					// let snsShareURL = document.querySelector("meta[property='og:url']").content;
					let snsShareURL = location.href;

					// 해당페이지 제목
					let text = $(".sub > .sub1 >.sub_title").text();
					let description = '광진구시설관리공단';
					let href = "";

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
						fnKakaoLink(text,description);
					} else if ( elmId=="share_popup_story"){
						fnKakaoStoryLink(text,description);
					}


				});

				function fnKakaoLink(txt, description){
					let snsShareURL = location.href;
					Kakao.Link.sendDefault({
					  objectType: 'feed',
					  content: {
						title: txt,
						description: description,
						imageUrl: '../../common/images/logo.png',
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

				function fnKakaoStoryLink(txt){

					let snsShareURL = location.href;

					Kakao.Story.share({
					  url: snsShareURL,
					  text: txt,
					});
				}
			});






			//테이블
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

			//약도
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

			
			//프린트
			$(function(){
				$('.print_btn>a').on('click',(e)=>{
					//alert(1234);
					e.preventDefault();
					window.print();
				});
			});

		}else{
			throw '제이쿼리가 없습니다.';
		}
	})(window.jQuery);
}catch(e) {
	console.error(e);
}