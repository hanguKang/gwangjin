
var elFocus, headH;
function initMoving(target, position, topLimit, btmLimit) {
  if (!target)
    return false;

  var obj = target;
  obj.initTop = position;
  obj.topLimit = topLimit;
  obj.bottomLimit = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - btmLimit - obj.offsetHeight;

  obj.style.position = "absolute";
  obj.top = obj.initTop;
  // obj.left = obj.initLeft;

  if (typeof (window.pageYOffset) == "number") {   //WebKit
    obj.getTop = function () {
      return window.pageYOffset;
    }
  } else if (typeof (document.documentElement.scrollTop) == "number") {
    obj.getTop = function () {
      return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    }
  } else {
    obj.getTop = function () {
      return 0;
    }
  }

  if (self.innerHeight) { //WebKit
    obj.getHeight = function () {
      return self.innerHeight;
    }
  } else if (document.documentElement.clientHeight) {
    obj.getHeight = function () {
      return document.documentElement.clientHeight;
    }
  } else {
    obj.getHeight = function () {
      return 500;
    }
  }

  obj.move = setInterval(function () {
    if (obj.initTop > 0) {
      pos = obj.getTop() + obj.initTop;
    } else {
      pos = obj.getTop() + obj.getHeight() + obj.initTop;
      //pos = obj.getTop() + obj.getHeight() / 2 - 15;
    }

    if (pos > obj.bottomLimit)
      pos = obj.bottomLimit;
    if (pos < obj.topLimit)
      pos = obj.topLimit;

    interval = obj.top - pos;
    obj.top = obj.top - interval / 3;
    obj.style.top = obj.top + "px";
  }, 30)
}

function tabResizing1() {
  function tabRow() {//active li의 높이를 구하고 tab_box 높이 설정
    var tabConH = $('.tab_row').find('.active > div').outerHeight();
    var tabH = $('.tab_row').find('li').outerHeight();
    $('.tab_row').height(tabConH + tabH);
  }
  $('.tab_row > li > button').on('click', function () {
    $(this).closest('li').addClass('active').closest('li').siblings('li').removeClass('active');
    tabRow();
  });
  $(window).on('resize load', function () {
    tabRow();
  });
  
  //탭 너비 높이 조정
  var tabH = 0;
  $('.tab_list > ul > li > a').removeAttr('style');
  $('.tab_list > ul > li').each(function () {
    if (tabH < $(this).children('a').height()) {
      tabH = $(this).children('a').height();
    }
  });
  $('.tab_list > ul > li > a').height(tabH);
  var tabLength = $('.tab_list > ul > li').length;
  $('.tab_list > ul > li').outerWidth(100 / tabLength + '%');
}
$(document).on('click', '.tab_list > ul > li > a', function (e) {
  //탭 클릭시 active
  var tab = $(this).parent('li');
  var tabIndex = tab.index();
  var tabAll = $(this).parent('li').siblings('li');
  var txt = $(this).text();
  var tabCon = $(this).closest('ul').siblings('ol');
  tabAll.removeClass('active').children('a').removeAttr('title');
  tab.addClass('active').children('a').attr('title', '선택됨');
  $(this).closest('.tab_list').removeClass('active').children('button').text(txt);
  if (tabCon.length) {
    tabCon.children('li').eq(tabIndex).addClass('active').siblings('li').removeClass('active');
  }
  e.preventDefault();
});
$(document).on('click', '.tab_list > button', function (e) {
  var tabBox = $(this).closest('.tab_list');
  if (tabBox.hasClass('active')) {
    tabBox.removeClass('active');
  } else {
    tabBox.addClass('active');
  }
});
//tab_list2
$(document).on('click', '.tab_list2 > ul > li > a', function (e) {
  //탭 클릭시 active
  var tab = $(this).parent('li');
  var tabAll = $(this).parent('li').siblings('li');
  var txt = $(this).text();
  tabAll.removeClass('active').children('a').removeAttr('title');
  tab.addClass('active').children('a').attr('title', '선택됨');
  $(this).closest('.tab_list2').removeClass('active').children('button').text(txt);


  e.preventDefault();
});
$(document).on('click', '.tab_list2 > button', function (e) {
  var tabBox = $(this).closest('.tab_list2');
  if (tabBox.hasClass('active')) {
    tabBox.removeClass('active');
  } else {
    tabBox.addClass('active');
  }
});



