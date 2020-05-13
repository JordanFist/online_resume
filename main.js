(function($) {
    //Loading height on touch-device
        function calcFullHeight() {
            jQuery('#bg').css("height", window.outerHeight);
            //jQuery('#bg').css("height", $(window).height());
        }
    
        (function($) {
            calcFullHeight();

            alert(window.outerHeight);
            alert($(window).height());
    
            jQuery(window).on('orientationchange', function() {
                // 500ms timeout for getting the correct height after orientation change
                setTimeout(function() {
                    calcFullHeight();
                }, 500);
    
            });
        })(jQuery);
    
})(jQuery);