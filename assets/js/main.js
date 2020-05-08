(function($) {

	var	$window = $(window),
		$body = $("body"),
		$background = $("#background"),
		$wrapper = $("#wrapper"),
		$nav = $("nav"),
		$nav_toggle = $(".nav-toggle");

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

	// Open up the navbar on mobile
	$nav_toggle.click(function() {

		if ($nav_toggle.hasClass("expanded")) {
			$("#overlay").fadeOut(400, function() {
				$(this).remove();
			});
			$nav.removeClass("expanded");
			$nav_toggle.removeClass("expanded");
			$nav_toggle.children("i").removeClass("fa-times").addClass("fa-bars");

			$nav.addClass("hidden");
			$nav_toggle.addClass("hidden");
			setTimeout(function() {
				$nav.removeClass("hidden");
				$nav_toggle.removeClass("hidden");
			}, 300);
		} else {
			$nav_toggle.children("i").removeClass("fa-bars").addClass("fa-times");
			$wrapper.prepend("<div id='overlay'></div>");
			$("#overlay").hide().fadeIn(400);

			$nav.addClass("expanded");
			$nav_toggle.addClass("expanded");
		}
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
			$("html, body").stop().animate({
				scrollTop: $section.offset().top
			}, 2000, "easeInOutExpo");
			
		  $("html, body").on("scroll wheel DOMMouseScroll mousewheel keyup touchmove", function(){
			$("html, body").stop()});
	});

	// Display the infobulle and copy my mail in the clipboard
	$(".contact__mail").click(function() {
		if (!$(".contact__mail").hasClass("copied")) {
			navigator.clipboard.writeText("jsandri@enseirb-matmeca.fr").then(function() {
				$(".contact__mail").attr("aria-label", "Copied");
				$(".contact__mail").addClass("copied");
				setTimeout(function() {
					$(".contact__mail").removeClass("copied");
					$(".contact__mail").attr("aria-label", "Copy mail");
				}, 2000);
				
			}, function() {
				console.info("navigator.clipboard went wrong");
			});
		} 
	});

	// Disable Jarallax on portable devices
	Breakpoints.get("portable").on("enter", function() {
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
	});

})(jQuery);