function pcChk(width) {
  //창크기 768px보다 크면 true 반환
  if ($(window).width() > width) {
    return true;
  } else {
    return false;
  }
}
function mChk(width) {
  //창크기 768px보다 크면 true 반환
  if ($(window).width() > width) {
    return true;
  } else {
    return false;
  }
}
function headLine(arg) {
  if (arg == 'on') {
    $('.header').addClass('active');
  } else if (arg == 'off') {
    $('.header').removeClass('active');
  }
}
function gnb3Open(target) { //
  if (pcChk(1000)) {

    var dep2H = $(target).next().outerHeight();
    // $('.header')
    //   .stop()
    //   .animate({ height: dep2H + headH + 'px' }, 150, function () {
    //     $(target).closest('li').addClass('active').closest('li').siblings('li').removeClass('active');
    //   });
    $(target).closest('li').addClass('active').siblings('li').removeClass('active');//.end().closest('li').siblings('li').removeClass('active');
    $('.header').css({'background-color':'#f2f2f2'});
   
    
    headLine('on');
  }
}
function gnb3Close() {
  if (pcChk(1000)) {
    // $('.header')
    //   .stop()
    //   .animate({ height: headH + 'px' }, 150, function () {
    //     $('.gnb > ul > li').removeClass('active');
    //     headLine('off');
    //   });
    $('.gnb>ul>li').removeClass('active');
    $('.header').css({'height':122, 'background-color':'transparent'});
    
  }
}

function openSitemap() {
  //사이트맵 gnb복사 후 열기
  $('.gnb > ul').clone().appendTo('.m_gnb>div');
  $('.m_gnb .dep2_wrap').removeAttr('style');
  $('.m_gnb').stop().fadeIn().attr('tabindex', '0').focus();
  $('.m_gnb > div > ul > li').each(function () {
    $(this).find('.dep3').closest('.dep2_wrap').parent('li').addClass('active2');
    $(this).find('.dep3').closest('li').addClass('active2');
  });
}

function closeSitemap() {
  //사이트맵 닫고 복사한 nav 지우기
  $('.m_gnb')
    .stop()
    .fadeOut(function () {
      $(this).find('ul').remove();
    })
    .removeAttr('tabindex');
}


function focusLoop() {
  //이벤트가 발생한 요소의 상위 tabindex="0"을 찾아 포커스이동
  $(event.target).closest('[tabindex="0"]').focus();
}

function saveFocus() {
  //이벤트 발생한 요소 elFocus변수에 저장
  return (elFocus = $(event.target));
}
function returnFocus() {
  //저장된 요소로 포커스 이동
  elFocus.focus();
}

function bodyScroll(arg) {
  //인자값에 따른 body 스크롤 on/off
  if (arg == 'off') {
    $('body').css('overflow', 'hidden');
  } else if (arg == 'on') {
    $('body').removeAttr('style');
  }
}
function mGnbDrop() {
  $('.m_gnb a').on('click', function () {
    if ($(this).next().length) {
      if ($(this).closest('li').hasClass('active')) {
        $(this).next().stop().slideUp().closest('li').siblings('li').children('a').next().stop().slideUp();
        $(this).closest('li').removeClass('active');
      } else {
        $(this).next().slideDown().closest('li').siblings('li').children('a').next().stop().slideUp();
        $(this).closest('li').addClass('active').siblings('li').removeClass('active');
      }
      return false;
    }
  });
}

