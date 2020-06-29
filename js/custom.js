/* Preloader */
// makes sure the whole site is loaded
jQuery(window).load(function() {
	$('#status').delay(100).fadeOut('slow');
	$('#preloader').delay(500).fadeOut('slow');
	$('body').delay(500).css({'overflow':'visible'});
});	



jQuery(document).ready(function() {

	//Function to prevent Default Events
	function pde(e){
		if(e.preventDefault)
			e.preventDefault();
		else
			e.returnValue = false;
	}
	
	/* WOW */
	var wow = new WOW(
	  {
		boxClass:     'wow',      // animated element css class (default is wow)
		animateClass: 'animated', // animation css class (default is animated)
		offset:       0,          // distance to the element when triggering the animation (default is 0)
		mobile:       false       // trigger animations on mobile devices (true is default)
	  }
	);
	wow.init();
	
	/* Pretty Photo */
	$("a[data-rel^='prettyPhoto']").prettyPhoto();

	/* main-slider */
	var slideHeight = $(window).height();
	$('#home-slider .item').css('height',slideHeight);

	$(window).resize(function(){'use strict',
		$('#home-slider .item').css('height',slideHeight);
	});
	
	//Collapse navigation on click (Bootstrap 3 is missing it)
	$('.nav a').on('click', function () {
		$('#my-nav').removeClass('in').addClass('collapse');
	});
	
	// Nice scroll Navbar
	$('.navbar-nav li a').click(function(evt){
		var place = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(place).offset().top
			}, 1200, 'easeInOutCubic');
		pde(evt);
	});
	
	// Nice scroll Learn More
	$('.learn-more').click(function(evt){
		var place = $(this).attr('href');
		$('html, body').animate({
			scrollTop: $(place).offset().top
			}, 1200, 'easeInOutCubic');
		pde(evt);
	});
	
	/* Nav Bar Effect */
	$(window).scroll(function(){	
		"use strict";	
		var scroll = $(window).scrollTop();
		if( scroll > 60 ){		
			$(".navbar-wrapper").addClass("scroll-fixed-navbar");				
		} else {
			$(".navbar-wrapper").removeClass("scroll-fixed-navbar");
		}
	});	
	
	/* Count */
	$(".timer").waypoint(function(){
		$(this).countTo()
		},{triggerOnce:!0,offset:"bottom-in-view"});
	
		
	/* Portfolio */
	$(function(){
	  $('.myport').mixItUp();
	});	
	
	
/* ================================
===  KNOB                      ====
================================= */
$('.skills').waypoint(function() {
	$('.knob').each(function () {
          var element = $(this);
          var perc = element.attr("value");  
          element.knob({ 
                'value': 0,
				'width': 200,			   
                'min':0,
                'max':100,
				'lineCap': 'butt',
                "readOnly":true,
                'inputColor':' #ffffff',
                'bgColor':' #f7f7f7 ',
				'fgColor':' #00cfef ',
                "thickness":.2,// Thickness of Skill Knobs
				'dynamicDraw': true,
				'draw' : function () { $(this.i).val(this.cv); }
          });

		$({value: 0}).animate({ value: perc }, {
			duration: 3000,
			easing: 'swing',
			progress: function () {
			element.val(Math.ceil(this.value)).trigger('change')}
		});
	});
 }, { offset: '50%', triggerOnce: true });
 

/* Validate Form */
  $(function() {
    // Setup form validation on the #register-form element
    $('#contact-form').validate({
    
        // Specify the validation rules
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true,
                minlength: 2
            }
        },
        
        // Specify the validation error messages
        messages: {
            name: "Please enter your name",
            email: "Please enter a valid email address",
            message: "Please enter your message",
        },
        
        submitHandler: function(form) 
		{
			var name = $("#name").val();
			var email = $("#email").val();
			var datastr ='name=' + name + '&email=' + email;
			$("#output").html('<i class="icon-send fa fa-spinner fa-spin"></i> Email is sending...</p>');	
			$.ajax({	
				type: "POST",
				url: "php/mail.php",
				data: $(form).serialize(),
				cache: false,
				success: function(data)
				{
					if(data == "ok")
					{
						$("#output").css("background-color","#27AE61");
						$("#output").html('<p>Thank you for contact us. As early as possible we will contact you</p>');	
					}
					else
					{
						$("#output").css("background-color","#DE654E");
						$("#output").html('<p>Email NOT sent !!</p>');	
					}
					setTimeout('$("#output").fadeOut("slow")',5000);
				}
			});		
		
        }
    });
  });
	 

/* Validate Sign */
  $(function() {
    // Setup form validation on the #register-form element
    $('#sign-form').validate({

		errorPlacement : function(error, element) {
				$('#signup-error').append(error)
			},    
			
        // Specify the validation rules
        rules: {
            email: {
                required: true,
                email: true
            }
        },
        
        // Specify the validation error messages
        messages: {
            email: "Please enter a valid email address",
        },
        
        submitHandler: function(form) 
		{	
			form.submit();
        }
		
    });
  });	 
	
	/* Closes the Responsive Menu on Menu Item Click */
	$(document).on('click','.navbar-collapse.in',function(e) {
		if( $(e.target).is('a') ) {
			$(this).collapse('hide');
		}
	});	

	
	
/*
	// Team Profile
	$('#team').on('click','.profile-read-more',function(event){
		event.preventDefault();
		var link = $(this).data('single_url');
		var full_url = '#team-single-wrap',
		parts = full_url.split("#"),
		trgt = parts[1],
		target_top = $("#"+trgt).offset().top - 85;

		$('html, body').animate({scrollTop:target_top}, 600);
		$('#team-single').slideUp(500, function(){
			$(this).load(link,function(){
				$(this).slideDown(500);
			});
		});
	});

	// Close Team Profile
	$('#team-single-wrap').on('click', '.close-folio-item',function(event) {
		event.preventDefault();
		var full_url = '#team',
		parts = full_url.split("#"),
		trgt = parts[1],
		target_offset = $("#"+trgt).offset(),
		target_top = target_offset.top;
		$('html, body').animate({scrollTop:target_top}, 600);
		$("#team-single").slideUp(500);
	});

	
	// Work Single View

	$('#works').on('click','.folio-read-more',function(event){
		event.preventDefault();
		var link = $(this).data('single_url');
		var full_url = '#works-single-wrap',
		parts = full_url.split("#"),
		trgt = parts[1],
		target_top = $("#"+trgt).offset().top - 85;

		$('html, body').animate({scrollTop:target_top}, 600);
		$('#works-single').slideUp(500, function(){
			$(this).load(link,function(){
				$(this).slideDown(500);
			});
		});
	});

	// Close Portfolio Single View
	$('#works-single-wrap').on('click', '.close-folio-item',function(event) {
		event.preventDefault();
		var full_url = '#works',
		parts = full_url.split("#"),
		trgt = parts[1],
		target_offset = $("#"+trgt).offset(),
		target_top = target_offset.top;
		$('html, body').animate({scrollTop:target_top}, 600);
		$("#works-single").slideUp(500);
	});
*/	
});


/* Scroll Up */
$(window).scroll(function() {
	if ($(this).scrollTop() > 100) {
		$('.scroll-up').fadeIn();
	} else {
		$('.scroll-up').fadeOut();
	}
});

$('.scroll-up').click(function() {
	$("html, body").animate({
		scrollTop: 0
	}, 600);
	return false;
}); 




