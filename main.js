(function($) {
    //Loading height on touch-device
        function calcFullHeight() {
            jQuery('#bg').css("height", $(window).height());
        }
    
        (function($) {
            calcFullHeight();
    
            jQuery(window).on('orientationchange', function() {
                // 500ms timeout for getting the correct height after orientation change
                setTimeout(function() {
                    calcFullHeight();
                }, 500);
    
            });
        })(jQuery);
    
})(jQuery);