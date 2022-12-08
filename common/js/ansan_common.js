var elFocus, headH, headHen; //포커스요소 저장하는 전역변수

function mGnbInit() {
    //모바일내비게이션 초기화
    $('.dep2_wrap ul > li').each(function () {
        if ($(this).children('ol').length) {
            $(this).children('a').addClass('menu_btn');
        }
    });
}
function focusLoop() {
    //이벤트가 발생한 요소의 상위 tabindex="0"을 찾아 포커스이동
    $(event.target).closest('[tabindex="0"]').focus();
}
function openPopup2(arg) {
    //복수 팝업
    saveFocus(); //이벤트 발생한 요소 기억
    $('.modal_wrap .modal_pop').hide();
    $('.modal_wrap')
        .fadeIn()
        .find('.modal_pop[data-pop="' + arg + '"]')
        .show()
        .attr('tabindex', '0')
        .focus();
}
function closePopup() {
    $('.modal_wrap').fadeOut().find('.modal_pop').removeAttr('tabindex', '0');
    returnFocus();
}

function pcChk(width) {
    //창크기 width보다 크면 true 반환
    if ($(window).width() > width) {
        return true;
    } else {
        return false;
    }
}
function mChk(width) {
    //창크기 768px보다 크면 true 반환
    if ($(window).width() < width) {
        return true;
    } else {
        return false;
    }
}