$(function () {
  headH = $('.header').outerHeight();
  initMoving(document.getElementById("sc_1"), 200, 50, -3000);//퀵메뉴 스크롤 이동
  $('.gnb >ul > li>a').on({
    mouseenter: function () {
      //검색창이 없을때 실행
      
      if (!$('.util .btn_search_open').hasClass('active')) gnb3Open(this);
    },
    focusin: function () {
      if (!$('.util .btn_search_open').hasClass('active')) gnb3Open(this);
    },
  });
  $('.gnb > ul').on({
    mouseleave: function () {
      if (!$('.util .btn_search_open').hasClass('active')) gnb3Close();
    },
  });
  $('#gnb .dep2_wrap a')
    .last()
    .on({focusout: function () {
        gnb3Close();
      },
    });
  $('.logo>a').focus(()=>{ 
      gnb3Close();
   });
  $(document).on('click', '.btn_sitemap_open', function (e) {
    if (!pcChk(720)) {
      openSitemap(); //사이트맵 열기
      saveFocus(); //포커스 요소 저장
      bodyScroll('off');
      mGnbDrop();
      e.preventDefault();
    }
  });
  // 사이트맵 닫기
  $('.btn_sitemap_close').on({
    click: function () {
      closeSitemap(); //사이트맵닫기
      bodyScroll('on');
      returnFocus(); //이전 포커스 요소로 되돌리기
    },
    focusout: function () {
      focusLoop(); //포커스 반복
      bodyScroll('on');
    },
  });

  //lnb dep2클릭시
  $(document).on('click', '#lnb .dep2 a', function () {
    var innerMenu = $(this).next('ul');
    $(this).closest('li').toggleClass('active').siblings('li').removeClass('active').find('ul').stop().slideUp(200);
    innerMenu.stop().slideToggle(200);
    if ($(this).hasClass('menu_btn')) {
        return false;
    }
});
$('#lnb .dep2 > li a').each(function () {
    if ($(this).hasClass('active')) {
        $(this).children('.dep3').slideDown(200);
    }
});



});
$(window).on('resize load', function () {
  headH = $('.header').outerHeight();
  headLine('off');
  tabResizing1();
  closeSitemap();
  bodyScroll('on');
  $('.header').removeAttr('style');
  $('.btn_search_open').removeClass('active');
  
  if (pcChk(breakPoint)) {
    headH = $('#gnb').outerHeight(); //기본 헤더 높이 전역변수
    var gnbLeng = $('#gnb .dep1 > li').length; //gnb 너비 조정
    $('#gnb .dep1 > li').width(100 / gnbLeng + '%'); //gnb 너비 조정
    menuInit('#lnb .dep2 a');
} else {
    $('#gnb .dep1 > li').removeAttr('style'); //gnb 너비 조정
    menuInit('#gnb .dep1 a');
}
});


//검색
function openSearch() {
  $('.btn_search_open').addClass('active');
  var schBoxH = $('.search_box').outerHeight(true);
  headLine('on');
  $('.header')
    .stop()
    .animate({ height: headH + schBoxH + 'px' });
  return false;
}

function resetSearch() {
  $('.header')
    .stop()
    .animate({ height: headH + 'px' }, function () {
      $('.btn_search_open').removeClass('active');
      headLine('off');
    });
}
// $(document).on('click', function (e) {
//   if (!$(e.target).closest('.search_box').length) {
//     resetSearch();
//     bodyScroll('off');
//   }
// });
$(function () {
  
/***메인=문화공공체육시설 **/
var MainBrand = ( function(){
  var g_$listBox = $("#slide_menu .list"), // 제목 및 컨텐츠를 모두 갖고 있는 요소
      g_$listUl = g_$listBox.find("ol"), // 스크롤할 때 떠오르는 아이콘들
      /* g_swiper, */
      g_currentIdx = 0,
      g_listLen = g_$listUl.length;

      m_brandTabInner = null; 

  function init(){
      setTabSwiper();
      setBtns();
  }

  function setTabSwiper(){
      m_brandTabInner = $("#slide_menu .btns_tab_inner"); //메인> 문화 공공체육 시설, 도서관 시설, 주차 시설 제목들 합친 그룹

      m_brandTabInner.children("div:first-child").before(m_brandTabInner.children("div:last-child"));
      m_brandTabInner.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
          autoplay: false,
          variableWidth: true,
          prevArrow:$("#slide_menu .btn_tabArrow_l"),
          nextArrow:$("#slide_menu .btn_tabArrow_r"),
          dots: false
      });

      m_brandTabInner.on('beforeChange', function(event, slick, currentSlide, nextSlide){
          g_currentIdx = nextSlide;
          //console.log(g_currentIdx);
          changeGallery(g_currentIdx);
      });
      
      m_brandTabInner.on('afterChange', function(event, slick, currentSlide, nextSlide){
        var setT ;
        setT = setTimeout(function(){
          clearTimeout(setT);
         $("#slide_menu .list .tab_box .btns_tab .btns_tab_inner .slick-slide").each(function(i){ //각 제목들 : 문화 공공체육 시설, 도서관 시설, 주차 시설
              if( $("#slide_menu .list .tab_box .btns_tab .btns_tab_inner .slick-slide").eq(i).data("slick-index") == "1" ){ // 세개 제목 중 가운데 제목이라면   
                $("#slide_menu .list .tab_box .btns_tab .btns_tab_inner .slick-slide").eq(i).attr("tabindex","0");
              }else{
                $("#slide_menu .list .tab_box .btns_tab .btns_tab_inner .slick-slide").eq(i).attr("tabindex","-1");
              }
            })
        } , 200)
        
      });
  }

  function setBtns(){ //제목들 버튼 세팅하는 것 같은데. 이전 사람이 변수명 이름 보면

      //제목클릭
      //var m_$btnTab = g_$listBox.find("#slide_menu .btns_tab a"); //메인> 문화 공공체육 시설 제목들 합친 그룹 좌우 버튼 - 이전 사람이 한 것
      let m_$btnTab = $("#slide_menu .btns_tab .slide_item"); //메인> 문화 공공체육 시설 제목들 합친 그룹 
      //console.log(m_$btnTab);
      m_$btnTab.each( function(i,v ){
          //console.log(this);
          $(v).on('click', function(){
              //alert(1234);
              //var m_idx = parseInt($(this).attr("data-idx")); //이전 사람이 한 것
              var m_idx = parseInt( $(this).data("slick-index") );
              //console.log(m_idx);
              changeGallery(m_idx);
              g_currentIdx = m_idx;
          });
      });
      
      //좌우 화살표 클릭
      $('.btn_tabArrow_l').on('click', function(e){
        e.preventDefault();
        //m_brandTabInner.slick('slickPrev');
      });
      $('.btn_tabArrow_r').on('click', function(e){
        e.preventDefault();
       // m_brandTabInner.slick('slickNext');
      });
  }

  function changeGallery(_idx){
      var m_$listUl = g_$listBox.find("ol"),
          m_$countBox = g_$listBox.find("#slide_menu .tab_box .count");

      m_$listUl.removeClass("on");
      m_$listUl.eq(_idx).addClass("on");

      m_$countBox.find(".current").html(_idx+1);
      m_$countBox.find(".total").html(g_listLen);
  }

  init();

})();


