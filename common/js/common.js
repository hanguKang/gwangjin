
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

function nav_reset(){//web 크기일 때 li가 갖고 있는  active제거 (mouseenter 이벤트로 active를 갖는 이벤트 와 겹쳐서 삭제)
  
  $('.nav_items li').each(function (i,v) {
    let _this = $(v);
    
    if(_this.hasClass('active')){
      //console.log(_this);
      $(_this).removeClass('active');
      if(!_this.hasClass('nav_item')){
        _this.children('ul').slideUp(10);
      }
      
    }

  });
}
function makeDropDownNav(elm){
  
  if ( $(elm).next('ul').length != 0 ){
    let $innerMenu = $(elm).next('ul'); 
    let $li_elm = $(elm).closest('li');
    $innerMenu.stop().slideToggle(200);
    $li_elm.toggleClass('active')
    .siblings('li').removeClass('active').children('ul').stop().slideUp(200);

    if ($(elm).hasClass('menu_btn')) {
        return false;
    }

    // let li_act = $(elm).closest('li');
    // li_act.siblings('li.active').removeClass('active').children('ul').stop().slideUp(200);
    // li_act.toggleClass('active');
    // if(li_act.hasClass('active')){
    //   li_act.children('ul').stop().slideDown(200);
    // }else{
    //   li_act.children('ul').stop().slideUp(200);
    // }
    // if ($(elm).hasClass('menu_btn')) {
    //     return false;
    // }

  }else{
    window.location.href=$(elm).attr('href');
  }
}


//서브페이지 로컬, 메인페이지 모바일 : window.matchMedia , window.load, 서브페이지 로딩시  네비게이터 목록 active 작성하기
function spotNavActive(nav_spot){ 
  console.log(nav_spot);
  let current = location.pathname.split('/');
      current = current[current.length-1];
      let fileName = current.substring(0, current.indexOf('.'));
      if (fileName === "index") { //메인페이지 첫번째 
        let lis = document.querySelectorAll('.nav_items li');
       
        for( const [idx, li] of lis.entries() ){
          if(idx == 0 ){
            li.classList.add("active");
          }else{
            li.classList.remove("active");
          }
        }
        return;
      }
      if (current === "") return;
      
      let menuItems = document.querySelectorAll(nav_spot); //모든 자손요소 a
      console.log(menuItems);
      console.log(current);
      for (let i = 0, len = menuItems.length; i < len; i++) {
          if (menuItems[i].getAttribute("href").indexOf(current) !== -1) {
              //menuItems[i].classList.add("active");
              menuItems[i].parentElement.classList.add("active"); //최하단 li요소
              //menuItems[i].parentElement.parentElement //최하단 li요소의 부모 ul요소
              //menuItems[i].parentElement.parentElement.parentElement //최하단 li요소의 부모 ul요소의 부모 li요소
              if(!menuItems[i].parentElement.parentElement.parentElement) return; 
              menuItems[i].parentElement.parentElement.parentElement.classList.add("active");
          }
      }
}

//nav 모바일 switch
const $_mediaQueryList = window.matchMedia('( max-width: 720px )');
const changeHandler = (e)=>{
  //console.log('changed!');
  if(e.matches){
    //console.log('changed! mobile');
    //spotNavActive('.nav_item a');

    $('.nav_item .dep2>li>a').on('click',function(e){
      e.preventDefault();
      let _this = this;
      makeDropDownNav(_this);
    });

    $('.nav_item>a').on('click', function (){
      e.preventDefault();
      //console.log('클릭했잖아');
      $(this).parent('li').addClass('active').siblings().removeClass('active');
    });

    $('.header>.layer_gnb>.gnb>nav>.close').on('click', (e)=>{
      e.preventDefault();
      $('.header>.layer_gnb>.gnb>.curtain').removeClass('active');
      $('.header>.layer_gnb>.gnb>nav').removeClass('active');
      $('.header>.layer_gnb>.gnb>nav>ul.dep1>li.active>div.dep2_wrap>ul.dep2>li.active').children('ul').slideUp();
      $('.header>.layer_gnb>.gnb>nav>ul.dep1>li.active>div.dep2_wrap>ul.dep2>li.active').removeClass('active');
      $('.header>.layer_gnb>.gnb>nav>ul.dep1>li.active').removeClass('active');
      //spotNavActive('.nav_item a');
    });

    $('.header>.layer_gnb>.gnb>.showNav').on('click',function(e){
      e.preventDefault();
      $('.header>.layer_gnb>.gnb>.curtain').addClass('active');
      $('.header>.layer_gnb>.gnb>nav').addClass('active');  
    });

  }else{
    //console.log('web');
    $('.nav_item .dep2>li>a').off('click');
    $('.nav_item>a').off('click');
    $('.header>.layer_gnb>.gnb>nav>.close').off('click');
    nav_reset();
    
  }
}
$_mediaQueryList.addEventListener('change', changeHandler);



