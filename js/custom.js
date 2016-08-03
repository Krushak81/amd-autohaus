var tpj=jQuery;
tpj.noConflict();

tpj(document).ready(function() {


  if (tpj.fn.cssOriginal!=undefined)
    tpj.fn.css = tpj.fn.cssOriginal;

  var api = tpj('.fullwidthbanner').revolution(
    {
      delay:10000,
      startwidth:900,
      startheight:500,

      onHoverStop:"off",						// Stop Banner Timet at Hover on Slide on/off

      thumbWidth:100,							// Thumb With and Height and Amount (only if navigation Tyope set to thumb !)
      thumbHeight:50,
      thumbAmount:3,

      hideThumbs:0,
      navigationType:"bullet",				// bullet, thumb, none
      navigationArrows:"solo",				// nexttobullets, solo (old name verticalcentered), none

      navigationStyle:"round",				// round,square,navbar,round-old,square-old,navbar-old, or any from the list in the docu (choose between 50+ different item), custom


      navigationHAlign:"center",				// Vertical Align top,center,bottom
      navigationVAlign:"bottom",					// Horizontal Align left,center,right
      navigationHOffset:30,
      navigationVOffset: 40,

      soloArrowLeftHalign:"left",
      soloArrowLeftValign:"center",
      soloArrowLeftHOffset:40,
      soloArrowLeftVOffset:0,

      soloArrowRightHalign:"right",
      soloArrowRightValign:"center",
      soloArrowRightHOffset:40,
      soloArrowRightVOffset:0,

      touchenabled:"on",						// Enable Swipe Function : on/off


      stopAtSlide:-1,							// Stop Timer if Slide "x" has been Reached. If stopAfterLoops set to 0, then it stops already in the first Loop at slide X which defined. -1 means do not stop at any slide. stopAfterLoops has no sinn in this case.
      stopAfterLoops:-1,						// Stop Timer if All slides has been played "x" times. IT will stop at THe slide which is defined via stopAtSlide:x, if set to -1 slide never stop automatic

      hideCaptionAtLimit:0,					// It Defines if a caption should be shown under a Screen Resolution ( Basod on The Width of Browser)
      hideAllCaptionAtLilmit:0,				// Hide all The Captions if Width of Browser is less then this value
      hideSliderAtLimit:0,					// Hide the whole slider, and stop also functions if Width of Browser is less than this value


      fullWidth:"on",

      shadow:1								//0 = no Shadow, 1,2,3 = 3 Different Art of Shadows -  (No Shadow in Fullwidth Version !)

    });


  // TO HIDE THE ARROWS SEPERATLY FROM THE BULLETS, SOME TRICK HERE:
  // YOU CAN REMOVE IT FROM HERE TILL THE END OF THIS SECTION IF YOU DONT NEED THIS !
  api.bind("revolution.slide.onloaded",function (e) {


    jQuery('.tparrows').each(function() {
      var arrows=jQuery(this);

      var timer = setInterval(function() {

        if (arrows.css('opacity') == 1 && !jQuery('.tp-simpleresponsive').hasClass("mouseisover"))
          arrows.fadeOut(300);
      },3000);
    })

    jQuery('.tp-simpleresponsive, .tparrows').hover(function() {
      jQuery('.tp-simpleresponsive').addClass("mouseisover");
      jQuery('body').find('.tparrows').each(function() {
        jQuery(this).fadeIn(300);
      });
    }, function() {
      if (!jQuery(this).hasClass("tparrows"))
        jQuery('.tp-simpleresponsive').removeClass("mouseisover");
    })

  });
  // END OF THE SECTION, HIDE MY ARROWS SEPERATLY FROM THE BULLETS

});


(function($){
    $.responsiveIframes = function(el, options){
        var self = this;

        // Access to jQuery and DOM versions of element
        self.$el = $(el);
        self.el = el;

        // Add a reverse reference to the DOM object
        self.$el.data("responsiveIframes", self);

        self.init = function () {
            self.options = $.extend({}, $.responsiveIframes.defaultOptions, options);

            // wrap iframe
            var iframeSrc = self.$el.find('iframe').wrap('<div class="iframe-content" />').attr('src');

            //generate header
            var header = '<div class="iframe-header">' +
                '<a href="'+ iframeSrc +'" class="iframe-trigger">'+ self.options.openMessage +'</a>' +
                '</div>';

            var trigger = self.$el.prepend(header).find('.iframe-trigger');

            // click event
            $(trigger).click(function (e) {
                e.preventDefault();

                var $this = $(this),
                    $html = $('html'),
                    isFullScreen = $html.hasClass("iframe-full-screen"),
                    message = isFullScreen ? self.options.openMessage : self.options.closeMessage;

                $this.text(message);

                if (isFullScreen) {
                    self.$el.removeClass("iframe-active");
                    $html.removeClass("iframe-full-screen");
                    setTimeout(function () {
                        $(window).scrollTop($this.data('iframe-scroll-position'));
                    }, 1);
                } else {
                    $this.data('iframe-scroll-position', $(window).scrollTop());
                    self.$el.addClass("iframe-active");
                    $html.addClass("iframe-full-screen");
                }

            });
        };

        // Run initializer
        self.init();
    };

    $.responsiveIframes.defaultOptions = {
        openMessage: "Full screen",
        closeMessage: "Close"
    };

    $.fn.responsiveIframes = function(options){
        return this.each(function(){
            (new $.responsiveIframes(this, options));
        });
    };

})(jQuery);