function imgResize() {
    //이미지 사이즈 조절
    if (pcChk(720) && $('.img').length > 0) {
        function imgResizeH() {
            $('.img').each(function () {
                var imgBoxH, imgH, img;
                imgBoxH = $(this).height();
                img = $(this).children('img');
                imgH = img.height();
                if (imgBoxH > imgH) {
                    img.width('auto').height('100%');
                }
            });
        }
        $('.img').each(function () {
            var imgBoxW, imgW, img;
            imgBoxW = $(this).width();
            img = $(this).children('img');
            imgW = img.width();
            if (imgBoxW > imgW) {
                //이미지box가 클경우
                img.width('100%').height('auto');
                imgResizeH();
            } else {
                imgResizeH();
            }
        });
    } else {
        $('.img img').removeAttr('style');
    }
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

function openSitemap() {
    //사이트맵 gnb복사 후 열기
    $('#gnb > ul').clone().appendTo('.m_gnb');
    $('.m_gnb .dep2_wrap').removeAttr('style');
    $('.m_gnb > ul > li').filter(':first-child').addClass('active');
    $('.m_gnb > ul > li').filter(':first-child').children('.dep2_wrap').addClass('active');
    $('.m_gnb').stop().fadeIn().attr('tabindex', '0').focus();
    $('.m_gnb > ul > li > a').on('click', function (e) {
        $('.m_gnb .dep2_wrap').removeClass('active');
        $(this).parent().addClass('active').siblings().removeClass('active');
        $(this).next().addClass('active');
        e.preventDefault(); // 1뎁스 메뉴 클릭시 이벤트 막기
    });
}

function closeSitemap() {
    //사이트맵 닫고 복사한 nav 지우기
    $('.m_gnb')
        .stop()
        .fadeOut(function () {
            $(this).children('ul').remove();
        })
        .removeAttr('tabindex');
}

function resizeHeadHeight(target) {
    //pc화면에서 gnb모션
    if (pcChk(1085)) {
        var dep2H = $(target).next('.dep2_wrap').outerHeight();
        $('#gnb')
            .stop()
            .animate({ height: headH + dep2H + 'px' }, 200, function () {
                $('.header').addClass('active');
            });
        $(target).closest('li').addClass('active').closest('li').siblings('li').removeClass('active');
    }
}

function gnbReset() {
    //gnb 초기화
    if (pcChk(1085)) {
        $('#gnb')
            .stop()
            .animate({ height: headH + 'px' }, 200, function () {
                $('.header').removeClass('active');
                $('.header #gnb > ul > li').removeClass('active');
            });
    }
}

function tabBoxSizing() {
    if ($('.tab_box').length) {
        //active li의 높이를 구하고 tab_box 높이 설정
        var tabConH = $('.tab_box').find('.active > div').outerHeight();
        var tabH = $('.tab_box').find('li').outerHeight();
        $('.tab_box').height(tabConH + tabH);
    }
}

function gnbFloatClear() {
    // dep2Wrap의 너비보다 li의 너비가 클경우 해당 번째요소에 clearfix
    var dep2W = $('.header .dep2_wrap > ul').width(),
        dep2Li = $('.header .dep2_wrap > ul > li');
    dep2Li.removeClass('clear');
    dep2Li.each(function () {
        var i = 0;
        var li = $(this).closest('ul').children('li');
        var dep2LiWidth = 0;
        while (i < li.length) {
            dep2LiWidth += li.eq(i).outerWidth(true);
            if (dep2W < dep2LiWidth) {
                li.eq(i).addClass('clear');
                dep2LiWidth = 0;
                continue;
            }
            i++;
        }
    });
}

function openSearch() {
  $('.header .util > .search_box,.btn_search_open').addClass('active');
  $(".btn_search_text").html("검색창 닫기");
    var schBoxH = $('.search_box').outerHeight();
    $('#gnb')
        .stop()
        .animate({ height: headH + schBoxH + 'px' }, function () {
            $('.header').addClass('active');
        });
    return false;
}

function resetSearch() {
    $('#gnb')
        .stop()
        .animate({ height: headH + 'px' }, function () {
            $('.util > .search_box, .btn_search_open').removeClass('active');
            $(".btn_search_text").html("검색창 열기");
            $('.header').removeClass('active');
        });
}
function resetSearch2() {
    $('.util > .search_box,.btn_search_open').removeClass('active');
    $(".btn_search_text").html("검색창 열기");
}

function openPopup() {
    saveFocus(); //이벤트 발생한 요소 기억
    $('.modal_wrap').fadeIn().find('.modal_pop').attr('tabindex', '0').focus();
}
function closePopup() {
    $('.modal_wrap').fadeOut().find('.modal_pop').removeAttr('tabindex', '0');
    returnFocus();
}

function tabContent() {
    //컨텐츠 딸린 탭 온오프
    var i = $('.tab_list3 > ul > li.active').index();
    $('.tab_list3 > ol > li').removeClass('active');
    $('.tab_list3 > ol > li').eq(i).addClass('active');
}
function lnbInit() {
    $('.m_gnb > ul > li .dep2_wrap > ul > li').each(function () {
        if ($(this).children().is('ol')) {
            $(this).children('a').addClass('dep_on');
        }
        if ($(this).hasClass('active')) {
            $(this).children('ol').show();
        }
    });
}
function lnbInit2() {
    $('.m_gnb > ul > li .dep2_wrap > ul > li > ol > li').each(function () {
        if ($(this).children().is('ol')) {
            $(this).children('a').addClass('dep_on');
        }
        if ($(this).hasClass('active')) {
            $(this).children('ol').show();
        }
    });
}
function m_fadeOut() {
    if (pcChk(1085)) {
        $('.m_gnb').fadeOut(300);
        $('.m_gnb > ul > li').removeClass('active');
        $('.m_gnb .dep2_wrap').removeClass('active');
        bodyScroll('on'); //body 스크롤 보이기
    }
}
$(document).on('click', '.tab_list > li > a,.tab_list3 > ul > li > a', function () {
    //탭 클릭시 active
    var tab = $(this).parent('li');
    var tabAll = $(this).parent('li').siblings('li');
    tabAll.removeClass('active').children('a').removeAttr('title');
    tab.addClass('active').children('a').attr('title', '선택됨');
});
$(document).on('click', '.m_gnb .dep2_wrap > ul > li > a', function () {
    var acti = $(this).parent();
    // var innerMenu2 = $(this).next();
    // if (innerMenu2.length > 0 && !pcChk(1085)) {
    //     $(this).next().stop().slideUp(200);
    //     innerMenu2.stop().slideToggle(200);
    // }
    // $('.m_gnb .dep2_wrap > ul > li').removeClass('active');
    // $('.m_gnb .dep2_wrap > ul > li > ol').removeClass('active');
    $(acti).toggleClass('active').children('ol').toggleClass('active');
    $(acti).siblings().removeClass('active').children('ol').removeClass('active');
    if ($(acti).children().is('ol')) {
    	return false;
    }
});
$(document).on('click', '.m_gnb .dep2_wrap > ul > li > ol > li > a', function () {
    var acti2 = $(this).parent();
    var innerMenu3 = $(this).next();
    if (innerMenu3.length > 0 && !pcChk(1085)) {
        $(this).next().stop().slideUp(200);
        innerMenu3.stop().slideToggle(200);
    }
    $(acti2).toggleClass('active');
    $(acti2).siblings().removeClass('active').children('ol').stop().slideUp(200);
    if ($(acti2).children().is('ol')) {
    	return false;
    }
});
$(function () {
    headH = $('#gnb').outerHeight(); //기본 헤더 높이 전역변수
    tabContent(); //선택탭 컨텐츠 노출
    //함수실행
    $('.modal_open').on('click', function () {
        //모달팝업 오픈
        bodyScroll('off');
        openPopup();
        popSlide.slick('setPosition'); //슬라이드 리셋
    });
    $('.modal_close button').on('click', function () {
        //모달팝업 닫기
        closePopup();
        bodyScroll('on');
    });
    $(document).on('keydown', '.modal_close .loop', function (e) {
        //팝업닫기 버튼에서 탭클릭시 팝업으로 초점이동
        var isShift = window.event.shiftKey ? true : false;
        if (isShift && e.keyCode == 9) {
            return;
        } else if (event.keyCode == 9) {
            focusLoop();
            return false;
        }
    });

    $('.btn_search_open').on('click', function () {
        if (!$(this).hasClass('active')) {
            openSearch();
        } else {
            resetSearch();
        }
        return false;
    });

    $('.header #gnb > ul > li > a').on({
        //헤더 높이조절
        mouseenter: function () {
            resizeHeadHeight(this);
            resetSearch2();
        },
        focusin: function () {
            resizeHeadHeight(this);
            resetSearch2();
        },
    });
    $('.header #gnb').on({
        mouseleave: function () {
            gnbReset(); //헤더 높이 초기화
            if (pcChk(1085)) {
                resetSearch2();
            }
        },
    });

    $('.header #gnb .dep2_wrap a')
        .last()
        .on({
            focusout: function () {
                gnbReset(); //헤더 높이 초기화
            },
        });

    // 사이트맵 열기
    $('.m_btn_sitemap_open').on('click', function () {
        openSitemap(); //사이트맵 열기
        saveFocus(); //포커스 요소 저장
        bodyScroll('off'); //body 스크롤 없애기
        lnbInit();
        lnbInit2();
    });
    // 사이트맵 닫기
    $('.btn_sitemap_close').on({
        click: function () {
            closeSitemap(); //사이트맵닫기
            returnFocus(); //이전 포커스 요소로 되돌리기
            bodyScroll('on'); //body 스크롤 보이기
        },
        focusout: function () {
            focusLoop(); //포커스 반복
        },
    });

    //메인배너 슬라이드
    var mbSlide = $('.slide_area');
    mbSlide.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.slide .pagination_num').html('<span class="current">' + i + '</span> / ' + slick.slideCount);
    });
    mbSlide.slick({
        variableWidth: true,
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: 'ease-in',
        dots: true,
        appendDots: $('.slide .mb_paging'),
        customPaging: function (slide, i) {
            return '<button type="button" class="mb_dot"><span class="hide">' + (i + 1) + '번째 배경으로' + '</span></button>';
        },
        prevArrow: $('.slide > div .prev'), //arrow 설정
        nextArrow: $('.slide > div .next'), //arrow 설정
        responsive: [
            {
                breakpoint: 1000,
                settings: {
                    centerMode: true,
                    variableWidth: true,
                    slidesToShow: 5,
                },
            },
        ],
    });

    //메인배너 슬라이드
    var popSlide = $('.pop_slide');
    popSlide.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.pop .pagination_num').html('<span class="current">' + i + '</span> / ' + slick.slideCount);
    });
    popSlide.slick({
        variableWidth: true,
        slidesToShow: 2,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: 'ease-in',
        dots: false,
        prevArrow: $('.pop .prev'), //arrow 설정
        nextArrow: $('.pop .next'), //arrow 설정
    });
    $('.slide .stop,.pop .stop').click(function () {
        if ($(this).hasClass('play')) {
            $(this).removeClass('play').children('span').text('자동재생 정지');
            $(this).parent().prev().slick('slickPlay');
        } else {
            $(this).addClass('play').children('span').text('자동재생 시작');
            $(this).parent().prev().slick('slickPause');
        }
    });
    //주요서비스 슬라이드
    var sSlide = $('.ser_slide');
    sSlide.slick({
        variableWidth: true,
        slidesToShow: 8,
        autoplay: false,
        cssEase: 'ease-in',
        dots: false,
        prevArrow: $('.service > div .prev'), //arrow 설정
        nextArrow: $('.service > div .next'), //arrow 설정
        responsive: [
          {
              breakpoint: 1900,
              settings: {
                  slidesToShow: 7,
                  infinite: true,
                  swipeToSlide: true,
              },
          },
      ],
    });
    //참여도시 슬라이드
    var lSlide = $('.link_slide');
    var maxItems = Math.round(lSlide.width() / 124);
    console.log(maxItems);