//공지사항 (notice)
 
  function tabRow() {//active li의 높이를 구하고 tab_box 높이 세팅

    var tabH = $('.tab_row').find('li').outerHeight();
    var tabConH = $('.tab_row').find('.active > div').outerHeight();
    $('.tab_row').css('height',tabConH + tabH);


    $('ul.tab_row > li > button').on('click', function () {

      let _this = $(this);
      _this.closest('li').addClass('active').siblings('li').removeClass('active'); //active에 의해서 하위 div가 display:block처리 된다. _main.scss#170
      tabRow();
      _this.next('div').attr('aria-hidden','false')
      .closet('li').siblings('li').children('div').attr('aria-hidden','true');
  
    });
  }// tabRow End

  

  
  //탭 너비 높이 조정
  // var tabH = 0;
  // $('.tab_list > ul > li > a').removeAttr('style');
  // $('.tab_list > ul > li').each(function () {
  //   if (tabH < $(this).children('a').height()) {
  //     tabH = $(this).children('a').height();
  //   }
  // });
  // $('.tab_list > ul > li > a').height(tabH);
  // var tabLength = $('.tab_list > ul > li').length;
  // $('.tab_list > ul > li').outerWidth(100 / tabLength + '%');



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
  //창크기 arguments보다 크면 true 반환
  if ($(window).width() > width) {
    return true;
  } else {
    return false;
  }
}
function mChk(width) {
  //창크기  arguments보다 크면 true 반환
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
  if (pcChk(720)) {

    var dep2H = $(target).next().outerHeight();
    // $('.header')
    //   .stop()
    //   .animate({ height: dep2H + headH + 'px' }, 150, function () {
    //     $(target).closest('li').addClass('active').closest('li').siblings('li').removeClass('active');
    //   });
    $(target).closest('li').addClass('active').siblings('li').removeClass('active');//.end().closest('li').siblings('li').removeClass('active');
    $('.header').addClass('active_bg');
    headLine('on');
  }
}
function gnb3Close() {
  //alert('불러라');
  if (pcChk(720)) {
    // $('.header').stop()
    //   .animate({ height: headH + 'px' }, 150, function () {
    //     $('.gnb > ul > li').removeClass('active');
    //     headLine('off');
    //   });
    
    $('.header').css({'height':122}).removeClass('active_bg');
    $('.nav_items>li.active').removeClass('active')
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
  $('.gnb > nav >ul > li> a').on({
    mouseenter: function () {
      //검색창이 없을때 실행
      
      if (!$('.util .btn_search_open').hasClass('active')) gnb3Open(this);
    },
    focusin: function () {
      if (!$('.util .btn_search_open').hasClass('active')) gnb3Open(this);
    },
  });
  $('.gnb > nav').on({
    mouseleave: function () {
      if (!$('.util .btn_search_open').hasClass('active')) gnb3Close();
    },
  });
  $('#gnb .dep2_wrap a')
  .last().on({focusout: function () {
        gnb3Close();
      },
    });
  $('.logo>a').focus(()=>{ 
      gnb3Close();
   });
  $(document).on('click', '.btn_sitemap_open', function (e) {
    if (!pcChk(720)) { //720보다 크면 true판별 ---> 모바일이면 !false 
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

});


$(window).on('load',()=>{
    //nav active 생성
    if (!pcChk(720)){ //모바일이라면 ( 720이하라면 ) 
      //console.log('mobile');
      //spotNavActive('.nav_item a');
  
      $('.nav_item .dep2>li>a').on('click',function(e){ //드랍다운 메뉴
        e.preventDefault();
        let _this =  this;
        makeDropDownNav(_this);
      });

      $('.nav_item>a').on('click',function (e) { //클래스 active 지정
        e.preventDefault();
        $(this).parent('li').addClass('active').siblings().removeClass('active');
      });

      $('.header>.layer_gnb>.gnb>.showNav').on('click',function(e){ //네비게이터 나오도록 지정
        e.preventDefault();
        $('.header>.layer_gnb>.gnb>nav').addClass('active');  
      });

      $('.header>.layer_gnb>.gnb>nav>.close').on('click', (e)=>{
        e.preventDefault();
        $('.header>.layer_gnb>.gnb>nav').removeClass('active'); //네비 닫기
        $('.header>.layer_gnb>.gnb>nav>ul.dep1>li.active>div.dep2_wrap>ul.dep2>li.active').children('ul').slideUp(); // 드랍다운 열려있던 것 닫기
        $('.header>.layer_gnb>.gnb>nav>ul.dep1>li.active>div.dep2_wrap>ul.dep2>li.active').removeClass('active'); //active 없애기
        $('.header>.layer_gnb>.gnb>nav>ul.dep1>li.active').removeClass('active'); //active 없애기
        //spotNavActive('.nav_item a'); //현재 페이지 active 지정하기
      });
    }else{
      $('.nav_item .dep2>li>a').off('click');
      $('.nav_item>a').off('click');
      $('.header>.layer_gnb>.gnb>.showNav').off('click');
      $('.header>.layer_gnb>.gnb>nav>.close').off('click');
    }
    
    //nav active 제거 
    gnb3Close(); //페이지 로딩시 nav 열려 있다면 닫게 만들기  gnb3Close함수 내부에서 pcChk가 존재함
});

$(window).on('resize load', function () {
  headH = $('.header').outerHeight();
  headLine('off');
  tabRow();
  closeSitemap();
  bodyScroll('on');
  $('.btn_search_open').removeClass('active');


//   if (pcChk(breakPoint)) {
//     headH = $('#gnb').outerHeight(); //기본 헤더 높이 전역변수
//     var gnbLeng = $('#gnb .dep1 > li').length; //gnb 너비 조정
//     $('#gnb .dep1 > li').width(100 / gnbLeng + '%'); //gnb 너비 조정
//     menuInit('#lnb .dep2 a');
// } else {
//     $('#gnb .dep1 > li').removeAttr('style'); //gnb 너비 조정
//     menuInit('#gnb .dep1 a');
// }
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
  

/**** 메인 >시설 정보  문화 공공체육, 시설 도서관 시설, 주차 시설****/
// var MainBrand = ( function(){
//   let g_$listBox = $("#slide_menu .list"), // 제목 및 컨텐츠를 모두 갖고 있는 요소
//       g_$listUl = g_$listBox.find("ol"), // 스크롤할 때 떠오르는 아이콘들
//       /* g_swiper, */
//       g_currentIdx = 0,
//       g_listLen = g_$listUl.length;

//       m_brandTabInner_1= null; 

//   function init(){
//       setTabSwiper();
//       setBtns();
//   }

//   function setTabSwiper(){
//       m_brandTabInner_1 = $("#slide_menu .btns_tab_inner"); //메인> 문화 공공체육 시설, 도서관 시설, 주차 시설 제목들 합친 그룹
//       //let totalSlides = $(".btns_tab_inner").children().length;
//       //m_brandTabInner_1.children("div:first-child").before(m_brandTabInner_1.children("div:last-child"));
//       m_brandTabInner_1.slick({
//            infinite:true,
//            slidesToShow: 3, //2022_12_01 : 보여줄 개수와 실제 개수가 같으면 slic은 작동하지 않는다. slick.js파일 수정요함.
//            slidesToScroll: 1,
//           // swipeToSlide: true,
           
//            autoplay: false,
//           // //variableWidth: true,
//            prevArrow:$("#slide_menu .btn_tabArrow_l"),
//            nextArrow:$("#slide_menu .btn_tabArrow_r"),
//           // dots: false,
//           // draggable:true,
//       });

//       // m_brandTabInner_1.on('beforeChange', function(event, slick, currentSlide, nextSlide){
//       //     g_currentIdx = nextSlide;
//       //     //console.log(g_currentIdx);
          
//       //     changeGallery(g_currentIdx);
//       // });
      
//       //현재 화면에 보이는 제목들 세팅하기
//       setCurrentActiveSlide ();

//       function setCurrentActiveSlide (){
//         let currentActiveSlides = m_brandTabInner_1.find('.slick-slide[aria-hidden=false]');
//         console.log(currentActiveSlides);
//         currentActiveSlides.eq(1).addClass('currentTit').siblings().removeClass('currentTit');
//       }


//       m_brandTabInner_1.on('afterChange', function(event, slick, currentSlide, nextSlide){
//         setCurrentActiveSlide ();
//        // var setT ;  이전 사람이 한 내용
//         // setT = setTimeout(function(){
//         //   clearTimeout(setT);
//         //  $("#slide_menu .list .tab_box .btns_tab .btns_tab_inner .slick-slide").each(function(i){ //각 제목들 : 문화 공공체육 시설, 도서관 시설, 주차 시설
//         //       if( $("#slide_menu .list .tab_box .btns_tab .btns_tab_inner .slick-slide").eq(i).data("slick-index") == "1" ){ // 세개 제목 중 가운데 제목이라면   
//         //         $("#slide_menu .list .tab_box .btns_tab .btns_tab_inner .slick-slide").eq(i).attr("tabindex","0");
//         //       }else{
//         //         $("#slide_menu .list .tab_box .btns_tab .btns_tab_inner .slick-slide").eq(i).attr("tabindex","-1");
//         //       }
//         //     })
//         // } , 200)
        
//       });
//   }

//   function setBtns(){ // 이전 사람이 작성한 변수명 이름 보면 제목들 버튼 세팅하는 것 같은데.

//       //제목클릭
//       //var m_$btnTab = g_$listBox.find("#slide_menu .btns_tab a"); //메인> 문화 공공체육 시설 제목들 합친 그룹 좌우 버튼 - 이전 사람이 한 것
//       let m_$btnTab = $("#slide_menu .btns_tab .slide_item"); //메인> 문화 공공체육 시설 제목들 합친 그룹 - 2022-11-30 변경
//       //console.log(m_$btnTab);
//       m_$btnTab.each( function(i,v ){
//           //console.log(this);
//           $(v).on('click', function(){
//               //alert(1234);
//               //var m_idx = parseInt($(this).attr("data-idx")); //이전 사람이 한 것
//               var m_idx = parseInt( $(this).data("slick-index") );
//               //console.log(m_idx);
//               changeGallery(m_idx);
//               g_currentIdx = m_idx;
//           });
//       });
      
//       //좌우 화살표 클릭
//       $('.btn_tabArrow_l').on('click', function(e){
//         $(this).addClass('active').siblings().removeClass('active');
//         e.preventDefault();
//         //m_brandTabInner.slick('slickPrev');
//       });
//       $('.btn_tabArrow_r').on('click', function(e){
//         $(this).addClass('active').siblings().removeClass('active');
//         e.preventDefault();
//        // m_brandTabInner.slick('slickNext');
//       });
//   }

//   function changeGallery(_idx){
//       var m_$listUl = g_$listBox.find("ol"),
//           m_$countBox = g_$listBox.find("#slide_menu .tab_box .count");

//       m_$listUl.removeClass("on");
//       m_$listUl.eq(_idx).addClass("on");

//       m_$countBox.find(".current").html(_idx+1);
//       m_$countBox.find(".total").html(g_listLen);
//   }

//   init();

// })();

//

// $('#slide_menu .list .tab_box .btns_tab .btns_tab_inner .slide_item').on('click', function () { //#slide_menu의 제목들을 클릭하면
//   //alert('클릭');
//   var i = $(this).closest('li').index();
//   $(this).closest('li').addClass('active').closest('li').siblings('li').removeClass('active');
//   $(this).closest('.btns_tab_inner').siblings('.list_con').children('li').eq(i).addClass('active').siblings('li').removeClass('active');
// });

function call_slideChangeTransitionEnd(active_label, active_panel_id, tab_paneles){
  
  //console.log(active_panel_id);
  active_label.addClass('active').siblings().removeClass('active');
  
  
  for(let i = 0; i< tab_paneles.length; i++){
    //console.log(1234);
    let labelledby, activePanel; 

    activePanel = tab_paneles.eq(i); //li요소들 : tabPanel들 컨텐츠들
    labelledby = activePanel.attr('aria-labelledby');

    //console.log(labelledby, active_panel_id);
    if(active_panel_id == labelledby){
      activePanel.attr('arria-hidden','false').addClass('on').siblings().removeClass('on').attr('arria-hidden','true');
    }
  }
}


const swiper_facility = new Swiper('.facility',{
  
  slidesPerView:3,
  loop:true,
  on:{
    slideChangeTransitionStart:()=>{
      let active_label, active_panel_id, tab_paneles;
      active_label = $('.facility .swiper-slide-active').next(); //이동이 된 직후, .swiper-slide-active로 활성화되어 있는 요소는 화면에서 보이는 요소 중 첫 번째 요소이다. 
      active_panel_id = active_label.children('a').attr('id');
      tab_paneles = $('.facility_outer').next('.list_box').children('.tabPanels').children();
      call_slideChangeTransitionEnd(active_label, active_panel_id, tab_paneles);
      
    },
    
  },
});

function showTabActiveArrow(elm, dir, swiper){
  elm.addClass('active').siblings().removeClass('active');
  if(dir){
    swiper.slidePrev();
  }else{
    swiper.slideNext();
  }
  
}

//좌우 화살표 클릭
$('.facility_tabArrow_l').on('click', function(e){
  e.preventDefault();
  let _this, dir 
  _this = $(this);
  dir = true;
  swiper = swiper_facility;
  showTabActiveArrow(_this, dir, swiper);
  //m_brandTabInner.slick('slickPrev');
});
$('.facility_tabArrow_r').on('click', function(e){
  e.preventDefault();
  let _this, dir 
  _this = $(this);
  dir = false;
  swiper = swiper_facility;
  showTabActiveArrow(_this, dir, swiper);  
  // m_brandTabInner.slick('slickNext');
});
//제목 클릭
$('.facility .slide_item').each((i,v)=>{
  let _this, active_idx, current_idx, abs_idx;
  _this = $(v);

  _this.click(function(e){
      e.preventDefault();
      current_idx = _this.index(); //current_idx는 beforeSlideChangeStart에서 사용될 것이다.
      active_idx = $('.facility .slide_item.active').index();
      // alert(current_idx);
      // alert(active_idx);

      abs_idx = active_idx - current_idx;
      //alert(abs_idx);
      goToTab(abs_idx, '.facility');
  });
    
});

function goToTab(abs_idx, selecElm){

  if( abs_idx > 0){
    for(let i = 0; i < abs_idx; i++){
      $(selecElm+'_tabArrow_l').trigger('click');
    }
  }else if( abs_idx < 0){
    abs_idx = -abs_idx; 
    for(let i = 0; i < abs_idx; i++){
      $(selecElm+'_tabArrow_r').trigger('click');
    }
  }
}

///***  ***/





/***   공단소식   **/
//---slick사용했던 건 이전 사람이 사용 버전
// var MainBrand = ( function(){
//   var g_$listBox = $("#new .list"),
//       g_$listUl = g_$listBox.find("ol"),
//       /* g_swiper, */
//       g_currentIdx = 0,
//       g_listLen = g_$listUl.length;

//   function init(){
//       setTabSwiper();
//       setBtns();
//   }

//   function setTabSwiper(){
//       var m_brandTabInner = $("#new .btns_tab_inner");

//       //m_brandTabInner.children("div:first-child").before(m_brandTabInner.children("div:last-child")); 이전 사람이 한 것을 보임.
//       m_brandTabInner.slick({
//           slidesToShow: 3,
//           slidesToScroll: 1,
//           swipeToSlide: true,
//           autoplay: false,
//           variableWidth: true, //slick요소들의 가로 값이 다양할 때 사용
//           prevArrow:$("#new .btn_tabArrow_l"),
//           nextArrow:$("#new .btn_tabArrow_r"),
//           dots: false, 

//       });

//       m_brandTabInner.on('beforeChange', function(event, slick, currentSlide, nextSlide){
//           g_currentIdx = nextSlide;
//           changeGallery(g_currentIdx);
//       });
      
//       m_brandTabInner.on('afterChange', function(event, slick, currentSlide, nextSlide){
//         var setT ;
//         setT = setTimeout(function(){
//           clearTimeout(setT);
//          $("#new .list .tab_box .btns_tab .btns_tab_inner .slick-slide").each(function(i){
//               if( $("#new .list .tab_box .btns_tab .btns_tab_inner .slick-slide").eq(i).attr("data-slick-index") == "1" ){
//                 $("#new .list .tab_box .btns_tab .btns_tab_inner .slick-slide").eq(i).attr("tabindex","0");
//               }else{
//                 $("#new .list .tab_box .btns_tab .btns_tab_inner .slick-slide").eq(i).attr("tabindex","-1");
//               }
//             })
//         } , 200)
        
//       });
//   }

//   function setBtns(){
//       var m_$btnTab = g_$listBox.find(".btns_tab a");

//       m_$btnTab.on("click", function(){
//           var m_idx = parseInt($(this).attr("data-idx"));

//           changeGallery(m_idx);
//           g_currentIdx = m_idx;
//       })
//   }

//   function changeGallery(_idx){
//       var m_$listUl = g_$listBox.find("ol"),
//           m_$countBox = g_$listBox.find(".tab_box .count");

//       m_$listUl.removeClass("on");
//       m_$listUl.eq(_idx).addClass("on");

//       m_$countBox.find(".current").html(_idx+1);
//       m_$countBox.find(".total").html(g_listLen);
//   }
  
//   init();

// })(); //공단소식 끝



  
  //radiobox
  
  /* --------------------- 공단 소식  ----------------- */
  
  const swiper_news = new Swiper('.news_box',{
  
    slidesPerView:3,
    loop:true,
    on:{
      slideChangeTransitionEnd:()=>{
        // let active_label, active_panel_id;
        // active_label = $('.swiper-slide-active').next(); //이동이 된 직후, .swiper-slide-active로 활성화되어 있는 요소는 화면에서 보이는 요소 중 첫 번째 요소이다. 
        // active_panel_id = active_label.children('a').attr('id');
        // //console.log(active_panel_id);
        // active_label.addClass('active').siblings().removeClass('active');
        
  
        // for(let i = 0; i< $('.tabPanels').children().length; i++){
        //   let labeledby, activePanel; 
        //   activePanel = $('.tabPanels').children().eq(i); //li요소들 : tabPanel들 컨텐츠들
        //   labeledby = activePanel.attr('aria-labeledby');
        //   //console.log(labeledby, active_panel_id);
        //   if(active_panel_id == labeledby){
        //     activePanel.attr('arria-hidden','false').addClass('on').siblings().removeClass('on').attr('arria-hidden','true');
        //   }
        // } // fon문 End
        let active_label, active_panel_id, tab_paneles;
        active_label = $('.news_box .swiper-slide-active').next(); //이동이 된 직후, .swiper-slide-active로 활성화되어 있는 요소는 화면에서 보이는 요소 중 첫 번째 요소이다. 
        active_panel_id = active_label.children('a').attr('id');
        tab_paneles = $('.news_box_outer').next('.list_box').children('.tabPanels').children(); //일반 요소 자식들을 감싸는 ul
        call_slideChangeTransitionEnd(active_label, active_panel_id, tab_paneles);
      },//slideChangeTransitionEnd End 
     
  
    
    }, //on End 
  }); //swiepr_news End 

  $('.news_tabArrow_l').on('click', function(e){
    e.preventDefault();
    let _this, dir 
    _this = $(this);
    dir = true;
    swiper = swiper_news;
    showTabActiveArrow(_this, dir, swiper);  
    //m_brandTabInner.slick('slickPrev');
  });
  $('.news_tabArrow_r').on('click', function(e){
    e.preventDefault();
    let _this, dir 
    _this = $(this);
    dir = false;
    swiper = swiper_news;
    showTabActiveArrow(_this, dir, swiper);   
    // m_brandTabInner.slick('slickNext');
  });
  //제목 클릭
  $('.news_box .slide_item').each((i,v)=>{
    let _this, active_idx, current_idx, abs_idx;
    _this = $(v);
  
    _this.click(function(e){
        e.preventDefault();
        current_idx = _this.index();
       
        active_idx = $('.news_box .slide_item.active').index();
        // alert(current_idx);
        // alert(active_idx);
  
        abs_idx = active_idx - current_idx;
        //alert(abs_idx);
        goToTab(abs_idx, '.news');
    });
      
  });
  




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
            swiper_main_banner.autoplay.start();
          }
          
      }
    }
  }
  
  const swiper_main_banner = new Swiper('.swiper_main_banner', {
    loop: true,
    a11y: {
      prevSlideMessage: '이전 배너',
      nextSlideMessage: '다음 배너',
    },
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
      nextEl: '.swiper-button-next-banner',
      prevEl: '.swiper-button-prev-banner',
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
    speed:600,
    autoplay:{

      delay:3000,
      pauseOnMouseEnter:false,
      disableOnInteraction:false,
      waitForTransition:true,
    },

    breakpoints : {
      721:{
        
      },
      320:{
        
      }
    }
  }); //스와이퍼 기본 설정 끝

   // 배너 일시정지
   $('.banner .pause').click(function () {
      isPause = true;
      $(this).addClass('active').siblings().removeClass('active').find('span').text('자동재생 정지');//puase 버튼이 나타나고 play해라.
      swiper_main_banner.autoplay.stop();
      
   });

  $('.banner .play').click(function () {
      
      isPause = false;
      $(this).addClass('active').siblings().removeClass('active').find('span').text('자동재생 시작'); //play 버튼이 나타나고 pause해라.
      swiper_main_banner.autoplay.start();
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



/* ------------------------------------------------*/



  //알림마당
  // var slide1 = $('.banner2 .slide');
  // slide1.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
  //   var i = (currentSlide ? currentSlide : 0) + 1;
  //   $('.banner2 .pagination_num').html('<span class="current">' + i + '</span> /&nbsp;  ' + slick.slideCount);
  // });

  // slide1.slick({
  //   autoplay: true,
  //   cssEase: 'ease-in',
  //   //dots: true,
  //   //appendDots: $('.banner2 .pagination_dot'),//dot 설정
  //   // customPaging: function (slide, i) {
  //   //   return '<button type="button">' + (i + 1) + '번째 슬라이드로 이동</button>'
  //   // },
  //   prevArrow: $('.banner2 .prev'),//arrow 설정
  //   nextArrow: $('.banner2 .next'),//arrow 설정
  //   responsive: [
  //     {
  //       breakpoint: 1080,
  //       settings: {
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 980,
  //       settings: {
  //         slidesToScroll: 1,
  //       },
  //     },
      
  //   ],

  // });

  let swiper_notice = new Swiper('.swiper-notice',{
    loop: true,
    autoplay:true,
    a11y: {
      prevSlideMessage: '이전 배너',
      nextSlideMessage: '다음 배너',
    },
    navigation:{
      nextEl:'.notice_next',
      prevEl:'.notice_prev',
    },
    pagination: {
      el: '.pagination_num',
      type: 'fraction',
    }
  });

  $('.banner2  .btn').on('click', (e)=>{
    e.preventDefault();
    e.stopPropagation();
    //console.log(e.target);
    $(e.target).addClass('active').siblings().removeClass('active');
  });

 $('.banner2 .notice_pause').click(function () {
    swiper_notice.pause();
      //slide1.slick('slickPause');
  });
    
  $('.banner2 .notice_play').click(function () {
    swiper_notice.play();
      //slide1.slick('slickPlay');
  }); 
  
  


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



}); // jQuery 로딩 끝 - 공단소식, 문화공공체육 시설


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



