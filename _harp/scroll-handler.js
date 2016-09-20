/ ==================================================
// Scroll Handlers
// ================================================== 
 
(function() {

    'use strict';

    // ----------------------------------------------
    // Variables
    // ----------------------------------------------

    var scrollTimeout; // Add timer for scroll handlers 
    window.windowHeight = $(window).height();


    // ----------------------------------------------
    // When Scroll
    // ---------------------------------------------- 

    window.scrollHandler = function() {

        var scroll = $(window).scrollTop();
   
        $(window).trigger('scrollHandler', {scroll:scroll});

    };

    $(window).scroll(function(ev) {
        if (scrollTimeout) {
            // clear the timeout, if one is pending
            clearTimeout(scrollTimeout);
            scrollTimeout = null;
        }
        scrollTimeout = setTimeout(scrollHandler, 10);
    });

    scrollHandler();

})();

