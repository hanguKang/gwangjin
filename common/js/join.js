function join(){
	let joinObj = {
		$tabSel : $(".typebox .tit a"),
		$iconChk : $(".form_list .list span"),
		$inputChk : $("label > input[type='checkbox']"),
		$inputRad : $("label > input[type='radio']"),
		$chkAll : $("input[type='checkbox'].chk_all").parent(),
		$inputSel : $("select"),
		$placeholder : $(".guide_txt"), //가이드라인 글자
		setFn : function () {
			for(let i = 0; i < joinObj.$inputChk.length; i++){
				joinObj.checkSet ( joinObj.$inputChk.eq(i) );
			}//form checkbox
			for(let i = 0; i < joinObj.$inputRad.length; i++){
				joinObj.radSet ( joinObj.$inputRad.eq(i) );
			}//form radio
			(joinObj.$placeholder.length > 0 )? joinObj.placeholder() : null ; // placeholder
			//join_content
		},
		tabFn : function ( $hit ){
			let focusElString = 'a[href], button:not([disabled])';
			let focusEl = $hit.parents(".typebox").siblings("div").find(focusElString);

			focusEl.attr({'tabindex':'-1', 'aria-hidden':'true'});
			$hit.parents(".typebox").find(focusElString).attr({'tabindex':'0', 'aria-hidden':'false'});
			$hit.parents("div").find("> .typebox h3 a").attr({'tabindex':'0', 'aria-hidden':'false', 'aria-current':'false'});
			$hit.parents("div").find("> .typebox").removeClass("select");
			$hit.attr("aria-current", true).parents(".typebox").addClass("select");
		},
		ariaButton : function (){
			let btns = document.querySelectorAll('[role="button"]');
			btns.forEach(function (btn) {
				btn.addEventListener("keydown", function (e) {
					if (e.keyCode === 32 || e.keyCode === 13) {
						btn.click();
						e.preventDefault();
					}
				});
				if ($(btn) !== $("a [href]")) {
					btn.setAttribute('tabindex', '0');
				}
			});
		},
		checkSet : function ( $chk ) {
			let classTxt , otherClass , idTxt ;
			otherClass = $chk.attr("class").split("chk").pop();
			(otherClass.length)? classTxt = "icon_bg text_label " + otherClass : classTxt = "icon_bg text_label";
			idTxt = "agree_" + ($chk.closest(".list").index() + 1);
			$chk.parent("label").wrap(
				$("<div>").addClass(classTxt).attr("id", idTxt)
			);
			$chk.parents(".text_label").next(".btn_agreeview").attr("aria-describedby", idTxt);
		},
		radSet : function ( $rad ) {
			let classTxt , otherClass ;
			otherClass = $rad.attr("class").split("chk").pop();
			(otherClass.length)? classTxt = "icon_bg radio_label " + otherClass : classTxt = "icon_bg radio_label";
			$rad.parent("label").wrap(
				$("<div>").addClass(classTxt)
			);
		},
		checkFn : function ($chk) {
			if( $chk.find('input').hasClass('chk') ){
				let $hit = $chk.find('input');
				if ( $hit.is(":checked") ){
					$hit.prop("checked",false);
					$chk.removeClass("sel");
				}else{
					$hit.prop("checked",true);
					$chk.addClass("sel");
				}
			}else if( $chk.find('input').hasClass("chk_all") ){
				let group = $chk.find('input').attr("class").split(" ").pop(),
					$chkList = $("input."+group);

				if($chk.find("input").is(":checked") ){
					$chkList.prop("checked", false );
					$chkList.closest(".text_label").removeClass("sel");
				}else{
					$chkList.prop("checked", true );
					$chkList.closest(".text_label").addClass("sel");
				}
			}
		},
		radioFn : function ( $rad ){
			let $hit = $rad.find("input"),
				$grInput = $rad.closest().find("input[name='"+grName+"']"),
				grName = $hit.attr("name");
			$grInput.prop("checked", false );
			$hit.prop("checked", true );
			$rad.closest(".list").find(".radio_label").removeClass("sel");
			$rad.addClass("sel");
		},
		placeholder : function(){ // .guide_txt (가이드 글자)  이벤트 
			let $inputType;
			let $input = joinObj.$placeholder.closest(".list").find("input");
			joinObj.$placeholder.click(function(){ //.guide_txt (가이드 글자) 클릭하면 ==> 가이드 글자 사라지고, input요소에 focus된다. 
			  if( $(this).closest(".list").find("input").attr("readonly") != "readonly"){
					( $(this).parent().hasClass("textarea") ) ? $inputType = "textarea" : $inputType = "input" ;
					$(this).addClass("for-a11y");//.for-a11y 클래스 ==> 가이드 text는 사라지고 글자 숨기기
					if($(this).has('alert')){
						$(this).removeClass('alert');
					}
					$(this).parent().find($inputType).eq(0).focus(); //첫번째 input요소에 focusing
				}else{
					$(this).addClass("for-a11y");
					$(this).parent().find('button').eq(0).focus(); //첫번째 button요소에 focusing
				} //if End
			});
			joinObj.$placeholder.keyup(function(event) {//.guide_txt에 키업을 하면,
				event.preventDefault();
			  let KEY = event.code;
				console.log(KEY);
				if (KEY === "Enter" || KEY === "NumpadEnter") {
				 joinObj.$placeholder.trigger('click');
			  }
				 
			});
      //존재하는 모든 input요소들
			$input.focus(function(){
				if( $(this).attr("readonly") != "readonly" || $(this).val() != ""){ // 작동할 수 있는 보통 input 요소라면 
					$(this).parent().find("> .guide_txt").addClass("for-a11y");
				}
			}).blur(function(){
        //값이 없거나 undefined라면 
				if($(this).siblings("input").val() == undefined){
					( $(this).val() == "" )? $(this).parent().find(".guide_txt").removeClass("for-a11y") : $(this).parent().find(".guide_txt").addClass("for-a11y");
				}else{
					( $(this).val() == "" && $(this).siblings("input").val() == "" )? $(this).parent().find(".guide_txt").removeClass("for-a11y") : $(this).parent().find(".guide_txt").addClass("for-a11y");
				}
			}).change(function(){
				if($(this).val() == "" && $(this).siblings("input").val() == ""){
					$(this).parent().find(".guide_txt").removeClass("for-a11y");
				}else {
					$(this).parent().find(".guide_txt").addClass("for-a11y");
				}
			})//.blur();

			 joinObj.$placeholder.closest(".list").find("textarea").blur(function () {
				 ( $(this).val() == "" )? $(this).parent(".textarea").find(".guide_txt").removeClass("for-a11y") : $(this).parent(".textarea").find(".guide_txt").addClass("for-a11y");
			 }).change(function() {
			 ( $(this).val() == "" )? $(this).parent(".textarea").find(".guide_txt").removeClass("for-a11y") : $(this).parent(".textarea").find(".guide_txt").addClass("for-a11y");
			 });
		},
		eventBlock : function (e){
			if(e.preventDefault) e.preventDefault();
			else e.returnValue = false;
		},
		dropDown : function (){
			$(".button__drop-down").on({ //드롭다운 나타나게하는 버튼을 클릭하면
				click : function () {
          //alert(1324);
					$(this).next('.select_box').toggleClass('on');

					$(this).closest(".list").css({"z-index":"2"}).siblings("li").css({"z-index":"0"}).find(".select_box").removeClass("on");
					($(this).parent().hasClass("on") ) ? $(this).parent().removeClass("on") : $(this).parent().addClass("on");
					$('.form_list').css("position","static");
				}
			});
			$(".select_box .button__option").on({ //각 dropdown 목록들의 버튼들을 클릭
				click : function () { //
					let hit = $(this).text();
          
					let selBox = $(this).parents('.select_box'); //div
          let input_email = selBox.parents('.list').find('input.email');
          
          console.log(input_email);
					selBox.prev('.button__drop-down').find('.text').text(hit); //내부 글자 변경하기
					$(this).parent('li').addClass('on').siblings().removeClass('on');

					if( selBox.parents('.list').find('input').hasClass('email') ){
            //console.log(5678);
						if (hit == "직접입력") { 
              //alert(45679);
							
							//input_email.val("").focus();
              setTimeout(()=>{input_email.val("").focus();},300); 
            }else{
              input_email.val(hit);
            }
             
						//input_email.blur();
					}
					$(this).parents('li').css({"z-index":"0"});
          selBox.removeClass("on")
					$('.form_list').css("position","relative");
				}
			});
		},
		ariaExpanded : function (){ //드롭다운 메뉴를 나타나게 하는 버튼에 관한 메소드
			let expandButtons = document.querySelectorAll('[aria-expanded][aria-controls]'); //input요소 내부의 버튼 
			expandButtons.forEach(function (expandButton) {
				expandedEvent(expandButton);
			});

			function expandedEvent(btn) {
				if (btn.expandEvent) {
					return false;
				}
				btn.expandEvent = true;
				let beforeOuterHtml;
				let ua = navigator.userAgent.toLowerCase();
				let isAndroid = /(android)/i.test(ua);
				if (isAndroid) {
					btn.addEventListener("mousedown", function () {
						let expandEl = document.querySelector("#" + btn.getAttribute("aria-controls")); //아래로 확장되는 dropdown메뉴
						beforeOuterHtml = expandEl.outerHTML
					})
				} else { //안드로이드가 아니라면,  pc 등이 될려나?
          
					btn.addEventListener("focus", function () { //click도 focus에 들어간다. 
            //console.log(1234);
						let expandEl = document.querySelector("#" + btn.getAttribute("aria-controls"));
						beforeOuterHtml = expandEl.outerHTML; //#1
            //console.log(beforeOuterHtml);
					})
				}
				btn.addEventListener("click", function () {//버튼 클릭
					setTimeout(function () { //0.5초 이후에 시작하는 것은 #1의 값을 먼저 넣기 위해서이다. 클릭하는 순간 blur 이벤트 발생 시작하기 위해서이다. 
            //console.log(1233+beforeOuterHtml);
						let expandEl = document.querySelector("#" + btn.getAttribute("aria-controls"));
            
						if (btn.parentElement === expandEl) { //버튼의 부모요소와 버튼과 연결된 확장요소(dropdown메뉴)가 같을리가 없다. - 여기는 들어올 방법 없어 보인다. 
							if (btn.getAttribute("aria-expanded") === "false" && beforeOuterHtml !== expandEl.outerHTML) { //버튼과 드롭다운 메뉴가 아직 연결되어 있지 않고 
                                                                                                             //191줄에서 할당된 beforeOuterHtml의 값이 현재요소와 연결된 dropdown메뉴가 같지않다면
								expandedOpen(btn, expandEl)
							} else if (btn.getAttribute("aria-expanded") === "true" && beforeOuterHtml !== expandEl.outerHTML) {//버튼과 드롭다운 메뉴가 연결됐고 
                                                                                                                  //191줄에서 할당된 beforeOuterHtml의 값이 현재요소와 연결된 dropdown메뉴가 같지않다면
								expandedClose(btn, expandEl)        
							}
						} else { // 일반적인 상황
              
							if (!expandEl) return;
							  expandButtons.forEach(function (expandButton) { //각 버튼들 하나씩 이벤트 핸들러를 할당한다. 
                
								let ariaControls = expandButton.getAttribute("aria-controls") 
								let expandEls = document.querySelector("#" + ariaControls);// 연결된 drop__down 메뉴들
                console.log(!expandEls.firstChild);
								if (window.getComputedStyle(expandEls).display === 'none') {
                   //alert('닫혀있었음');
									expandButton.setAttribute("aria-expanded", false);
                  
								} else if (expandEls.getAttribute('aria-hidden') === true) { // 연결된 drop__down 메뉴가 숨겨져있다면
									expandButton.setAttribute("aria-expanded", false);
								} else if (window.getComputedStyle(expandEls).display === 'block' && !expandEls.firstChild) { //연결되어 있으면서 동시에 !(글자가 있다면 true)==>false,
                                                                                                              //firstChild 공백이나 글자도 node가 된다. 
									expandButton.setAttribute("aria-expanded", false);
								}
							});

							if (btn.getAttribute("aria-expanded") === 'true' && window.getComputedStyle(expandEl).display === 'none') {
								expandedClose(btn, expandEl);
							} else if (btn.getAttribute("aria-expanded") === 'false' && window.getComputedStyle(expandEl).display === 'block' && expandEl.firstChild) {
								expandedOpen(btn, expandEl);
							} else if (btn.getAttribute("aria-expanded") === 'true' && expandEl.getAttribute('aria-hidden') === 'true') {
								expandedClose(btn, expandEl);
							} else if (btn.getAttribute('aria-expanded') === 'false' && expandEl.getAttribute('aria-hidden') === 'false') {
								expandedOpen(btn, expandEl);
							} else if (btn.getAttribute("aria-expanded") === 'true' && window.getComputedStyle(expandEl).display === 'block' && !expandEl.firstChild) {
								expandedClose(btn, expandEl);
							};

							if (expandEl) {
								expandEl.addEventListener('click', function () {
									setTimeout(function () {
										if (window.getComputedStyle(expandEl).display === 'none') {
											expandedClose(btn, expandEl);
											btn.focus();
										}
									}, 200);
								})
							}
						}
					}, 500)
				});
			}
			function expandedClose(btn, expandEl) {
				btn.setAttribute("aria-expanded", false);
			}
			function expandedOpen(btn, expandEl) {
				btn.setAttribute("aria-expanded", true);
			};
		},
		waiAriaListBox : function (){//접근성 이벤트로써, 드롭다운 메뉴의 목록(버튼 목록들)들에게 엔터나 화살표 키를 누르는 이벤트
			let boxBtns = document.querySelectorAll('[aria-haspopup="listbox"]'); //dropdown요소를 활성화 시키는 버튼
			boxBtns.forEach(function (boxBtn) {
				let ariaListBox = document.querySelector('#' + boxBtn.getAttribute("aria-controls")); //dropdown 리스트들을 감싸는 div요소
				let listOptions = ariaListBox.querySelectorAll('[role="option"]');//옵션으로 나타나는 dropdown 버튼들( dropdown 리시트들-목록들)

				boxBtn.addEventListener("click", function (e) {
					setTimeout(function () {
						if (boxBtn.getAttribute("aria-expanded", "true")) {
							const listSelected = ariaListBox.querySelector('[role="option"][aria-selected="true"]'); //dropdown button들 중 aria-selected=true값이 있는 요소가 있다면
							if (listSelected) {
								listSelected.focus();
							} else {
								listOptions[0].focus();
							}
						}
					}, 300);
				});

				boxBtn.addEventListener("keydown", function (e) {
					if (e.keyCode === 38) {
						// up
						boxBtn.click();
						e.preventDefault();
					}
					if (e.keyCode === 40) {
						// down
						boxBtn.click();
						e.preventDefault();
					}
				});

				let _loop = function _loop(i) {
					listOptions[i].tabIndex = -1;
					const listSelected = ariaListBox.querySelector('[role="option"][aria-selected="true"]');
					if (listSelected) {
						listSelected.tabIndex = 0;
					} else {
						listOptions[0].tabIndex = 0;
					}

					listOptions[i].addEventListener("click", function () {

						listSelectEvent(ariaListBox, listOptions[i]); //dropdown 목록인 버튼을 클릭하면 발생하는 이벤트 

						if (boxBtn.getAttribute("aria-expanded", "true")) {
							boxBtn.setAttribute("aria-expanded", "false")
						}
						boxBtn.focus();
					});

					listOptions[i].addEventListener("keydown", function (e) { //각 버튼들 키 이벤트
						if (e.keyCode === 13) { 
							// enter
							listOptions[i].click();
							e.preventDefault();
							e.stopPropagation();
						}
						if (e.keyCode === 38) {
							// up
							listOptions[i - 1].focus();
							e.preventDefault();
						}
						if (e.keyCode === 40) {
							// down
							listOptions[i + 1].focus();
							e.preventDefault();
						}
						if (e.keyCode === 9 || e.keyCode === 27) {
							// tab, esc
							boxBtn.click();
							boxBtn.focus();
							e.preventDefault();
						}
					});
				};

				for (let i = 0; i < listOptions.length; i++) {
					_loop(i);
				}
			});

			function listSelectEvent(ariaListBox, listOption) { // dropdown을 감싸는 요소,  dropdown 목록인 버튼중 클릭 발생하는 요소 --- 이렇게 2개의 인자가 존재
				const selected = ariaListBox.querySelector('[role="option"][aria-selected="true"]'); //elm.querySelectorAll('선택자')[0]와 동일하다. 
				if (!selected) {
					listOption.setAttribute("aria-selected", true);
				}
				if (selected !== listOption) { 
					if (selected !== null) {
						selected.setAttribute("aria-selected", false); //기존에 있던 aria-selected는 삭제하고
						listOption.setAttribute("aria-selected", true);// 클릭한 버튼에 aria-selected는 true를 부여한다. 
					} else {
						listOption.setAttribute("aria-selected", true);
					}
				}
			}
		}
	};
	joinObj.setFn();
	joinObj.dropDown();
	joinObj.ariaExpanded();
	joinObj.waiAriaListBox();
	joinObj.$tabSel.on({
		click : function (e) { joinObj.eventBlock(e); joinObj.tabFn( $(this) ); joinObj.ariaButton(); }
	});

	$(".text_label").on({
		"click" : function () {
			joinObj.checkFn( $(this) );
		},
		"keypress" : function(val){
			let keyCode = val.which || val.keyCode;
			if (keyCode == 13 || keyCode == 32) {
				joinObj.checkFn( $(this) );
			}
		}
	});

	$(".radio_label").on({
		"click" : function () {
			joinObj.radioFn( $(this) );
		},
		"keypress" : function(val){
			let keyCode = val.which || val.keyCode;
			if (keyCode == 13 || keyCode == 32) {
				joinObj.radioFn( $(this) );
			}
		}
	});

	$(".etc_text .radio_label").on("click", function(){
		$(this).parent().find("input").focus();
	});

	$(".etc_text input[type='radio']").on("focusin", function(){
		$(".etc_text .radio_label").css("z-index","1");
	}).on("focusout", function(){
		$(".etc_text .radio_label").css("z-index","3");
	});

	$(".etc_text input[type='text']").on("focus", function(){
		$(".etc_text .radio_label").css("z-index","1");
	}).on("blur", function(){
		( $(this).val().length > 0 )? $(".etc_text .radio_label").css("z-index","1") : $(".etc_text .radio_label").css("z-index","3");
	}).on("change", function(){
		( $(this).val().length > 0 )? $(".etc_text .radio_label").css("z-index","1") : $(".etc_text .radio_label").css("z-index","3");
	});

	$(".join_content").on('click', function(){
		$("#basic.select").parents(".join_content").removeClass("business").addClass("basic");
		$("#business.select").parents(".join_content").removeClass("basic").addClass("business");
	});
	$(".authentication_choice a").click(function(e){
		e.preventDefault();
		$(this).addClass("active").siblings().removeClass("active")
	});
	$('.js-toggle').on('click', function(){
		$(this).toggleClass('js-toggle--active');
		$(this).siblings('.box__iframe-agreement').toggleClass('box__iframe-agreement--active');
		($(this).is('.js-toggle--active')) ? $(this).text('닫기') : $(this).text('보기');
		return false;
	})

	//requried 
	const $_form = document.querySelector('form');
	const $_submit = document.querySelectorAll('[type="submit"]')[0];
	

	function showMsg(e){
			e.preventDefault(); //리로딩되는 것을 막는다. 
			//submit 이후 실행될 코드 
	}//subtmi 버튼 이후 handler

	//console.log($_submit);
	$_form.addEventListener('submit', showMsg, false); //submit을 클릭하면 바로 리로딩된다. 
	// $_form.addEventListener('input',event=>{
	// 	//document.getElementById('regi_usr_id').setCustomValidity('아이디를 형식에 맞게 입력해주세요.');
	// 	$_submit.disabled = !$_form.checkValidity();
	// })
	//
	
	//vaildation검사
	document.querySelectorAll("input").forEach(input => {
		//input.style.border = '1px solid green';
		//  input.addEventListener('blur',function(){
		// // 	//console.log(this);
		//  });
		input.addEventListener("invalid", event => { //이벤트는 발생하지만, 각 input요소에서 확인은 동기적으로 되지 않는다. 
			// 검증 후 폼 요소에 inValidated 클래스로 표시해 둔다
			//console.log('검증');
			//console.log(event.target.validity);
			//this.classList.add('inValidated');
			document.forms[0].classList.add("inValidated")
		});
	});

}
$(function(){
	join();
});