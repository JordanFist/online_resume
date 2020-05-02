(function($) {

	var	$window = $(window),
		$body = $("body"),
		$nav = $("nav");

	// Play initial animations on page load
	$window.on("load", function() {
		window.setTimeout(function() {
			$body.removeClass("is-preload");
		}, 100);
	});

	// Display the right year in the footer
	var date =  new Date();

	$(".copyright__year").html(date.getFullYear())

	// Display the section in the navigation while scrolling
	var $nav_a = $nav.find("a");

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
				$this.removeClass("link__active");
			}
		});
	});

	// Smooth scroll to the anchor
	$("nav a").on("click", function(event) {

		var $this = $(this),
			id = $this.attr("href"),
			$section = $(id);
			
			event.preventDefault();
			$("html, body").stop().animate({
				scrollTop: $section.offset().top
			}, 2000, 'easeInOutExpo');
			
		  $("html, body").on("scroll wheel DOMMouseScroll mousewheel keyup touchmove", function(){
			$("html, body").stop()});
	});

	// Display the infobulle and copy my mail in the clipboard
	$(".contact__mail").on("click", function() {
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

})(jQuery);