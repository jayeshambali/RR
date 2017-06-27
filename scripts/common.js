// JavaScript Document
$(window).load(function(){
	function changeStyle() {
		 var userAgent = navigator.userAgent || navigator.vendor || window.opera;
		 var css = document.createElement('link');
		 css.rel="stylesheet";
		 css.type = 'text/css';
			// Windows Phone must come first because its UA also contains "Android"
			if (/windows phone/i.test(userAgent)) {
				css.href = 'content/css/rollsroyce-style.css';
			}
		
			else if (/android/i.test(userAgent)) {
			 css.href = 'content/css/rollsroyce-style.css';
			}
		
			// iOS detection from: http://stackoverflow.com/a/9039885/177710
			else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
				css.href = 'content/css/rollsroyce-iphone.css';
			}
		 else{
		  css.href = 'content/css/rollsroyce-style.css';
		 }
		 document.getElementsByTagName("head")[0].appendChild(css);
		 return false;
		}
		changeStyle();
});

/*$(document).ready(function(){

	$("#companyemail").on('keyup',function(){

		if($(this).val() != '' && $("#passwordforemail").val() != ''){

			$("#welcomeFormSubmitBtn").prop('disabled', false);

		}else{

			$("#welcomeFormSubmitBtn").prop('disabled', true);

		}

	});

	$("#passwordforemail").on('keyup',function(){

		if($(this).val() != '' && $("#companyemail").val() != ''){

			$("#welcomeFormSubmitBtn").prop('disabled', false);

		}else{

			$("#welcomeFormSubmitBtn").prop('disabled', true);

		}

	});

	$("#welcomeForm").on('submit',function(event){

		var comEmail = $("#companyemail").val();

		var password = $("#passwordforemail").val();

		if(!validateEmail(comEmail) && !validatePassword(password)){

			$(".error_msg").text(" ");
			$(".error_msg").css('padding-bottom','12px');			

			$(".error_msg").text("Invalid Email Address & Password");
			$(".error_msg").css('padding-bottom','0px');
			$("#companyemail").parent().addClass('has-error');

			$("#passwordforemail").parent().addClass('has-error');

		}else{

			$(".error_msg").text(" ");
			$(".error_msg").css('padding-bottom','12px');

			if(validateEmail(comEmail)){

				$("#companyemail").parent().removeClass('has-error');

			}else{				

				$("#companyemail").parent().addClass('has-error');

				$(".error_msg").text("Invalid Email Address");
				$(".error_msg").css('padding-bottom','0px');

			}

			if(validatePassword(password)){

				$("#passwordforemail").parent().removeClass('has-error');

			}else{

				$("#passwordforemail").parent().addClass('has-error');

				$(".error_msg").text("Invalid Password");
				$(".error_msg").css('padding-bottom','0px');
			}
			window.location="login.html";

		}
		
		event.preventDefault();

	})

	/*

	* forgot password form validation

	*/

	/*$("#forgotcompanyemail").on('keyup',function(){

		if($(this).val() != '' && $("#Forgotpassword").val() != ''){

			$("#forgotFormSubmitBtn").prop('disabled', false);

		}else{

			$("#forgotFormSubmitBtn").prop('disabled', true);

		}

	});

	$("#Forgotpassword").on('keyup',function(){

		if($(this).val() != '' && $("#forgotcompanyemail").val() != ''){

			$("#forgotFormSubmitBtn").prop('disabled', false);

		}else{

			$("#forgotFormSubmitBtn").prop('disabled', true);

		}

	});

	$("#Loginform").on('submit',function(event){

		var comEmail = $("#forgotcompanyemail").val();

		var password = $("#Forgotpassword").val();

		if(!validateEmail(comEmail) && !validatePassword(password)){

			$(".error_msg").text(" ");	
			$(".error_msg").css('padding-bottom','12px');
			$(".error_msg").text("Invalid Email Address & Password");
			$(".error_msg").css('padding-bottom','0px');
			$("#forgotcompanyemail").parent().addClass('has-error');

			$("#Forgotpassword").parent().addClass('has-error');

		}else{

			$(".error_msg").text(" ");
			$(".error_msg").css('padding-bottom','12px');
			if(validateEmail(comEmail)){

				$("#forgotcompanyemail").parent().removeClass('has-error');

			}else{				

				$("#forgotcompanyemail").parent().addClass('has-error');

				$(".error_msg").text("Invalid Email Address");
				$(".error_msg").css('padding-bottom','0px');

			}

			if(validatePassword(password)){

				$("#Forgotpassword").parent().removeClass('has-error');

			}else{

				$("#Forgotpassword").parent().addClass('has-error');

				$(".error_msg").text("Invalid Password");
				$(".error_msg").css('padding-bottom','12px');

			}
			window.location="homestartquiz.html";

		}

		event.preventDefault();

	});

	

	// Questions Screen
	$("#next-quiz").on('click', function(event){
		if($('#next-quiz').prop("disabled") == undefined){
			event.preventDefault();
		}
	});
	
	$(".questions-block ul li").on('click',function(){		
		$("#next-quiz").attr('disabled', false);
	});

});

// Function that validates email address.

function validateEmail(cEmail) {

var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;

	if (filter.test(cEmail)) {

		return true;

	}

	else {

		return false;

	}

}

// Function that validates Password.

//minimum of 8 characters and contain at least one capital letter and one number.

function validatePassword(mPass) {

var filter = /^(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$&+,:;=?@#|'<>.^*()%!-]{8,}$/;

	if (filter.test(mPass)) {

		return true;

	}

	else {

		return false;

	}

}*/