$(document).ready(function(){
    $('#slide_menu .list .tab_box .btns_tab .btns_tab_inner .slide_item').on('click', function () { //#slide_menu의 제목들 좌우 버튼들
      var i = $(this).closest('li').index();
      $(this).closest('li').addClass('active').closest('li').siblings('li').removeClass('active');
      $(this).closest('.btns_tab_inner').siblings('.list_con').children('li').eq(i).addClass('active').siblings('li').removeClass('active');
    });
});

/***공단소식 **/
var MainBrand = ( function(){
  var g_$listBox = $("#new .list"),
      g_$listUl = g_$listBox.find("ol"),
      /* g_swiper, */
      g_currentIdx = 0,
      g_listLen = g_$listUl.length;

  function init(){
      setTabSwiper();
      setBtns();
  }

  function setTabSwiper(){
      var m_brandTabInner = $("#new .btns_tab_inner");

      m_brandTabInner.children("div:first-child").before(m_brandTabInner.children("div:last-child"));
      m_brandTabInner.slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
          autoplay: false,
          variableWidth: true,
          prevArrow:$("#new .btn_tabArrow_l"),
          nextArrow:$("#new .btn_tabArrow_r"),
          dots: false
      });

      m_brandTabInner.on('beforeChange', function(event, slick, currentSlide, nextSlide){
          g_currentIdx = nextSlide;
          changeGallery(g_currentIdx);
      });
      
      m_brandTabInner.on('afterChange', function(event, slick, currentSlide, nextSlide){
        var setT ;
        setT = setTimeout(function(){
          clearTimeout(setT);
         $("#new .list .tab_box .btns_tab .btns_tab_inner .slick-slide").each(function(i){
              if( $("#new .list .tab_box .btns_tab .btns_tab_inner .slick-slide").eq(i).attr("data-slick-index") == "1" ){
                $("#new .list .tab_box .btns_tab .btns_tab_inner .slick-slide").eq(i).attr("tabindex","0");
              }else{
                $("#new .list .tab_box .btns_tab .btns_tab_inner .slick-slide").eq(i).attr("tabindex","-1");
              }
            })
        } , 200)
        
      });
  }

  function setBtns(){
      var m_$btnTab = g_$listBox.find(".btns_tab a");

      m_$btnTab.on("click", function(){
          var m_idx = parseInt($(this).attr("data-idx"));

          changeGallery(m_idx);
          g_currentIdx = m_idx;
      })
  }

  function changeGallery(_idx){
      var m_$listUl = g_$listBox.find("ol"),
          m_$countBox = g_$listBox.find(".tab_box .count");

      m_$listUl.removeClass("on");
      m_$listUl.eq(_idx).addClass("on");

      m_$countBox.find(".current").html(_idx+1);
      m_$countBox.find(".total").html(g_listLen);
  }
  
  init();

})(); //공단소식 끝




