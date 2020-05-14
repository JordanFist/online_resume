(function($) {

	// Useful variables.
		var	$window = $(window),
			$body = $("body"),
			$header = $("header")
			$background = $("#background"),
			$wrapper = $("#wrapper"),
			$nav = $("nav"),
			$nav_a = $("nav ul a"),
			$nav_toggle_closing = $("#nav-toggle-closing"),
			$nav_toggle_opening = $("#nav-toggle-opening");

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
			$(this).addClass("link__active");
		}, function() {
			$(this).removeClass("link__active");
			$(this).addClass("link__disabled");
			var $nav_a = $(this);
			window.setTimeout(function(nav_a) {
				$nav_a.removeClass("link__disabled");
			}, 200);
		});

	// Display the section in the navigation while scrolling.
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
				//closing();
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

	// Disable Jarallax on portable devices.
	Breakpoints.get("portable").on("enter", function() {
		jarallax($(".jarallax"), 'destroy');
		$wrapper.unwrap();
		$body.append("<div id='background'></div>");

	});

	// Enable Jarallax on desktop.
		Breakpoints.get("desktop").on("enter", function() {
			if (document.getElementById("background")) {
				$background.remove();
				$wrapper.wrap("<div class='jarallax'></div>")
			}

			$(".jarallax").jarallax({
				speed: 0.05
			});

		});

	/* Fix Section */ 

	// Prevent the overlay staying open if resize.
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

	// Modify the navbar to be visible on white background.
		$header.scrollex({
			bottom: "5vh",

			enter: 		function() {
				$nav_toggle_opening.removeClass("alt");
			},

			leave:		function() {
				$nav_toggle_opening.addClass("alt");
			}

		});
	  
})(jQuery);