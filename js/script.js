// Strict Mode
"use strict";

var ua = navigator.userAgent;
var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
var isChrome = (!!window.chrome && !!window.chrome.webstore) || (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua) && /Chrome/i.test(ua) && !/OPR/i.test(ua));

// Windows load event
$(window).on("load", function() {
    // Loader Fade Out
    $(".lx-loader", ".lx-wrapper").fadeOut();
    return false;
});

$(window).on( "orientationchange", function( event ) {
	window.location.href = window.location.href;
});

$(document).on("ready", function() {
	
	// Set body background
	if(isChrome && $(window).width() < 768){
		$("body").css({"background":$(".lx-wrapper").attr("data-background-color")+" url('"+$(".lx-wrapper").attr("data-background")+"') top right no-repeat"});
	}
	else{
		$("body").css({"background":$(".lx-wrapper").attr("data-background-color")+" url('"+$(".lx-wrapper").attr("data-background")+"') center center fixed no-repeat"});
	}
	
	// Resize home and content blocs
	$(".lx-home").css("height",$(".lx-wrapper").height()+"px");
	$(".lx-blocs-content").css("max-height",($(".lx-wrapper").height()-100)+"px");
	if($(window).width() <= 768){
		$(".lx-blocs-content").css("max-height",($(".lx-wrapper").height()-42)+"px");
	}
	
	if($(".lx-main-menu ul").height() > $(window).height()){
		$(".lx-menu-down").css("display","block");
	}
	
	// SlideShow background if it does exist
	
	
	return false;
});

