
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


function imgResize(){    //이미지 사이즈 조절
  if(pcChk(720)){
    function imgResizeH(){
      $('.img').each(function(){
        var imgBoxH,imgH,img;
        imgBoxH = $(this).height();
        img = $(this).children('img');
        imgH = img.height();
        if(imgBoxH > imgH){
          img.width('auto').height('100%');
        }
      });
    }
    $('.img').each(function(){
      var imgBoxW,imgW,img;
      imgBoxW = $(this).width();
      img = $(this).children('img');
      imgW = img.width();
      if(imgBoxW > imgW){ //이미지box가 클경우
        img.width('100%').height('auto');
        imgResizeH();
      }else{
        imgResizeH();
      }
    });
  }else{
    $('.img img').removeAttr('style');
  }
}

$(function(){
  var slide2 = $('.banner .slide');
  if(slide2.length > 0){
    var time = 3;  //자동재생 시간 설정
    var $bar, isPause, tick, percentTime;

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
      fade:true,
      appendDots: $('.slide_btn .pagination_dot'),//dot 설정
      customPaging: function (slide, i) {
        return '<button type="button">' + '<span class="hide">슬라이드이동</span></button>'
      },
      prevArrow: $('.prev'),//arrow 설정
      nextArrow: $('.next'),//arrow 설정
    });

    $('.banner .control .pause').click(function () {
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
  }

 // 자주묻는질문 드롭다운메뉴, 조사중인사고 220922 수정
  $(function(){
      var faqBtn = $('.list_dropdown dl dt a, .list_dropdown2 dl dt a');
      faqBtn.on('click', function () {
        if ($(this).closest('dt').hasClass('active')) {
          $(this).closest('dt').removeClass('active');
          $('.list_dropdown dd, .list_dropdown2 dd').slideUp(); 
        } else {
          $('.list_dropdown dt, .list_dropdown2 dt').removeClass('active');
          $('.list_dropdown dd, .list_dropdown2 dd').slideUp();
          $(this).closest('dt').addClass('active').next().slideDown();
        }
        return false;
  });



    //슬라이드배너
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
      prevArrow: $('.f_banner .prev'), //arrow 설정
      nextArrow: $('.f_banner .next'), //arrow 설정
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
});

/*  function gnbAction(breakpoint){//gnb
  var headH;


  function mobile(){//중단점 이하 크기에서 true반환
    return $(window).width() <= breakpoint;
  }
  function dep2Height(target) {//dep2 크기에 맞추어 gnb높이 조절
    if (!mobile()) {
        var dep2H = $(target).next('div').outerHeight();
        $('#gnb').stop().animate({ height: headH + dep2H + 'px' }, 200);
        $(target).closest('li').addClass('active').closest('li').siblings('li').removeClass('active');
        //blackCover('on');
    }
  }
  function gnbReset(){//gnb 닫기
    if (!mobile()) {
    var gnbH = $('#gnb').height();
    var gnbH2 = $('#gnb').removeAttr('style').height();
    $('#gnb').css('height',gnbH+'px').stop().animate({height:gnbH2 + 'px'},200);
    }
  }

  function gnbInit(){//gnb 초기화
    if (mobile()) {
      $('#gnb .dep1 > li').removeAttr('style'); //gnb 너비 조정
      $('#gnb .dep1 a').each(function () { // 하위메뉴가 있으면 a태그에 menu_btn클래스 추가
        if ($(this).next().length) {
            $(this).addClass('menu_btn');
        }
      });
    }else{
      $('#gnb').removeAttr('style'); //gnb 너비 조정
      headH = $('#gnb').outerHeight(); //기본 헤더 높이 전역변수
      var gnbLeng = $('#gnb .dep1 > li').length; //gnb 너비 조정
     // $('#gnb .dep1 > li').width(100 / gnbLeng + '%'); //gnb 너비 조정
      $('#gnb .dep1 a').removeClass('menu_btn');
    }
  }
  gnbInit();

  $(window).on('resize',function(){ //초기화
    gnbInit();
  });

  //pc gnb 사이즈 조절 - 열기
  $('#gnb .dep1 > li > a').on({
    //헤더 높이조절
    mouseenter: function () {
      dep2Height(this);
    }
  });
 //pc 마우스오버스 헤더 변경
  $('#gnb .dep1').on('mouseover', function(){
    $('.header').addClass('active');

  });

  $('#gnb .dep1').on('mouseleave', function(){
    $('.header').removeClass('active');

  });

  //pc gnb 사이즈 조절 - 닫기
  $('#gnb .dep1').on('mouseleave',function(){
    gnbReset();
    $('#gnb .dep1 > li').removeClass('active');
  });

  // 모바일 메뉴 열기
  $('.open_gnb').on('click', function () {
    if (mobile()) {

        $('#gnb').removeAttr('style').fadeIn();
        $('body').css('overflow','hidden');
    }
  });

  // 모바일 메뉴 닫기
  $('.close_gnb').on('click', function () {
    if (mobile()) {
        $('#gnb').fadeOut();
        $('body').css('overflow','auto');
        //펼침메뉴 리셋
        $('#gnb .dep1 li').removeClass('active').find('ul,div').removeAttr('style');
    }
  });

  //모바일 GNB 클릭시 하위메뉴 노출(배경)
  $('#gnb .dep1 a').on('click', function () {
    if ($(window).width() <= 800 ) {
        var innerMenu = $(this).next('ul');
        var innerMenu2 = $(this).next('div');
    }
    if ($(window).width() <= 800 &&innerMenu.length > 0) {
        $(this).closest('li').toggleClass('active')
          .siblings('li').removeClass('active')
          .find('ul').stop().slideUp(200);
        innerMenu.stop().slideToggle(200);
        return false;
    }
    if ($(window).width() <= 800 &&innerMenu2.length > 0) {
        $(this).closest('li').toggleClass('active')
          .siblings('li').removeClass('active')
          .children('div').stop().slideUp(200)
          .find('li').removeClass('active')
          .find('.dep3').stop().slideUp(200);
        innerMenu2.stop().slideToggle(200);
        return false;
    }
});
  //모바일 dep3 클릭시 하위메뉴 active
  $('#gnb .dep3 a').on('click', function () {
      if (mobile()) {
          $(this).closest('li').addClass('active').siblings('li').removeClass('active');
      }
  });
}  */


function gnbAction(breakpoint){//gnb
  var headH;
  function mobile(){//중단점 이하 크기에서 true반환
    return $(window).width() <= breakpoint;
  }
  function dep2Height() {//dep2 크기에 맞추어 gnb높이 조절
    if (!mobile()) {
      var dep2H = 0;
       $('#gnb .dep2').each(function(){
        if(dep2H < $(this).outerHeight()){
          dep2H = $(this).outerHeight(); 
        }      
      }); 
      headH = gnbReset();
       /*  $('#gnb .dep2').outerHeight(dep2H);  */
      $('#gnb').addClass('active').stop().animate({height:headH+ dep2H+'px'},200);     
    }
  }
  function gnbReset(){//gnb 닫기
    if (!mobile()) {
    var gnbH = $('#gnb').height();
    var gnbH2 = $('#gnb').removeAttr('style').height();
    $('#gnb').css('height',gnbH+'px').stop().animate({height:gnbH2 + 'px'},200);
    }
    return gnbH2; 
  }

  function gnbInit(){//gnb 초기화
    if (mobile()) {
      $('#gnb .dep1 > li').removeAttr('style'); //gnb 너비 조정
      $('#gnb .dep1 a').each(function () { // 하위메뉴가 있으면 a태그에 menu_btn클래스 추가
        if ($(this).next().length) {
            $(this).addClass('menu_btn');
        }
      });
    }else{     
      $('#gnb').removeAttr('style'); //gnb 너비 조정
      headH = $('#gnb').outerHeight(); //기본 헤더 높이 전역변수
      var gnbLeng = $('#gnb .dep1 > li').length; //gnb 너비 조정
      $('#gnb .dep1 > li').width(100 / gnbLeng + '%'); //gnb 너비 조정
      $('#gnb .dep1 a').removeClass('menu_btn');
    }
  }
    gnbInit(); 

    $(window).on('resize',function(){ //초기화
      gnbInit();
    });

    //pc gnb 사이즈 조절 - 열기
    $('#gnb .dep1 > li > a').on({
      //헤더 높이조절
      mouseenter: function () {
          dep2Height(this);
      }
    });

    //pc gnb 사이즈 조절 - 닫기
    $('#gnb').on('mouseleave',function(){
      gnbReset(); 
    });

    //모바일 GNB 클릭시 하위메뉴 노출
    $('#gnb .dep1 a').on('click', function () {
        if (mobile()) {
            var innerMenu = $(this).next('ul');     
        }
        if (mobile()&&innerMenu.length > 0) {
            $(this).closest('li').toggleClass('active').siblings('li').removeClass('active').find('ul').stop().slideUp(200);
            innerMenu.stop().slideToggle(200);
            return false;
        }
    }); 
    //모바일 dep3 클릭시 하위메뉴 active
    $('#gnb .dep3 a').on('click', function () {
        if (mobile()) {
            $(this).closest('li').addClass('active').siblings('li').removeClass('active');
        }
    }); 
    //모바일 GNB 클릭시 하위메뉴 노출
    $('#gnb .dep1 a').on('click', function () {
        if (!pcChk(breakPoint)) {
            var innerMenu = $(this).next('ul');
            var innerMenu2 = $(this).next('div');
            if (innerMenu.length > 0 && !pcChk(breakPoint)) {
                $(this).closest('li').toggleClass('active').siblings('li').removeClass('active').find('ul').stop().slideUp(200);
                innerMenu.stop().slideToggle(200);
                return false;
            } else if (innerMenu2.length > 0 && !pcChk(breakPoint)) {
                $(this)
                    .closest('li')
                    .toggleClass('active')
                    .siblings('li')
                    .removeClass('active')
                    .find('div')
                    .stop()
                    .slideUp(200)
                    .find('li')
                    .removeClass('active')
                    .find('.dep3')
                    .stop()
                    .slideUp(200);
                innerMenu2.stop().slideToggle(200);
                return false;
            }
        }
    });
    //모바일 dep3 클릭시 하위메뉴 active
    $('#gnb .dep3 a').on('click', function () {
        if (!pcChk(breakPoint)) {
            $(this).closest('li').addClass('active').siblings('li').removeClass('active');
        }
    });
    // 모바일 메뉴 열기
    $('.open_gnb').on('click', function () {
      if (mobile()) {

          $('#gnb').removeAttr('style').fadeIn();
          $('body').css('overflow','hidden');
      }
    });
    // 모바일 메뉴 닫기
    $('.close_gnb').on('click', function () {
      if (mobile()) {
          $('#gnb').fadeOut();
          $('body').css('overflow','auto');
          //펼침메뉴 리셋
          $('#gnb .dep1 li').removeClass('active').find('ul,div').removeAttr('style');
      }
    });
  
     //모바일 GNB 클릭시 하위메뉴 노출(배경)
 /*     $('#gnb .dep1 a').on('click', function () {
      if ($(window).width() <= 1024 ) {
          var innerMenu = $(this).next('ul');
          var innerMenu2 = $(this).next('div');
      }
      if ($(window).width() <= 1024 &&innerMenu.length > 0) {
          $(this).closest('li').toggleClass('active')
            .siblings('li').removeClass('active')
            .find('ul').stop().slideUp(200);
          innerMenu.stop().slideToggle(200);
          return false;
      }
      if ($(window).width() <= 1024 &&innerMenu2.length > 0) {
          $(this).closest('li').toggleClass('active')
            .siblings('li').removeClass('active')
            .children('div').stop().slideUp(200)
            .find('li').removeClass('active')
            .find('.dep3').stop().slideUp(200);
          innerMenu2.stop().slideToggle(200);
          return false;
      }
  });   */

}



function sitemapAction(){
  function closeSitemap() {
    $('.sitemap').stop().animate({ top: '50%', opacity: 0 }, 500, function () {
      $(this).removeClass('active');
    });
  }
  //사이트맵 오픈
  $('.btn_sitemap').click(function () {
    $('.sitemap').addClass('active').stop().animate({ top: 0, opacity: 1 }, 500);
  });
  //사이트맵 닫기
  $('.close_sitemap').click(function () {
      closeSitemap();
  });
  $(window).resize(function(){
    $('.sitemap').removeClass('active').removeAttr('style');
  });
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


//탭메뉴 클릭 active
/*  function tabMenu(){
  $('.tab_menu a').click(function(){
    $(this).closest('li').siblings('li').removeClass('active'); 
    $(this).closest('li').addClass('active'); 
  });
}  */

$(document).ready(function(){ //탭메뉴 클릭 active
  $('.tab_menu li a, .tab_menu2 li a').click(function () {
    $(this).closest('li').siblings('li').removeClass('active'); 
    $(this).closest('li').addClass('active').focus();
  });
  return false;
});


function fileUpload(){ //.inp_file 업로드
  $(document).on('click','.inp_file .upload',function(){
    $(this).siblings('input').click();
  });
  $(document).on('change','.inp_file input',function(){
    $(this).siblings('.inp').html(this.files[0].name);
  });
  $(document).on('click','.inp_file a',function(){
    imageShow(this);
    return false;
  });
}

$(document).ready(function(){
  $('.dropdown .btn').click(function () {
    if ($(this).hasClass('active')) {
      $(this).removeClass('active').attr('title', '열기').next('ul').stop().slideUp(200);
    } else {
      $(this).addClass('active').attr('title', '닫기').next('ul').stop().slideDown(200);
    }
  });
  $('.dropdown > ul a').click(function () {
    var txt =  $(this).text();
    $(this).closest('.dropdown').find('.btn').removeClass('active').attr('title', '열기').text(txt).next('ul').stop().slideUp(200);
  });
});

function popup(){//팝업 열고 닫기
  var el;
  $('[data-pop-open]').click(function(){
    el = $(this); 
    var popname = el.data('pop-open');
    var _this = $('[data-pop="'+popname+'"]');
    if(!_this.closest('.pop_wrap').is(':visible')){
      _this.closest('.pop_wrap').fadeIn(200,function(){
        if($('.img_slide').length){
          $('.img_slide').slick('setPosition');
        }
      });
    }
    _this.fadeIn(200,function(){
      $('body').css('overflow','hidden');
      $(this).find('[tabindex="0"]').focus();
    });
  });

  $('.loop').on('keydown',function(e){
    if(e.keyCode === 9){
      $(this).closest('[tabindex="0"]').focus();
    }
  });
  $('[tabindex="0"]').on('keydown',function(e){
    if(e.keyCode === 9 && e.shiftKey){
      return false;
    }
  });
  $('.close_pop').click(function(){
    if(!$(this).closest('[data-pop]').siblings().is(':visible')){
      $(this).closest('.pop_wrap').fadeOut(200);
      $('body').css('overflow','auto');
      el.focus();
    }
    $(this).closest('[data-pop]').fadeOut(200);
  });
}

function pagination(){
  $('.pagination ul a').click(function(){
    $(this).closest('li').siblings('li').children().removeClass('active');
    $(this).addClass('active');
  });
}

function imageShow(target){
  var imgUrl = $(target).attr('href');
  $('body').append('<div class="show_img"><img src="'+imgUrl+'" alt=""></div>');
}
function imageHide(){
  $(document).on('click','.show_img',function(){
    $(this).fadeOut(300,function(){
      $(this).remove();
    })
  });
}

function changeValue(obj) {
  $(obj).siblings('span').children('em').html(obj.files[0].name);
}

function inputFile(){
  $('.file span, .file button').click(function (e) {
    $(this).siblings('input').click();
  });
}

/*sjh  function quickMenu(top){
  $(window).scroll(function(){
    var scrTop = $(window).scrollTop();
    var scr = window.setTimeout(function(){
      $('.quick_menu').css('top',scrTop + top);
      window.clearTimeout(scr);
    });

  });
}*/

$(function(){ 
  if($('.img_slide').length){// slickslider 실행
    $('.img_slide').slick();
  }

  gnbAction(1023);
   // schAction(1063);
  sitemapAction();
  fileUpload();
  inputFile();
  pagination();
  popup();
  imageHide();
  //tabMenu();
  //quickMenu(213); sjh
  //dropdown(); sjh
  //$('.pop_wrap,[data-pop]').show();//페이지 로드시 팝업 바로 노출, 개발 끝나고 지워야함.


  $('.inp.date input').datepicker({//데이트피커 설정

    // inline mode
    inline: false,

    // additional CSS class
    classes: '',

    // language
    language: 'ko',

    // start date
    startDate: new Date(),

    // first day
    firstDay: '',

    // array of day's indexes
    weekends: [6, 0],

    // custom date format
    dateFormat: '',

    // Alternative text input. Use altFieldDateFormat for date formatting.
    altField: '',

    // Date format for alternative field.
    altFieldDateFormat: '@',

    // remove selection when clicking on selected cell
    toggleSelected: true,

    // keyboard navigation
    keyboardNav: true,

    // position
    position: 'bottom left',
    offset: 5,

    // days, months or years
    view: 'days',
    minView: 'days',

    showOtherMonths: true,
    selectOtherMonths: true,
    moveToOtherMonthsOnSelect: true,

    showOtherYears: true,
    selectOtherYears: true,
    moveToOtherYearsOnSelect: true,

    minDate: '',
    maxDate: '',
    disableNavWhenOutOfRange: true,

    multipleDates: false, // Boolean or Number
    multipleDatesSeparator: ',',
    range: false,

    // display today button
    todayButton: true,

    // display clear button
    clearButton: true,

    // Event type
    showEvent: 'focus',

    // auto close after date selection
    autoClose: false,

    // navigation
    monthsFiled: 'monthsShort',
    prevHtml: '<span></span>',
    nextHtml: '<span></span>',
    navTitles: {
      days: '<i>yyyy년</i> &nbsp; MM<em></em>',
      months: 'yyyy년<em></em>',
      years: 'yyyy1 - yyyy2'
    },
  });
});




function responsiveTable(arg) { //가변 테이블
  if ($(window).width() <= arg) {
    $('.tableA:not(.mobileT) tbody th').each(function () {
      if (!$(this).next('td[colspan]').length) {
        $(this).addClass('hidden');
        var td = $(this).next('td');
        td.wrapInner('<div></div>');
        $(this).clone().prependTo(td).contents().unwrap().wrap('<span class="th"></span>');
      }
    });
    $('.tableA').addClass('mobileT');

  }
  else {
    $('.tableA.mobileT tbody th').each(function () {
      if (!$(this).next('td[colspan]').length) {
        $(this).removeClass('hidden');
        $(this).next().find('.th').remove();
        $(this).next().children('div').contents().unwrap();
      }
    });
    $('.tableA').removeClass('mobileT');
  }

  if ($(window).width() <= arg) {
    //tbody n번째 td에 thead n번째 th 텍스트를 span태그를 감싸 넣는다.
    $('.tableB:not(.mobileT)').each(function () {
      var th = $(this).find('thead th:not()');
      var cols = th.length;
      var rows = $(this).find('tbody tr').length;
      for (var i = 0; i < rows;i++) {
        for (var j = 0; j < cols; j++) {
          var td = $(this).find('tbody tr').eq(i).children().eq(j);
          td.wrapInner('<div></div>');
          th.eq(j).clone().prependTo(td).contents().unwrap().wrap('<span></span>')
        }
      }
      $(this).addClass('mobileT');
    });
  } else {
    $('.tableB.mobileT').each(function () {
      $(this).find('tbody td > span').remove();
      $(this).find('tbody td > div').contents().unwrap();
      $(this).removeClass('mobileT');
    });
  }
}
function mobileOnlySlider($slidername, $dots, $arrows, $breakpoint) {
  var slider = $($slidername);
  var settings = {
    mobileFirst: true,
    dots: $dots,
    arrows: $arrows,
    prevArrow: slider.closest('.tableB').find('.prev'),//arrow 설정
    nextArrow: slider.closest('.tableB').find('.next'),//arrow 설정
    responsive: [
      {
        breakpoint: $breakpoint,
        settings: "unslick"
      }
    ]
  };
  slider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    slider.closest('.tableB').find('.pagination_num').html( '<span class="current">' + i + '</span> / ' + slick.slideCount);
  });
  slider.slick(settings);

  $(window).on("resize", function () {
    if ($(window).width() > $breakpoint) {
      return;
    }
    if (!slider.hasClass("slick-initialized")) {
      return slider.slick(settings);
    }
  });
}
function mobileOnlyTab($slidername, $dots, $arrows, $breakpoint) {
  var slider = $($slidername);
  var settings = {
    mobileFirst: true,
    dots: $dots,
    arrows: $arrows,
    slidesToShow: 2.5,
    infinite: false,
    swipeToSlide: true,
    touchThreshold: 100,
    variableWidth:true,
    responsive: [
      {
        breakpoint: $breakpoint,
        settings: "unslick"
      }
    ]
  };


  slider.slick(settings);

  $(window).on("resize", function () {
    if ($(window).width() > $breakpoint) {
      return;
    }
    if (!slider.hasClass("slick-initialized")) {
      return slider.slick(settings);
    }
  });
}
$(window).on('load resize', function () {
  responsiveTable(1023);
});

$(function(){
  mobileOnlySlider(".tableB tbody", false, true, 1023);
  mobileOnlyTab(".tab_menu", false, false, 1023);
  
});

/*로딩*/
$(window).on('load',function () { 
  $('.loading').fadeOut(600, function () {
    $(this).remove(); 
  });
});

$(document).ready(function () {
  tab();

});
/* $(document).ready(function(){ //탭메뉴 클릭 active
    $('.tab_menu li a, .tab_menu2 li a').click(function () {
    $(this).closest('li').siblings('li').removeClass('active'); 
    $(this).closest('li').addClass('active');
  }); 
}); */


function tab(){
  //탭메뉴 클릭할 때 실행
  $(".tab_menu li a").on( "click", function(e) {
      e.preventDefault();

      //초기화
      $(".tab_menu  li").removeClass("active");
      //$(".tab_wrap .tab_list").hide(); 
      
      //실행
      $(this).parent().addClass("active"); 
      //var activeTab = $(this).attr("href");
      //$(activeTab).show();
  });

  //초기 탭 설정
  var activeChk = 0;
  $(".tab_menu li").each(function(i) { 
      if ($(this).hasClass("active")){
          $(this).addClass("active"); 
          $(this).find('a').trigger("click");
          activeChk ++
      }
  });

}
