
(function ($) {
  $.fn.scrollTo = function (elem, speed) {
    $(this).animate({
      scrollTop: $(this).scrollTop() - $(this).offset().top + $(elem).offset().top
    }, speed == undefined ? 1000 : speed);
    return this;
  };
  $.fn.njTimepick = function () {
    init(this);
    function init(timeInputs) {
      var totalTimeInputs = timeInputs.length,
        timeInput = undefined,
        type = undefined,
        i = 0;
      for (i; i < totalTimeInputs; i++) {
        timeInput = $(timeInputs[i]);
        timeInput.addClass('nj-timepick-input');
        settings(timeInput);
      }
      /******** Settings for each input******/
      function settings(timeInput) {
        createPopup();
        popupSettings();
        timeInputClickEvent(timeInput);
        timeInputChangeEvent(timeInput);
      }
      function createPopup() {
        var popupPresent = $('.nj-timepick').length > 0;
        if (popupPresent) return; // return immediately if popup is present
        var template = '\
                                  <div class="nj-timepick"> \
                                      <div class="time_stat">\
                                        <span class="md">오전</span>\
                                        <span class="hh">01</span>\
                                        <span class="mm">00</span>\
                                      </div>\
                                      <div class="nj-timepick__panel">\
                                      <div class="nj-timepick__boxes-column nj-timepick__meridians">\
                                        <div val="오전" class="nj-timepick__box nj-timepick__meridian  nj-timepick__box--active">오전</div>\
                                        <div val="오후" class="nj-timepick__box nj-timepick__meridian">오후</div>\
                                      </div>\
                                      <div class="nj-timepick__boxes-column nj-timepick__hours">\
                                              '+ createBoxes("hours", 1, 12, 1, "hour") + '\
                                      </div>\
                                      <div class="nj-timepick__boxes-column nj-timepick__minutes">\
                                              '+ createBoxes("minutes", 0, 59, 0, "minute") + '\
                                      </div>\
                                  </div>\
                      ';
        $('body').append(template);
        /* Create hours and minute boxes */
        function createBoxes(type, start, end, activateDigit, boxClass) {
          var template = '<div class="nj-timepick__boxes nj-timepick__' + type + '-boxes">';
          for (start; start <= end; start++) {
            activeClass = start === activateDigit ? "nj-timepick__box--active " : "";
            value = ('0' + start).slice(-2);
            template += '\
                                    <div val="'+ value + '" class=" ' + activeClass + 'nj-timepick__box nj-timepick__' + boxClass + '">\
                                      '+ value + '\
                                    </div>\
                                 ';
          }
          template += '</div>';
          return template;
        }
      }
      function popupSettings() {
        setTimeout(function () {
          var njTimePick = $('.nj-timepick');
          timeClick();
          popupOutsideClick();
          function timeClick() {
            njTimePick.find('.nj-timepick__box').on('click', function () {
              var box = $(this),
                value = box.text().trim(),
                statBox = box.closest('.nj-timepick').find('.time_stat');
              box.addClass('nj-timepick__box--active')
                .siblings()
                .removeClass('nj-timepick__box--active');
              if(box.hasClass('nj-timepick__meridian')){
                statBox.children('.md').text(value);
              }
              if(box.hasClass('nj-timepick__hour')){
                statBox.children('.hh').text(value);
              }
              if(box.hasClass('nj-timepick__minute')){
                statBox.children('.mm').text(value);
              }
              setTimeout(function () { setTime() }, 300);
            });
            function setTime() {
              var hourActive = njTimePick.find('.nj-timepick__hours .nj-timepick__box--active'),
                minuteActive = njTimePick.find('.nj-timepick__minutes .nj-timepick__box--active'),
                meridianActive = njTimePick.find('.nj-timepick__meridians .nj-timepick__box--active'),
                hourValue = hourActive.text().trim(),
                minuteValue = minuteActive.text().trim(),
                meridianValue = meridianActive.text().trim(),
                timeIn24hr = to24hrFormat(hourValue, minuteValue, meridianValue);
              $(".nj-timepick__hours-boxes").scrollTo(hourActive, 100);
              $(".nj-timepick__minutes-boxes").scrollTo(minuteActive, 100);
              $('.nj-timepick-input--active').val(timeIn24hr);
            }
          }
          function popupOutsideClick() {
            $(document).mouseup(function (e) {
              var container = njTimePick.find('.nj-timepick__panel');
              // if the target of the click isn't the container nor a descendant of the container
              if (!container.is(e.target) && container.has(e.target).length === 0) {
                $('.nj-timepick-input--active').removeClass('nj-timepick-input--active');
                njTimePick.removeClass('nj-timepick--active');
              }
            });
          }

        }, 500);
      }
      function timeInputClickEvent(timeInput) {
        timeInput.on('click', function () {
          var popup = $('.nj-timepick'),
            alreadyActive = timeInput.hasClass('nj-timepick-input--active');
          $('.nj-timepick-input--active').removeClass('nj-timepick-input--active');
          if (alreadyActive) return;
          var clickedTime = timeInput.val();
          if (clickedTime != '') changeTimeInPopup(clickedTime, 'scroll-enable');
          popup.removeClass('nj-timepick--active');
          timeInput.addClass('nj-timepick-input--active');
          popup.addClass('nj-timepick--active');
          
          //시간창 추가
          var pX = $(this).offset().left,
          pY = $(this).offset().top + 4,
          itemH = $(this).outerHeight();
          $('.nj-timepick').css({left:pX , top:pY + itemH});
        });

      }
      function timeInputChangeEvent(timeInput) {
        timeInput.on('change', function () {
          var changedTime = timeInput.val();
          if (changedTime != '') changeTimeInPopup(changedTime, 'scroll-disable');
        });
      }
      function changeTimeInPopup(clickedTime, scroll) {
        var timeObj = convert24hrToNormal(clickedTime),
          hour = timeObj.hour,
          minute = timeObj.minute,
          meridian = timeObj.meridian,
          boxesToActivate = $('.nj-timepick__hour[val="' + hour + '"] , \
                             .nj-timepick__minute[val="' + minute + '"] , \
                             .nj-timepick__meridian[val="' + meridian + '"]');
        boxesToActivate.addClass('nj-timepick__box--active')
          .siblings()
          .removeClass('nj-timepick__box--active');
        if (scroll === 'scroll-enable') {
          $(".nj-timepick__hours-boxes").scrollTo(boxesToActivate[0]);
          $(".nj-timepick__minutes-boxes").scrollTo(boxesToActivate[1]);
        }
      }

      function to24hrFormat(hour, minute, meridian) {
        if (hour === '12') hour = '00';
        if (meridian === '오후') hour = parseInt(hour, 10) + 12;
        return  hour + ':' + minute;
      }
      function convert24hrToNormal(time) {
        var splitTime = time.split(':'),
          hour = splitTime[0],
          minute = splitTime[1],
          suffix = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12;
        hour = hour < 10 ? "0" + hour : hour;
        var suffix2 = suffix == 'PM'? '오후' : '오전';
        $('.time_stat .md').text(suffix2);
        $('.time_stat .hh').text(hour);
        $('.time_stat .mm').text(minute);
        return {
          hour: hour,
          minute: minute,
          meridian: suffix
        }
      }
    }    
  };
  function timePicker() {
    var timeInputs = $('.inp.time input');
    timeInputs.njTimepick();
  }
  $(window).on('load', function () {

    timePicker();
  })
}(jQuery));