$(document).ready(function(){
  $('#new .list .tab_box .btns_tab .btns_tab_inner .slide_item').on('click', function () {
    var i = $(this).closest('li').index();
    $(this).closest('li').addClass('active').closest('li').siblings('li').removeClass('active');
    $(this).closest('.btns_tab_inner').siblings('.list_con').children('li').eq(i).addClass('active').siblings('li').removeClass('active');
  });
});

  
  //radiobox
  $('.radiobox li').click(function () {
    $(this).addClass('active').siblings().removeClass('active');
  });
  // 자주묻는질문 드롭다운메뉴
  var faqBtn = $('.list_dropdown dt a');
  faqBtn.on('click', function () {
    if ($(this).closest('dt').hasClass('active')) {
      $(this).closest('dt').removeClass('active');
      $('.list_dropdown dd').slideUp();
    } else {
      $('.list_dropdown dt').removeClass('active');
      $('.list_dropdown dd').slideUp();
      $(this).closest('dt').addClass('active').next().slideDown();
    }
    return false;
  });
  $('.btn_search_open').on('click', function () {
    if (!$(this).hasClass('active')) {
      openSearch();
      bodyScroll('off');
    } else {
      resetSearch();
      bodyScroll('on');
    }
    return false;
  });


  // 메인 배너 
  var time = 3;  //자동재생 시간 설정
  var $bar, isPause, tick, percentTime;
  var slide2 = $('.banner .slide');
  
  isPause = false;
  
  $bar = null;

  function startProgressbar(idx) {
    //$bar = $('.slick-dots>li.slick-active .progress');
    $bar = $(`.swiper-pagination>button:eq(${idx})`).find('.progress');
    resetProgressbar();

    percentTime = 0;
    
    tick = setInterval(interval, 10);

  }
  function resetProgressbar() {
    clearTimeout(tick);
    $bar.closest('button').siblings().find('.progress').css('width','0%');
    $bar.css({
      width: '0%'
    });
  }

  function interval() {
    if (isPause === false) {

        percentTime++;
        //console.log(percentTime / time);
        let resultPer = percentTime / time;
        $bar.css({
          width: resultPer + "%"
        })
        
      if (percentTime >= 100 * time) { //프로그레스바가 완료되면 0.01초마다 인터벌이 되니, 100*3(time)번 이상이라면 300 이상이고 0.01초당 실행(setInterval)된다면, 300번이면 3초다. 
          //console.log('test'+( 100 * time) );
          percentTime = 100 * time;
          //slide2.slick('slickNext');
          // resetProgressbar();
          // //자동재생중인지 판단
          // $bar.closest('li').siblings('li').find('.progress').css('width','0%');
          // if( !$('.banner .pause').hasClass('play') ){ //현재 재생버튼이 보이지 않는다면, 재생 중이다. 
          //   slide2.slick('slickNext');
          // }
          console.log(!isPause);
          if(!isPause){
            swiper.autoplay.start();
          }
          
      }
    }
  }
  
  const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'custom',
			clickable: true,
      bulletActiveClass:'swiper-pagination-bullet-active',
      renderCustom:(swiper, current, total)=>{
        //console.log(swiper);

        // let cphtml = "";
        // for(let i = 0; i < total; i++) {
        //     cphtml += '<button type="button" title="'+i+'번째 배너로 이동" class="swiper-pagination-bullet '+(i == (current - 1) ? ' swiper-pagination-bullet-active' : '')+'"><span>'+current+'</span><span class="hide">슬라이드이동</span><span class="progress_bar"><span class="progress"></span></span></button>';
        // }
        // return cphtml;

        var cphtml = "";
        for(var i = 0; i < total; i++) {
          cphtml += `<button class="swiper-pagination-bullet ${i == (current - 1) ? ' swiper-pagination-bullet-active' : ''}" title="${i}번째 배너로 이동">${i+1}<span class="hide">슬라이드이동</span><span class="progress_bar"><span class="progress"></span></span></button>`;
        }
        return cphtml;

        // let html_msg = '';

        // for(let i = 1; i<= total; i++) {
        //   if( current == i ){
        //     html_msg += `<button type="button" title="${i}번째 배너로 이동" class="swiper-pagination-bullet-active">${i}<span class="hide">슬라이드이동</span><span class="progress_bar"><span class="progress"></span></span></button>`;
        //   }else{
        //     `<button type="button" title="${i}번째 배너로 이동">${i}<span class="hide">슬라이드이동</span><span class="progress_bar"><span class="progress"></span></span></button>`
        //   }
        // }
        
        // return html_msg;
      }
      // renderBullet: function (i) {
      //     return '<button type="button" title="배너 '+(i+1)+'로 이동">' + (i + 1) + '<span class="hide">슬라이드이동</span><span class="progress_bar"><span class="progress"></span></span></button>';
      //   },
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on:{
      init: () =>{ //맨처음 시작할 때 
        startProgressbar(0);
        
      },
      slideChangeTransitionStart:(sw)=>{ //슬라이드 바뀔 때
        //startProgressbar();
        let idx = $('.swiper-pagination-bullet-active').index();
        startProgressbar(idx);
      }
    },
    autoplay:{
      delay:3000,
      pauseOnMouseEnter:false,
      disableOnInteraction:false,
      waitForTransition:true,
    },

  });

   // 일시정지
   $('.banner .pause').click(function () {
      isPause = true;
      $(this).addClass('active').siblings().removeClass('active').find('span').text('자동재생 정지');//puase 버튼이 나타나고 play해라.
      swiper.autoplay.stop();
      
   });

  $('.banner .play').click(function () {
      
      isPause = false;
      $(this).addClass('active').siblings().removeClass('active').find('span').text('자동재생 시작'); //play 버튼이 나타나고 pause해라.
      swiper.autoplay.start();
  });
  
  // $('.banner .pause').click(function () {
  //   if ( $(this).hasClass('play') ) {
  //     $(this).removeClass('play').children('span').text('자동재생 정지');//puase 버튼이 나타나고 play해라.
  //     swiper.autoplayResume();
  //     isPause = false;
  //   } else {
  //     $(this).addClass('play').children('span').text('자동재생 시작'); //play 버튼이 나타나고 pause해라.
  //     swiper.autoplayPuase();
  //     isPause = true;
  //   }
  // });

  
  //startProgressbar();

  // slide2.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
  //   var i = (currentSlide ? currentSlide : 0) + 1;
  //   $(' .slide_btn .pagination_num').html('<span class="current">' + i + '</span> / ' + slick.slideCount);
  //   startProgressbar();
  // });

  // init과 reinit은 slick선언하기 전에 작성할 것
  // slide2.on('init', (slick)=>{
    
  //   startProgressbar();
  // });
  // slide2.on('reinit', (slick)=>{
    
  //   startProgressbar();
  // });
  // slide2.slick({
  //   pasueOnHover:false,
  //   variableWidth:false,
  //   autoplay: false,
  //   autoplaySpeed: 3000,
  //   slideToShow:1,
  //   cssEase: 'ease-in',
  //   infinite: true,
  //   dots: true,
  //   appendDots: $('.slide_btn .pagination_dot'),//dot 설정
  //   customPaging: function (slide, i) {
  //     return '<button type="button">' + (i + 1) + '<span class="hide">슬라이드이동</span><span class="progress_bar"><span class="progress"></span></span></button>'
  //   },
  //   prevArrow: $('.prev'),//arrow 설정
  //   nextArrow: $('.next'),//arrow 설정
  // });

  
  // slide2.on('afterChange', function(slick, currentSlide){
  // //   //console.log(slick);
  //   startProgressbar();
  // });

  //페이징 클릭시
  // $('.slick-dots').children('li').click((e)=>{ 

      
  //     //console.log($(e.target));
  //     //console.log( $(e.target).closest('li').hasClass('slick-active') );
  //     $(e.target).closest('li').siblings('li').find('.progress').css('width','0%');
  //     //$(this).siblings('li').find('.progress').css('width','100%'); this가 document객체다.

  //     startProgressbar();
  // });
  //일시정지
  // $('.banner .pause').click(function () {
  //   if ( $(this).hasClass('play') ) {
  //     $(this).removeClass('play').children('span').text('자동재생 정지');//puase 버튼이 나타나고 play해라.
  //     slide2.slick('slickPlay');
  //     isPause = false;
  //   } else {
  //     $(this).addClass('play').children('span').text('자동재생 시작'); //play 버튼이 나타나고 pause해라.
  //     slide2.slick('slickPause');
  //     isPause = true;
  //   }
  // });




  var slide1 = $('.banner2 .slide');
  slide1.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $('.banner2 .pagination_num').html('<span class="current">' + i + '</span> /&nbsp;  ' + slick.slideCount);
  });
  slide1.slick({
    autoplay: true,
    cssEase: 'ease-in',
    dots: true,
    appendDots: $('.banner2 .pagination_dot'),//dot 설정
    customPaging: function (slide, i) {
      return '<button type="button">' + (i + 1) + '번째 슬라이드로 이동</button>'
    },
    prevArrow: $('.banner2 .prev'),//arrow 설정
    nextArrow: $('.banner2 .next'),//arrow 설정
  });
  /*  $('.banner2 .pause').click(function () {
    if ($(this).hasClass('play')) { 
      $(this).removeClass('play').children('span').text('자동재생 정지');
      slide1.slick('slickPlay');
      isPause = false;
    } else {
      $(this).addClass('play').children('span').text('자동재생 시작');
      slide1.slick('slickPause');
    }
  });  */


  $slick_slider = $('.bg_con .quick ul');
  settings_slider = {
    dots: false,
    arrows: false,
    slidesToShow: 6,
    variableWidth: true,
    infinite: false,
    swipeToSlide: true,
    touchThreshold: 100,
    responsive: [
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 3,
        }
      },
    ]

  }
  slick_on_mobile($slick_slider, settings_slider);


  $('.inp_btn.file span, .file button').click(function (e) {
    $(this).siblings('input').click();
  });

