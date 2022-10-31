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
function gnb3Open(target) {
  if (pcChk(1000)) {
    var dep2H = $(target).next().outerHeight();
    $('.header')
      .stop()
      .animate({ height: dep2H + headH + 'px' }, 150, function () {
        $(target).closest('li').addClass('active').closest('li').siblings('li').removeClass('active');
      });
    headLine('on');
  }
}
function gnb3Close() {
  if (pcChk(1000)) {
    $('.header')
      .stop()
      .animate({ height: headH + 'px' }, 150, function () {
        $('.gnb > ul > li').removeClass('active');
        headLine('off');
      });
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
    .on({
      focusout: function () {
        gnb3Close();
      },
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

  //푸터 슬라이드배너
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
  };



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
    autoplay: true,
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



  $(document).on('click', '.lnb ul > li > a', function (e) {
    $('.lnb .sns').removeClass('active');
    $('.lnb .sns > div').stop().slideUp();
    if ($(this).closest('li').hasClass('active')) {
      $('.lnb ul > li').removeClass('active');
      $('.lnb ul > li > ol').stop().slideUp();
    } else {
      $(this).next().stop().slideDown().closest('li').addClass('active').siblings('li').removeClass('active').children('ol').stop().slideUp();
    }
    return false;
  });
  $(document).on('click', function (e) {
    $('.lnb ul > li').removeClass('active');
    $('.lnb ul > li > ol').stop().slideUp();
    if ($(e.target).closest('.lnb .sns > a').length) {//sns 슬라이드
      if ($(e.target).closest('.lnb .sns').hasClass('active')) {
        $(e.target).next().stop().slideUp().closest('.sns').removeClass('active');
      } else {
        $(e.target).next().stop().slideDown().closest('.sns').addClass('active');
      }
      return false;
    } else {
      $('.lnb .sns').removeClass('active');
      $('.lnb .sns > div').stop().slideUp();
    }
  });
  var fs_i = 0;
  //글자크기 조절
  $('.fs_up').on('click', function () {
    if (fs_i > 1) { return false; }
    var text = $('.sub > .container :nth-child(n)');
    text.each(function () {
      var fontSize = $(this).css('fontSize');
      var num = parseFloat(fontSize);
      num += 1;
      $(this).css('fontSize', num + 'px');
    });
    fs_i += 1;
  });
  $('.fs_down').on('click', function () {
    if (fs_i < -1) { return false; }
    var text = $('.sub > .container :nth-child(n)');
    text.each(function () {
      var fontSize = $(this).css('fontSize');
      var num = parseFloat(fontSize);
      num -= 1;
      $(this).css('fontSize', num + 'px');
    });
    fs_i -= 1;
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
var MainBrand = (function(){
  var g_$listBox = $("#slide_menu .list"),
      g_$listUl = g_$listBox.find("ol"),
      /* g_swiper, */
      g_currentIdx = 0,
      g_listLen = g_$listUl.length;

  function init(){
      setTabSwiper();
      setBtns();
  }

  function setTabSwiper(){
      var m_brandTabInner = $("#slide_menu .btns_tab_inner");

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
          changeGallery(g_currentIdx);
      });
      
      m_brandTabInner.on('afterChange', function(event, slick, currentSlide, nextSlide){
        var setT ;
        setT = setTimeout(function(){
          clearTimeout(setT);
         $("#slide_menu .list .tab_box .btns_tab .btns_tab_inner .slick-slide").each(function(i){
              if( $("#slide_menu .list .tab_box .btns_tab .btns_tab_inner .slick-slide").eq(i).attr("data-slick-index") == "1" ){
                $("#slide_menu .list .tab_box .btns_tab .btns_tab_inner .slick-slide").eq(i).attr("tabindex","0");
              }else{
                $("#slide_menu .list .tab_box .btns_tab .btns_tab_inner .slick-slide").eq(i).attr("tabindex","-1");
              }
            })
        } , 200)
        
      });
  }

  function setBtns(){
      var m_$btnTab = g_$listBox.find("#slide_menu .btns_tab a");

      m_$btnTab.on("click", function(){
          var m_idx = parseInt($(this).attr("data-idx"));

          changeGallery(m_idx);
          g_currentIdx = m_idx;
      })
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
    $('#slide_menu .list .tab_box .btns_tab .btns_tab_inner .slide_item').on('click', function () {
    var i = $(this).closest('li').index();
    $(this).closest('li').addClass('active').closest('li').siblings('li').removeClass('active');
    $(this).closest('.btns_tab_inner').siblings('.list_con').children('li').eq(i).addClass('active').siblings('li').removeClass('active');
  });
});

/***공단소식 **/
var MainBrand = (function(){
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
})();
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
  var time = 3;  //자동재생 시간 설정
  var $bar, isPause, tick, percentTime;
  var slide2 = $('.banner .slide');
  isPause = false;
  $bar = $('.progress');
  function startProgressbar() {
    resetProgressbar();
    percentTime = 0;

    tick = setInterval(interval, 10);
  }
  function interval() {
    if (isPause === false) {
      percentTime++;
      $bar.css({
        width: (percentTime / time) + "%"
      });
      if (percentTime >= 100 * time) {
        percentTime = 100 * time;
        slide2.slick('slickNext');
      }
    }
  }
  function resetProgressbar() {
    $bar.css({
      width: 0 + '%'
    });
    clearTimeout(tick);
  }
  startProgressbar();
  slide2.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $(' .slide_btn .pagination_num').html('<span class="current">' + i + '</span> / ' + slick.slideCount);
    startProgressbar();
  });
  
  slide2.slick({
    autoplay: false,
    autoplaySpeed: 2000,
    cssEase: 'ease-in',
    infinite: true,
    dots: true,
    appendDots: $('.slide_btn .pagination_dot'),//dot 설정
    customPaging: function (slide, i) {
      return '<button type="button">' + (i + 1) + '<span class="hide">슬라이드이동</span></button>'
    },
    prevArrow: $('.prev'),//arrow 설정
    nextArrow: $('.next'),//arrow 설정
  });
  $('.pause').click(function () {
    if ($(this).hasClass('play')) {
      $(this).removeClass('play').children('span').text('자동재생 정지');
      slide2.slick('slickPlay');
      isPause = false;
    } else {
      $(this).addClass('play').children('span').text('자동재생 시작');
      slide2.slick('slickPause');
      isPause = true;
    }
  });
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
/*   $('.banner2 .pause').click(function () {
    if ($(this).hasClass('play')) { 
      $(this).removeClass('play').children('span').text('자동재생 정지');
      slide1.slick('slickPlay');
      isPause = false;
    } else {
      $(this).addClass('play').children('span').text('자동재생 시작');
      slide1.slick('slickPause');
    }
  }); */


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



