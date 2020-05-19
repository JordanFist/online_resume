(function($) {

	// Useful variables.
		var	$window = $(window),
			$body = $("body"),
			$header = $("header"),
			$wrapper = $("#wrapper"),
			$nav = $("nav"),
			$nav_a = $("nav ul a"),
			$nav_toggle_closing = $("#nav-toggle-closing"),
			$nav_toggle_opening = $("#nav-toggle-opening");

	// Initialize is-active in nav_a
		for (let i = 0; i < $nav_a.length; i++) {
			$nav_a[i].is_active = 0;
		}

	// Breakpoints.
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

	/* Useful functions */

	// Increase the value of is_active.
		function increase(a) {
			a.is_active += 1;
		}

	// Decrease the value of is_active.
		function decrease(a) {
		if (a.is_active > 0) {
			a.is_active -= 1;
		}
	}

	// Return true if a is active.
		function is_active (a) {
			if (a.is_active == 0) {
				return false;
			}
			return true;
		}

	/* Main functions */

	// Play initial animations on page load.
		$window.on("load", function() {
			window.setTimeout(function() {
				$body.removeClass("is-preload");
			}, 100);
		});

	// Display the right year in the footer.
		var date = new Date();

		$(".copyright__year").html(date.getFullYear());

	// Display the section in the navigation while hovering.
		$nav_a.hover(function() {
			increase($(this)[0]);
			$(this).addClass("link__active");

		}, function() {
			decrease($(this)[0]);
			if (!is_active($(this)[0])) {
				$(this).removeClass("link__active");
				$(this).addClass("link__disabled");
				
				var $a = $(this);
				window.setTimeout(function() {
					$a.removeClass("link__disabled");
				}, 200);

			}
		});

	// Display the section in the navigation while scrolling.
	$nav_a.each(function() {

		var $this = $(this),
			id = $this.attr("href"),
			$section = $(id);

		$section.scrollex({
			mode: "middle",

			enter: 		function() {
				increase($this[0]);
				$this.addClass("link__active");
			},

			leave:		function() {
				decrease($this[0]);

				if ($this.hasClass("link__active") && !is_active($this[0])) {
					$this.removeClass("link__active");
					$this.addClass("link__disabled");

					window.setTimeout(function() {
						$this.removeClass("link__disabled");
					}, 200);

				}
			}

		});
	});

	// Smooth scroll to the anchor
	$nav_a.click(function(event) {
		var $this = $(this),
			id = $this.attr("href"),
			$section = $(id);
			
			event.preventDefault();
			if ($nav.hasClass("expanded")) {
				closing();
			}
			
			$("html, body").stop().animate({
				scrollTop: $section.offset().top
			}, 2000, "easeInOutExpo");
			
		  	$("html, body").on("scroll wheel DOMMouseScroll mousewheel keyup touchmove", function(){
				$("html, body").stop()
			});
	});

	// Manage the opening of the navbar on portable devices.
		$nav_toggle_opening.click(function() {
			$wrapper.prepend("<div id='overlay'></div>");
			$("#overlay").hide().fadeIn(400);
			$nav.addClass("expanded");
		});

	// Function managing the closing of the navbar on portable devices.
		function closing() {
			$("#overlay").fadeOut(400, function() {
				$(this).remove();
			});
			
			$nav.removeClass("expanded");
			$nav.addClass("hidden");

			window.setTimeout(function() {
				$nav.removeClass("hidden");
			}, 400);

		}

	// Close the navbar if click on the cross.
		$nav_toggle_closing.click(function() {
			closing();
		});

	// Close the navbar if click on the overlay.
		$body.on("click", "#overlay", function () {
			closing();
		});
	
	// Display the infobulle and copy my mail in the clipboard.
		var $button = $(".button-copiable");
		new ClipboardJS(".button-copiable");

		$button.on("click", function() {
			if (!$button.hasClass("copied")) {
				$button.attr("aria-label", "Copied!");
				$button.addClass("copied");

				window.setTimeout(function() {
					$button.removeClass("copied");
					$button.attr("aria-label", "Copy mail");
				}, 2000);

			}
		});

	// Disable Skrollr on portable devices.
	Breakpoints.get("portable").on("enter", function() {
		if (skrollr.get()) {
			skrollr.get().destroy();
		}
		$body.removeClass("parallax");
		$body.append("<div id='background'></div>");
	});

	// Enable Skrollr on desktop.
		Breakpoints.get("desktop").on("enter", function() {
			if (document.getElementById("background")) {
				$("#background").remove();
			}

			$body.addClass("parallax");
			skrollr.init({
				forceHeight: false
			});

		});
		
	

	/* Fix Section */ 

	// Prevent the overlay from staying open if resize.
	Breakpoints.get("portable").on("leave", function() {
		if ($nav.hasClass("expanded")) {
			closing();
		}
	});

	// Fix balloon overflow for mobile devices.
		Breakpoints.get("mobile").on({

			enter: function() {
				$(".balloon--resized").attr("data-balloon-length", "medium");
			},

			leave: function() {
				$(".balloon--resized").removeAttr("data-balloon-length");
			}

		});

	// Modify the navbar to be visible on white background on mobile.
		$header.scrollex({
			bottom: "50px",

			enter: 		function() {
				$nav_toggle_opening.removeClass("alt");
			},

			leave:		function() {
				$nav_toggle_opening.addClass("alt");
			}

		});
	  
})(jQuery);