/* 
  $slick_slider = $('.f_banner');
  settings_slider = {
      dots: false,
      arrows: false,
      slidesToShow: 5,
      variableWidth: true,
      infinite: false,
      swipeToSlide: true,
      touchThreshold: 100,
      responsive: [
          {
              breakpoint: 650,
              settings: {
                  slidesToShow: 5,
              },
          },
          {
              breakpoint: 540,
              settings: {
                  slidesToShow: 4,
              },
          },
          {
              breakpoint: 430,
              settings: {
                  slidesToShow: 3,
              },
          },
      ],
  }; */
  slick_on_mobile($slick_slider, settings_slider);

  //footer 배너슬라이드
  var f_banner = $('.f_banner .slide');
  if (f_banner.find('.item').length < 6) {
      for (var i = 0; i < 6; i++) {
          $('.f_banner .slide .item').eq(i).clone().appendTo('.f_banner .slide');
      }
  }
  f_banner.slick({
    variableWidth: true,
    slidesToShow: 5,
    autoplay: false,
    cssEase: 'ease-in',
    infinite: true,
    dots: false,
    touchThreshold: 100,
    accessibility: true,
    autoplaySpeed: 2000,
    prevArrow: $('.f_banner .control  .prev'), //arrow 설정 
    nextArrow: $('.f_banner .control  .next'), //arrow 설정
  });

  $('.f_banner .pause').click(function () {
    if ($(this).hasClass('play')) {
      $(this).removeClass('play').text('자동재생 정지');
      f_banner.slick('slickPlay');
    } else {
      $(this).addClass('play').text('자동재생 시작');
      f_banner.slick('slickPause');
    }
  });



});


function changeValue(obj) {
  $(obj).siblings('span').children('em').html(obj.files[0].name);
}

// slick on mobile
function slick_on_mobile(slider, settings) {
  $(window).on('load resize', function () {
    if ($(window).width() > 720) {
      if (slider.hasClass('slick-initialized')) {
        slider.slick('unslick');
      }
      return
    }
    if (!slider.hasClass('slick-initialized')) {
      return slider.slick(settings);
    }
  });
};


//data-btn 값과 동일한 모달 노출
$(document).on('click', '[data-btn]', function (event) {
  bodyScroll('off');
  var popName = $(this).data('btn');
  $('.modal_wrap[data-pop="' + popName + '"]').fadeIn();
  return false;
});

/* 팝업 on/off */
$(document).on('click', '.modal_wrap .close', function () {
  bodyScroll('on');
  $(this).closest('.modal_wrap').fadeOut();
});