//    if (pcChk(1063)) {
//        lSlide.on('afterChange', function (event, slick, currentSlide) {
//            var i = currentSlide; // 이동하는 갯수
//            var ii = lSlide.find('.item').length - maxItems; //현재 슬라이드 갯수
//            if (i == ii) {
//                lSlide.slick('slickGoTo', 0);
//            }
//        });
//    }
    lSlide.slick({
        variableWidth: true,
        infinite: false,
//        slidesToShow: maxItems,
        slidesToShow: 9,
        speed: 350,
        slidesToScroll: 1,
        autoplay: false,
        cssEase: 'ease-in',
        initialSlide: 0,
        dots: false,
        prevArrow: $('.link > div .prev'), //arrow 설정
        nextArrow: $('.link > div .next'), //arrow 설정
        responsive: [
          {
              breakpoint: 1900,
              settings: {
                  infinite: true,
                  slidesToShow: 8,
                  swipeToSlide: true,
              },
          },
      ],
    });
    $(lSlide).slick('refresh');

    //메인배너 슬라이드
    var tourSlide1 = $('.tour .slide1');
    tourSlide1.on('afterChange', function (event, slick, currentSlide, nextSlide) {
        var i = currentSlide;
        $('.tour .indicator .item').removeClass('active').eq(i).addClass('active');
    });
    tourSlide1.slick({
        infinite: true,
        autoplay: false,
        cssEase: 'ease-in',
        speed: 0,
        dots: true,
        fade: false,
        prevArrow: $('.tour .prev'), //arrow 설정
        nextArrow: $('.tour .next'), //arrow 설정
        asNavFor: '.slide2',
    });
    //관광도시 슬라이드2
    var tourSlide2 = $('.tour .slide2');
    tourSlide2.slick({
        infinite: true,
        variableWidth: true,
        autoplay: false,
        cssEase: 'ease-in',
        dots: false,
        fade: false,
        asNavFor: '.slide1',
    });
    $('.tour .indicator .item').on('click', function () {
        var i = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $('.tour .slide1 .slick-dots li').eq(i).click();
    });
    // indicator
    $('#indicator li a').on('click', function () {
        if (!$(this).parent().hasClass('active') && pcChk(1480)) {
            mainNavi = $(this).attr('data-mainnavi');
            mainRowTop = $('[data-mainrow=' + mainNavi + ']').offset().top;
            $('html,body').stop().animate({ scrollTop: mainRowTop }, 700);
        }
        return false;
    });
    $('html, body').on('mousewheel', function () {
        $('html,body').stop(true); // main_navi 로 섹션 이동 중 마우스휠 사용시 animate 정지
    });
    var winY = 0,
        mainRowLeng = $('[data-mainrow]').length;
    $(window).on('scroll', function () {
        winY = $(this).scrollTop();
        for (var i = 0; i < mainRowLeng; i++) {
            if (winY >= $('[data-mainrow]').eq(i).offset().top - 50 && pcChk(1480)) {
                $('#indicator li:eq(' + i + ') a')
                    .attr('title', '선택됨')
                    .parent()
                    .addClass('active')
                    .siblings()
                    .removeClass('active')
                    .children()
                    .attr('title', '');
            }
        }
    });

    $('.pop_open').on('click', function () {
        //팝업 열기
        var popName = $(this).data('pop');
        bodyScroll('off');
        openPopup2(popName);
        return false;
    });
    $('.modal_close button').on('click', function () {
        //모달팝업 닫기
        closePopup();
        bodyScroll('on');
    });
    $(document).on('keydown', '.modal_close .loop', function (e) {
        //팝업닫기 버튼에서 탭클릭시 팝업으로 초점이동
        var isShift = window.event.shiftKey ? true : false;
        if (isShift && e.keyCode == 9) {
            return;
        } else if (event.keyCode == 9) {
            focusLoop();
            return false;
        }
    });

    $('.guideLine .menu > li > a').click(function () {
        $(this).parent().toggleClass('active').siblings().removeClass('active');
        $(this).next().stop().slideToggle(300).parent().siblings().children('ol').stop().slideUp();
        return false;
    });
    $(document).on('click', function (e) {
        $('.guideLine .menu > li > ol').stop().slideUp();
    });

    $(document).on('click', function (event) {
        if (!$(event.target).closest('.acodian2 button').length) {
            $('.acodian2 ul').stop().slideUp().parents('li').removeClass('active');
        }
    });
    //공통 - 아코디언
    $('.lang > button').click(function () {
        var parents = $(this).parent();
        parents.hasClass('active') ? parents.removeClass('active') : parents.addClass('active');
        $(this).next().stop().slideToggle(300);
    });
    //클릭 초기화
    $(document).on('click', function (e) {
        if (!$(e.target).closest('.lang').length) {
            $('.lang').removeClass('active').children('ol').stop().slideUp(300);
        }
    });
    //탭 셀렉트
    $('.tab_select ul > li > a').on('click', function () {
        $(this)
            .addClass('active')
            .attr('title', '선택됨')
            .parent('li')
            .siblings('li')
            .children('a')
            .removeClass('active')
            .removeAttr('title');
        $(this).closest('ul').stop().slideUp().parents('li').removeClass('active');
    });

    //공통 - 탭컨텐츠
    $('.tab_box > li > button').on('click', function () {
        $(this).closest('li').addClass('active').closest('li').siblings('li').removeClass('active');
        tabBoxSizing();
        $(this).attr('title', '탭 선택됨').closest('li').siblings().find('button').attr('title', '탭');
    });

    //푸터 updown

    $('.acodian2 >li button').click(function () {
        $(this).parent().toggleClass('active').siblings().removeClass('active');
        $(this).next().stop().slideToggle(250).parent().siblings().children('ul').stop().slideUp();
        return false;
    });

    $(document).on('click', function (e) {
        $('.acodian2 > li > ul').stop().slideUp();
        $('.acodian2 >li').removeClass('active');
    });
});
$(window).on('resize load', function () {
    if (mChk(720)) {
        $('.city > ul > li.booking').addClass('active');
    } else {
        $('.city > ul > li.booking').removeClass('active');
    }
    headH = $('#gnb').outerHeight(); //기본 헤더 높이 전역변수
    $('#gnb').removeClass('active').removeAttr('style');
    if (pcChk(1085)) {
        gnbFloatClear();
    }
    bodyScroll('on'); //body 스크롤 보이기
    m_fadeOut();
    imgResize(); //.img 이미지 사이즈 조절
});
