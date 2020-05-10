(function($) {

	

	var	$window = $(window),
		$body = $("body"),
		$header = $("header")
		$background = $("#background"),
		$wrapper = $("#wrapper"),
		$nav = $("nav"),
		$nav_toggle_closing = $("#nav-toggle-closing"),
		$nav_toggle_opening = $("#nav-toggle-opening");

	// Breakpoints
	Breakpoints({
		mobile: {
			min: 0,
			max: 576
		},
		tablet: {
			min: 577,
			max: 992
		},
		tablet_landscape: {
			min: 993,
			max: 1200
		},
		portable: {
			min: 0,
			max: 1200
		},
		desktop: {
			min: 1201,
			max: Infinity
		}
	});

	// Play initial animations on page load
	$window.on("load", function() {
		window.setTimeout(function() {
			$body.removeClass("is-preload");
		}, 100);
	});

	// Display the right year in the footer
	var date =  new Date();

	$(".copyright__year").html(date.getFullYear());

	// Display the section in the navigation while hovering
	$("nav ul a").hover(function() {
		$(this).addClass("link__active");
	}, function() {
		$(this).removeClass("link__active");
		$(this).addClass("link__disabled");
		var $nav_a = $(this);
		setTimeout(function(nav_a) {
			$nav_a.removeClass("link__disabled");
		}, 200);
	});

	// Manage the opening of the navbar on mobile
	$nav_toggle_opening.click(function() {
		$wrapper.prepend("<div id='overlay'></div>");
		$("#overlay").hide().fadeIn(400);
		$nav.addClass("expanded");
	});

	// Manage the closing of the navbar on mobile
	function closing() {
		$("#overlay").fadeOut(400, function() {
			$(this).remove();
		});
		$nav.removeClass("expanded");
		$nav.addClass("hidden");
		setTimeout(function() {
			$nav.removeClass("hidden");
		}, 400);
	}
	$nav_toggle_closing.click(function() {
		closing();
	});

	// Display the section in the navigation while scrolling
	var $nav_a = $("nav ul").find("a");

	$nav_a.each(function() {

		var $this = $(this),
			id = $this.attr("href"),
			$section = $(id);

		$section.scrollex({
			mode: "middle",
			enter: 		function() {
				$this.addClass("link__active");
			},
			leave:		function() {
				if ($this.hasClass("link__active")) {
					$this.removeClass("link__active");
					$this.addClass("link__disabled");
					setTimeout(function() {
						$this.removeClass("link__disabled");
					}, 200);
				}
			}
		});
	});

	// Smooth scroll to the anchor
	$("nav ul a").click(function(event) {
		var $this = $(this),
			id = $this.attr("href"),
			$section = $(id);
			
			event.preventDefault();
			if ($nav.hasClass("expanded")) {
				//closing();
			}
			$("html, body").stop().animate({
				scrollTop: $section.offset().top
			}, 2000, "easeInOutExpo");
			
		  $("html, body").on("scroll wheel DOMMouseScroll mousewheel keyup touchmove", function(){
			$("html, body").stop()});
	});

	
	// Display the infobulle and copy my mail in the clipboard
	new ClipboardJS(".contact__mail");

	$(".contact__mail").on("click", function() {
		if (!$(".contact__mail").hasClass("copied")) {
			$(".contact__mail").attr("aria-label", "Copied!");
			$(".contact__mail").addClass("copied");
			setTimeout(function() {
				$(".contact__mail").removeClass("copied");
				$(".contact__mail").attr("aria-label", "Copy mail");
			}, 2000);
		}
	});

	// Disable Jarallax on portable devices
	/*Breakpoints.get("portable").on("enter", function() {
		jarallax($background, 'destroy');
		$wrapper.unwrap();
		$body.prepend("<div id='background'></div>");
	});
	Breakpoints.get("desktop").on("enter", function() {
		if (document.getElementById("background")) {
			$background.remove();
			$wrapper.wrap("<div class='jarallax'></div>")
		}
		$(".jarallax").jarallax({
			speed: 0.05
		});
	});*/

	// Fix balloon size for mobile devices
	Breakpoints.get("mobile").on({
		enter: function() {
			$(".balloon--resized").attr("data-balloon-length", "medium");
		},
		leave: function() {
			$(".balloon--resized").attr("data-balloon-length", "");
		}
	});

	// Modify the nav-toggle menu on white background
	$header.scrollex({
		bottom: "5vh",
		enter: 		function() {
			$nav_toggle_opening.removeClass("alt");
		},
		leave:		function() {
			$nav_toggle_opening.addClass("alt");
		}
	});

	// Background
		// We execute the same script as before
		let vh = window.outerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	  

})(jQuery);