// Hash event
function hashHistory() {
	
	// Retreive Hash
    var page = "";
    if (window.location.hash) {
        page = document.location.hash;
        page = page.replace(/\#/, "");
    } else {
        page = "home";
    }
    // Remove active class from menus
    $(".lx-main-menu ul li a").removeClass("active");
    // Set clicked menu active
    $(".lx-main-menu ul li a[data-url='" + page + "']").addClass("active");
	// Hide all blocs
	$(".lx-blocs").removeClass("active");
	// Show the correspondant bloc
	$(".lx-"+page).addClass("active");
	// If bloc skills load the progress bars
	if(page === "skills"){
		for (var i = 0; i < $(".lx-bar", ".lx-bars-chart").length; i++) {
            $(".lx-bar:eq(" + i + ") .lx-bar-counter").text($(".lx-bar:eq(" + i + ")").attr("data-max") + "%");
            $(".lx-bar:eq(" + i + ") .lx-bar-fill").css("width", $(".lx-bar:eq(" + i + ")").attr("data-max") + "%");
        }
	}
	else{
		for (var i = 0; i < $(".lx-bar", ".lx-bars-chart").length; i++) {
            $(".lx-bar:eq(" + i + ") .lx-bar-counter").text("0%");
            $(".lx-bar:eq(" + i + ") .lx-bar-fill").css("width","0%");
        }		
	}
}

// Main menu event : show correspondant section
$(".lx-main-menu ul li a").on("click", function() {

	var patt = /single-post/;
	if(!patt.test(location.pathname)){	
		// Remove active class from menus
		$(".lx-main-menu ul li a").removeClass("active");
		// Set clicked menu active
		$(this).addClass("active");
		// Hide all blocs
		$(".lx-blocs").removeClass("active");
		// Show the correspondant bloc
		$("."+$(this).attr("data-title")).addClass("active");
		
		
		// If bloc skills load the progress bars
		if($(this).attr("data-title") === "lx-skills"){
			for (var i = 0; i < $(".lx-bar", ".lx-bars-chart").length; i++) {
				$(".lx-bar:eq(" + i + ") .lx-bar-counter").text($(".lx-bar:eq(" + i + ")").attr("data-max") + "%");
				$(".lx-bar:eq(" + i + ") .lx-bar-fill").css("width", $(".lx-bar:eq(" + i + ")").attr("data-max") + "%");
			}
		}
		else{
			for (var i = 0; i < $(".lx-bar", ".lx-bars-chart").length; i++) {
				$(".lx-bar:eq(" + i + ") .lx-bar-counter").text("0%");
				$(".lx-bar:eq(" + i + ") .lx-bar-fill").css("width","0%");
			}		
		}
		
		// Responsive Menu Hide
		if($(window).width() <= 768){
			$(".lx-main-menu").css("left", "-120px");
			$(".lx-main-menu > i").attr("class", "fa fa-bars");		
		}
	}
});

// Responsive menu event
$(".lx-main-menu > i").on("click", function() {
    if ($(".lx-main-menu").css("left") === "-120px") {
        $(".lx-main-menu").css("left", "0px");
        $(".lx-main-menu > i").attr("class", "fa fa-close");
    } else {
        $(".lx-main-menu").css("left", "-120px");
        $(".lx-main-menu > i").attr("class", "fa fa-bars");
    }
    return false;
});

var topMenu = 1;
// Up Down Menu
$(".lx-menu-down").on("click", function() {
	if($(window).height() - topMenu < $(".lx-main-menu ul").height()){
		topMenu = topMenu - 94;
		$(".lx-main-menu ul").css("top",topMenu+"px");
		$(".lx-menu-up").css("display","block");		
	}
	else{
		$(".lx-menu-down").css("display","none");
	}	
	
    return false;
});
$(".lx-menu-up").on("click", function() {
	if($(window).height() + topMenu < $(window).height()){
		topMenu = topMenu + 94;
		$(".lx-main-menu ul").css("top",topMenu+"px");
		$(".lx-menu-down").css("display","block");
	}
	else{
		$(".lx-menu-up").css("display","none");
	}
	
    return false;
});

// Hide window
$(".lx-blocs-head ul li a i.fa-close").on("click", function() {
	
	// Remove active class from menus
    $(".lx-main-menu ul li a").removeClass("active");
	$(".lx-main-menu ul li a[data-title='lx-home']").addClass("active");
	
	// Remove active class from the closed bloc
    $(this).parent().parent().parent().parent().parent().removeClass("active");

	history.pushState('data', '', '#home');
	
	// Empty the progress bars if it is the skills bloc
	if($(this).parent().parent().parent().parent().parent().attr("class") === "lx-skills lx-blocs"){
		for (var i = 0; i < $(".lx-bar", ".lx-bars-chart").length; i++) {
            $(".lx-bar:eq(" + i + ") .lx-bar-counter").text("0%");
            $(".lx-bar:eq(" + i + ") .lx-bar-fill").css("width","0%");
        }
	}
	
	// Contract the form the bloc if it is expanded
	
		
    return false;
});



// Contact Form Errors
$(".lx-contact form input[type='button']").on("click", function() {
    // Remove all errors
    $(".lx-contact form span").remove();
    $(".lx-contact form input[type='text']").css("border-right", "0px");
    $(".lx-contact form textarea").css("border-right", "0px");
    // Test fullname
    var fullname = $(".lx-contact form input[name='fullname']");
    if (fullname.val() === "") {
        fullname.after("<span>This field must be filled</span>").css("border-right", "3px solid #a94442");
    }
    // Test email
    var email = $(".lx-contact form input[name='email']");
    var patt = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    if (!patt.test(email.val())) {
        email.after("<span>Invalid Email</span>").css("border-right", "3px solid #a94442");
    }
    // Test message
    var txtarea = $(".lx-contact form textarea");
    if (txtarea.val() === "") {
        txtarea.after("<span>This field must be filled</span>").css("border-right", "3px solid #a94442");
    }
	
	if($(".lx-contact form span").length === 0){
		var url = "send-contact-form.php?fullname="+fullname.val()+"&email="+email.val()+"&message="+txtarea.val();
		var posting = $.post( url );
		posting.done(function( data ) {
			$(".lx-contact-saved").html(data);	
			$(".lx-contact form input[name='fullname']").val("");
			$(".lx-contact form input[name='email']").val("");
			$(".lx-contact form textarea").val("");
		});	
	}	
    return false;
});

// Remove email error
$(".lx-contact form input[name='email']").on("keyup", function() {
    var patt = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    if (patt.test($(this).val())) {
        $(this).css("border-right", "0px").next("span").remove();
    }
    return false;
});

// Remove fullname error
$(".lx-contact form input[name='fullname']").on("keyup", function() {
    if ($(this).val() !== "") {
        $(this).css("border-right", "0px").next("span").remove();
    }
    return false;
});

// Remove textarea error
$(".lx-contact form textarea").on("keyup", function() {
    if ($(this).val() !== "") {
        $(this).css("border-right", "0px").next("span").remove();
    }
    return false;
});

// Comment Form Errors
$(".lx-comments-form input[type='button']").on("click",function(){
	
	$(".lx-comments-form input[type='text']").css("border-color","#FF0000");
	$(".lx-comments-form textarea").css("border-color","#FF0000");
	
	// Test fullname input
	var fullname = $(".lx-comments-form input[name='fullname']");
	if(fullname.val() !== ""){
		fullname.css("border-color","#EEEEEE");
	}
	
	// Test message input
	var txtarea = $(".lx-comments-form textarea");
	if(txtarea.val() !== ""){
		txtarea.css("border-color","#EEEEEE");
	}
	
	return false;
});

// Remove Errors
$(".lx-comments-form input[name='fullname']").on("keyup",function(){
	if($(this).val() !== ""){
		$(this).css("border-color","#EEEEEE");
	}
	
	return false;
});

$(".lx-comments-form textarea").on("keyup",function(){
	if($(this).val() !== ""){
		$(this).css("border-color","#EEEEEE");
	}
	
	return false;
});

// Language Event
$(".lx-lang p").on("click",function(){
	if($(".lx-lang-items ul").css("display") !== "block"){
		$(".lx-lang-items ul").fadeIn();
	}
	else{
		$(".lx-lang-items ul").fadeOut();
	}
	
	return false;
});

// Hide Lang
$("body").on("click", function(e) {
    if (!$(".lx-lang *").is(e.target)) {
        $(".lx-lang-items ul").fadeOut();
    }
});

// Choose Language Event
 $(".lx-lang-items ul li").on("click",function(){
		$(".lx-lang p").html($(this).attr("data-content")+"<i class='fa fa-caret-down'></i>");
		$(".lx-lang-items ul").fadeOut();
	return false;
});