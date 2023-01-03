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





			//input 파일첨부, 비밀번호 
			var $fileBox = null;
			$(function() {
				init_idChck();
				init_pwdChck();
				init_file();
				init_addr();
				init_phone();
				init_carNum();
				init_rad();
				init_pop_btn();
			});

			function init_pop_btn(){
				$('.modify_btn_box').children('.btn_submit').on('click',()=>{
					let result = confirm('비밀번호를 수정하시겠습니까?');
					
					//코드 .... 

					if(result){
						alert('수정이 완료되었습니다. ');

					}
					
				});
				$('.modify_btn_box').children('.cancel').on('click',()=>{
					$('.usr_modify_box_popup').css('display','none');
				});
				$('.usr_modify_close').on('click',()=>{
					$('.usr_modify_box_popup').css('display','none');
				});
			}
			function init_rad(){
				let $input_rads = $(".input_rad_box").find('input[type="radio"]');
				for(let i =0; i<$input_rads.length; i++ ){
					$input_rads.eq(i).on('click',()=>{
						$input_rads.eq(i).attr('aria-selected', true).closest('.type_input_box').siblings('.type_input_box')
						.children('input[type="radio"]').attr('aria-selected', false);
					});
				}
			}

			function chck_carNum(car_val, car_num){
				let result = car_val.replace(/\s/g,'');
				//console.log(result);
				car_num.val(result);
			}
			function init_carNum(){

				let car_num = $('#regi_usr_carNo');
				car_num.on('blur',()=>{
					let car_val = car_num.val();
					chck_carNum(car_val, car_num);
				});
			}
			
			function init_phone(){
				//전화번호, 핸드폰 값 모두 합치기
				let acrossPhone = $('.acrossPhone');
				for(let i=0; i< acrossPhone.length; i++){
					acrossPhone.eq(i).on('blur',()=>{
						let lastIdx = acrossPhone.eq(i).attr('id').lastIndexOf('_');
						let acPhone_str = '#'+acrossPhone.eq(i).attr('id').substring(0, lastIdx+1);
						//console.log(acPhone_str);
						let tel_result = null;
						tel_result = formatPhoneNumber(acPhone_str);
						if(!tel_result){//잘못됐다면
							$(acPhone_str+i).addClass('alert');
							accessAriaInvalid(acrossPhone, !tel_result);
						}else{
							$(acPhone_str+i).removeClass('alert');
							accessAriaInvalid(acrossPhone, tel_result);
						}
					});
				}
				//formatPhoneNumber (str);
			}


			function formatPhoneNumber (str) {
				
				let total_phone_No = '';
				let local = $(str+'1').val();				
				let phone_1 = $(str+'2').val();
				phone_1 = phone_1.replace(/\s/,'');
				let phone_2 = $(str+'3').val();
				phone_2 = phone_2.replace(/\s/,'');
				total_phone_No = local+phone_1+phone_2;
				let $pattern = /^[0-9]+$/;

				if(!phone_1.match($pattern)){ //잘못되면
					$(str+'2').val('');
					$(str+'2').attr('placeholder','숫자를 입력하세요').nextAll('.msg_box').addClass('alert').text('정확한 전화번호를 입력하세요.');
					$(str+'2').addClass('alert');
					$(str+'2').focus();
					return false; 
				}else{
					$(str+'2').attr('placeholder','').nextAll('.msg_box').removeClass('alert').text('전화 번호를 입력하세요.');
					$(str+'2').removeClass('alert');
				}

				if(!phone_2.match($pattern)){//잘못되면
					$(str+'3').val('');
					$(str+'3').attr('placeholder','숫자를 입력하세요').nextAll('.msg_box').addClass('alert').text('정확한 전화번호를 입력하세요.');
					$(str+'3').addClass('alert');
					$(str+'3').focus();
					return false; 
				}else{
					$(str+'3').attr('placeholder','').nextAll('.msg_box').removeClass('alert').text('전화 번호를 입력하세요.');
					$(str+'3').removeClass('alert');
				}

			
				if(phone_1.length<3 || phone_1.length > 4 ){//잘못되면
					$(str+'2').attr('placeholder','최소 3개, 최대 4개 숫자를 입력하세요').nextAll('.msg_box').addClass('alert').text('정확한 전화번호를 입력하세요.');
					$(str+'2').addClass('alert');
					$(str+'2').focus();		
					return false; 
				}else{
					$(str+'2').attr('placeholder','').nextAll('.msg_box').removeClass('alert').text('전화 번호를 입력하세요.');
					$(str+'2').removeClass('alert');
				}

				if(phone_2.length != 4 ){//잘못되면
					$(str+'3').attr('placeholder','4개 숫자를 입력하세요').nextAll('.msg_box').addClass('alert').text('정확한 전화번호를 입력하세요.');
					$(str+'3').addClass('alert');
					$(str+'2').focus();
					return false; 
				}else{
					$(str+'3').attr('placeholder','').nextAll('.msg_box').removeClass('alert').text('전화 번호를 입력하세요.');
					$(str+'3').removeClass('alert');
					return true; //마지막에 if문으로 true남기지 않고 마지막 이전 if문에서 return해버리면, 아직 유효성 검사하지 않은 input들의 값을 판별하지 못한다. 
				}

				//
				// return total_phone_No.replace(/(^02|^0504|^0505|^0\d{2})(\d+)?(\d{4})$/, '$1-$2-$3'); // 02/0504/0505/010/011/031
			}

	
			function chkPwdId(str_pwd, str_id){
				let pw = $('#'+str_pwd).val();
				let id = $('#'+str_id).val();
				
				// alert(pw);
				// alert(id);

				if( pw.search(id) > -1 && id != ''){
					//alert(456789);
					return false; 
				}else{
					//alert(1234);
					return true;
				}
			}

			function init_addr(){
				let iput_addr = $('#regi_usr_addr1');
				iput_addr.on('keyup',()=>{
					//alert('눌렀음');
					//console.log(iput_addr);
					iput_addr.val('');
					//$(this).next('button').focus();
				});
			}

			function init_idChck(){
				let $_id = $('#regi_usr_id');
				$_id.on('blur',()=>{
					let $_idVal = $_id.val();
					let result = null;
					//alert($_idVal);
					result = chckId($_idVal);
					if(result){
						$_id.removeClass('alert').nextAll('.required_msg_box').children('.sameStr').removeClass('alert');
					}else{
						$_id.focus().addClass('alert').nextAll('.required_msg_box').children('.sameStr').addClass('alert');
					}//return false

				});
			}
			function chckId($_idVal){
				if($_idVal.search(/\s/) != -1){
					return false;
				}
				let regEx = { id_rule: /^[A-Za-z0-9]{4,12}/};
				//console.log(regEx.id_rule.test($_idVal));     
				let result = regEx.id_rule.test($_idVal);    
				return result;    
			}

			function accessAriaInvalid(elem, bool){
				let pwd = elem;
				let $ariaElm = $('#'+ pwd.attr('aria-describedby') );
				pwd.attr('aria-invalid', !bool);
				
				// if(pwd.val() == '' && $ariaElm.hasClass('ability_chk')){
					
				// 	$ariaElm.addClass('alert');
				// 	$ariaElm.attr('aria-hidden', false);
				// 	return;
				// }

				if(!bool && $ariaElm.hasClass('ability_chk')){	// true이면, 잘못된 정보라면
																											//ablility_chk는 aria-describedby가 가리키는 해당 요소이다. 이 요소는 기본적으로 display:none으로 이벤트 발생시 나타난다. 
																											//이 요소는 checkbox, raido버튼 등의 aria-descripbedby과 연관된 요소의 문구로써 display:block으로 숨기지 않는 것과 구분하는 방법으로 사용한다. 
					$ariaElm.removeClass('alert');
					$ariaElm.attr('aria-hidden',true);
					return;
				}else if(bool && $ariaElm.hasClass('ability_chk')){
					$ariaElm.addClass('alert');
					$ariaElm.attr('aria-hidden',false);
					return;
				}
				
			}

			function factory_pwd($pwd, $pwd_val){
				// console.log($pwd);
				// console.log($pwd_val);
				let result_pw = chkPwdStrValid($pwd_val, $pwd);
				let result_continue = continuousPw( $pwd_val );
				let forId = $(".list").find('.forId').eq(0);
				//alert(forId);
				if(forId.length > 0 && forId.val() != ''){
					// alert($pwd.attr('id'));
					// alert(forId.attr('id'));
					let result_same_str = chkPwdId($pwd.attr('id'), forId.attr('id') );factory_pwd
					if(result_same_str){
						$pwd.nextAll('.required_msg_box').children('.sameStr').removeClass('alert');
					}else{
						$pwd.nextAll('.required_msg_box').children('.sameStr').addClass('alert');
					}
				}
				
				//alert('연속숫자'+result_continue);
				if(result_continue){//연속된 숫자
					//console.log(result);
					$pwd.addClass('alert').nextAll('.required_msg_box').children('.continueNum').addClass('alert');
				}else{//연속된 숫자 
					$pwd.removeClass('alert').nextAll('.required_msg_box').children('.continueNum').removeClass('alert');
				}

				if(result_pw){
					//console.log('ok');
					$pwd.nextAll('.required_msg_box').children('.pwd_pass').removeClass('alert');
				}else{
					//console.log('no');
					//console.log($pwd.nextAll('.required_msg_box'));
					$pwd.nextAll('.required_msg_box').children('.pwd_pass').addClass('alert');
				}
				accessAriaInvalid($pwd, result_pw);
				
			}

			function chckPwdSameResult($pwd, result){
				//alert(result);
				if(result){// 두 비번이 일치하지 않으면,
					//$pwd.nextAll('.chk_pwd').text('비밀 번호가 일치하지 않습니다.').addClass('alert');
					if($pwd.val() !=''){
						$pwd.nextAll('.chk_pwd').text('비밀 번호가 일치하지 않습니다.').addClass('alert');
					}else{
						$pwd.nextAll('.chk_pwd').text('값을 입력하시오.').addClass('alert');
					}
					
				}else{
					$pwd.nextAll('.chk_pwd').removeClass('alert');
				}
			}

			function init_pwdChck(){
				let $pwd1 = $('#regi_usr_pwd1'); //회원가입 비번
				let $pwd2 = $('#regi_usr_pwd2'); //회원가입 비번 확인
				let $pwd3 = $('#residence_pwd1'); //주민참여 등록 비번
				let $pwd4 = $('#residence_pwd2'); //주민참여 등록 비번 확인
				let $pwd5 = $('#modify_usr_pwd1'); //비번 수정
				let $pwd6 = $('#modify_usr_pwd2'); //비번 수정 확인
				let $pwd7 = $('#modify_usr_new_pwd1'); //비번 수정 팝업
				let $pwd8 = $('#modify_usr_new_pwd2'); //비번 수정 확인팝업
				//let $pwd2 = $('#regi_usr_pwd1');
				// $pwd1.on({
				// 	'blur': function(){
				// 		chckPwd1(false);
				// 	},
				// 	'keydown': function(e){
				// 		if(e.keyCode == 13){
				// 			chckPwd1(false);
				// 		}
				// 	}
				// });
				// $pwd1_chk.on({
				// 	'blur': function(){
				// 		chckPwd1(true);
				// 	}
				// });

				/* 비번입력 */
				$pwd1.on('blur', function(e){
					let pwd_val = $pwd1.val();
					//alert(pwd_val);
					//^(?=.*[a-zA-Z])(?=.*[!@#$%^&*-_])(?=[0-9]*)[\da-zA-Z!@#$%^&*-_]{10,20}$
					factory_pwd( $pwd1, pwd_val );
					
					//$pwd2.off('blur');
				});

				$pwd3.on('blur', function(){
					let pwd_val = $pwd1.val();
					//console.log(pwd_val);
					//^(?=.*[a-zA-Z])(?=.*[!@#$%^&*-_])(?=[0-9]*)[\da-zA-Z!@#$%^&*-_]{10,20}$
					let result_pw = chkPwdStrValid(pwd_val, $pwd3);
					if(result_pw){
						console.log('ok');
					}else{
						console.log('no');
					}
				});
				$pwd5.on('blur', function(){
					let pwd_val = $pwd5.val();
					//alert(pwd_val);
					//^(?=.*[a-zA-Z])(?=.*[!@#$%^&*-_])(?=[0-9]*)[\da-zA-Z!@#$%^&*-_]{10,20}$
					factory_pwd( $pwd5, pwd_val );
				});
				$pwd7.on(
					{	'focus': function (){
						let existing_pwd = $('#existing_usr_pwd');	
							if(existing_pwd.val() == ''){
								existing_pwd.closest('.list').find('.guide_txt').addClass('alert');
								//existing_pwd.focus();
							}
						},//focus End
						'change':function(){
							if(existing_pwd.val() == ''){
								existing_pwd.closest('.list').find('.guide_txt').addClass('alert');
								//existing_pwd.focus();
							}
						},
						'blur' : function(){
						let pwd_val = $pwd7.val();
						let existing_pwd = $('#existing_usr_pwd');
						let result = null;
						//alert(pwd_val);
						//^(?=.*[a-zA-Z])(?=.*[!@#$%^&*-_])(?=[0-9]*)[\da-zA-Z!@#$%^&*-_]{10,20}$
						factory_pwd( $pwd7, pwd_val );
						result = chckPwdSame( existing_pwd, $pwd7 );
						
						if(result){ //비번 같은지 확인해서 기존 번호와 같지 않으면 alert을 띄우지만, 이 비번의 값은 기존 비밀번호와 일치하면 잘못된 것이기 때문에 alert을 포함한다. 
							if($pwd7.val() !='' && existing_pwd.val() !=''){
								$pwd7.nextAll('.chk_pwd').text('기존 비밀번호와 값이 일치하지 않습니다.').addClass('alert');
							}else if($pwd7.val() ==''){
								$pwd7.nextAll('.chk_pwd').text('값을 입력하시오').addClass('alert');
							}
							
						}else{
							$pwd7.nextAll('.chk_pwd').removeClass('alert');
						}
					}//blur End 
				});

				/* 비번 확인 */
				$pwd2.on({
					//'focus':function(e){
						//e.preventDefault();
						//console.log('in');
						// setTimeout(()=>{
						// 	$($pwd2).bind('blur',()=>{
						// 		console.log('나갔다');
						// 	});
						// },100);
						
					//},
					'blur': function(e){
						//console.log('out');
						let result = chckPwdSame($pwd1, $pwd2);
						//alert(result);
						accessAriaInvalid($pwd2, result);
						chckPwdSameResult($pwd2, result);
					}
				}); 
				$pwd4.on({
					'blur': function(){
						chckPwdSame($pwd3, $pwd4);
					}
				});
				$pwd6.on({
					'blur': function(){
						let result = chckPwdSame($pwd5, $pwd6);
						accessAriaInvalid($pwd6, result);
						chckPwdSameResult($pwd6, result);
					}
				}); 
				$pwd8.on({
					'blur': function(){
						let result = chckPwdSame($pwd7, $pwd8);
						accessAriaInvalid($pwd8, result);
						chckPwdSameResult($pwd8, result);
					}
				});
			};//init_pwdChck End
			


			function continuousPw(str = '', max = 3) {
				//alert('왔음'+str);
				if (!str.trim()) {
					return false;
				}
				const chrStr = [...str].map(v => v.charCodeAt());
				let preStr = 0;
				let chr = 0;
				chrStr.forEach(s => {
					if (Math.abs(preStr - s) == 1) {
						chr++;
					}
					preStr = s;
				});
				return chr > max;;
			}// continuousPw End
			
			function chkPwdStrValid(str, units){
				//console.log(units);
				let regStr = null;
				if(units.attr('id') == 'regi_usr_pwd1' || units.attr('id') == 'modify_usr_pwd1' || units.attr('id') == 'modify_usr_new_pwd1' ){//회원등록 3단계 페이지 :  join_step3_agree_register_new.html
					//regStr =  /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*-_])(?=[0-9]*)[\da-zA-Z!@#$%^&*-_]{10,20}$/
					let pw = units.val();
					//console.log(pw);
					let num = pw.search(/[0-9]/); //search 없으면 -1
					let eng = pw.search(/[a-zA-Z]/);
					let spe = pw.search(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/);

					
					if(pw.length < 10 || pw.length > 20){
						//alert("10자리 ~ 20자리 이내로 입력해주세요.");
						return false;
					}else if(pw.search(/\s/) != -1){
						//alert("비밀번호는 공백 없이 입력해주세요.");
						return false;
					}else if(   (num < 0 && eng < 0) || (eng < 0 && spe < 0) || (spe < 0 && num < 0) ){
						//alert("영문,숫자, 특수문자 중 2가지 이상을 혼합하여 입력해주세요.");
						return false;
					}else {
						// console.log('eng',eng);
						// console.log('num',num);
						// console.log('spe',spe);
						if( eng != -1 && spe != -1){
							//console.log("통과");
							return true;	 
						}else{
							//alert("영문,특수문자를 혼합하여 입력해주세요.");
							return false;
						}
						
					}
				}else{ //#residence_pwd1 주민참여 공모접수 페이지 : bbs_list_365_residenceRegister.html
					regStr = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/
					let regEx = { pwd_rule: regStr };
					if (units.type === "password") {   
							//console.log(regEx.pwd_rule.test(str));     
							return regEx.pwd_rule.test(str);    
					} else {        
							return false;    
					}
				}
				
				
			}// chkPwdStrValid End

			function chckPwdSame(pwd1, pwd2){
				//alert(1234);
				let $pwd1, $pwd2, $pwd1_val, $pwd2_val, $pwd1_type, $pwd2_type;
				$pwd1 = pwd1;
				$pwd1_val = $pwd1.val();
				$pwd1_type = $pwd1.attr('type');
				$pwd2 = pwd2;
				$pwd2_val = $pwd2.val();
				$pwd2_type = $pwd2.attr('type');
				// console.log(!!$pwd1);
				// console.log($pwd1_val);
				// console.log($pwd1_type);
				
				if( !!$pwd1 && $pwd1_val !=''  && $pwd1_type == 'password' && !!$pwd2 && $pwd2_val !=''  && $pwd2_type == 'password'){
					//console.log($pwd2_val);
					//let $pwd_result = chkPwdStrValid($pwd1_val, $pwd1_type);
					if($pwd1_val == $pwd2_val){
						return false; //비번이 서로 일치한다. 
					}else{
						return true;
					}
				}else if(!!$pwd1 && $pwd1_val =='' && !!$pwd2 && $pwd2_val !=''){
					//return true; 
					$pwd1.focus();
					return true;
				}else if(!!$pwd1 && $pwd1_val !='' && !!$pwd2 && $pwd2_val ==''){
					//return true; 
					$pwd2.focus();
					return true;
				}else if(!!$pwd1 && $pwd1_val =='' && !!$pwd2 && $pwd2_val ==''){
					//$pwd1.focus();
					return true;
				}

				
				
			}
			function init_file() {
				$fileBox = $('.input_file');
				fileLoad();
			}

			


			function fileLoad() {
				let tmpEvent = jQuery.Event("keydown", {keyCode:13});
				$.each($fileBox, function(idx){
					var $this = $fileBox.eq(idx),
							$btnUpload = $this.find('[type="file"]'),
							$label = $this.find('.file_label'),
							$val_input = $this.find('.file_name');
							//$valTxt = $this.find('.file_name');

					$btnUpload.on({
						change : function() {
							var $target = $(this),
									fileName = $target.val(),
									$fileText = $target.siblings('.file_name');
							$fileText.val(fileName);
						},
						click : function(){
							$(this).trigger('change');
						},
						keydown : function(e){
							(e.keyCode == 13)? $(this).trigger('change') : alert('enter를 누르세요');
						}
					});
					
					$btnUpload.on('focusin focusout', function(e) {
						e.type == 'focusin' ? $label.addClass('file_focus') : $label.removeClass('file_focus');
					});
					$val_input.on('focus', function(){
						$(this).blur();
						$btnUpload.trigger('click');
					});

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