/*! decorator v4.0.5 02-09-2015*/

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* initialize copyright year */
function initCopyright() {
	var today = new Date();
	copyrightYear = today.getFullYear();
	$("#tdr_copyright_year").empty();
	$("#tdr_copyright_year").append(copyrightYear);
};
},{}],2:[function(require,module,exports){
/**
 * drawer
 */
$(document).ready(function() {
	$('.drawer').each(function() {
            var drawer = $(this);

            /* create wrapper class */
            drawer.wrap('<div class="drawer-wrapper"/>');
            var drawerWrapper = drawer.parent();

            /* insert links */
            var link = '<div class="drawer-toggle"><a href="#" class="expand">Expand All</a></div>';
            drawerWrapper.prepend(link);
            drawerWrapper.append(link);

            /* build drawer */
            drawer.children("div").toggle();

            drawer.children("h2").click(function() {
                $(this).toggleClass("expand");
                $(this).next().toggle();
                if ($(this).hasClass("expand")) {
                    window.location.hash = $(this).find('a').text().replace(/\s/g,'-').substring(0,31);
                }
                return false;
            });

            drawerWrapper.find(".drawer-toggle a").click(function() {
                /* open or close drawers */
                if ($(this).hasClass("expand")) {
                    expandAll(drawerWrapper);
                }

                else {
                    collapseAll(drawerWrapper);
                }

                /* reset all toggle links */
                resetLink(drawerWrapper);
                if ( window.history && window.history.pushState ) {
                    window.history.pushState('', '', window.location.pathname)
                } else {
                    window.location.href = window.location.href.replace(/#.*$/, '#');
                }
                return false;
            });

            /* open the drawer if the url points to this drawer */
        $(window).load(function () {
            drawer.children("h2").each(function() {
                if (window.location.hash == '#'+$(this).text().replace(/\s/g,'-').substring(0,31)){
                    var newPosition = $(this).offset();
                    $(this).toggleClass('expand').next().toggle();
                    setTimeout(function() {
                        window.scrollTo(0, newPosition.top);
                    }, 50);
                };
            });
        });
    });

		/* expand all drawers */
		function expandAll(drawerWrapper) {
			drawerWrapper.children(".drawer").children("h2").addClass("expand");
			drawerWrapper.children(".drawer").children("div").show();
		}

		/* close all drawers */
		function collapseAll(drawerWrapper) {
			drawerWrapper.children(".drawer").children("h2").removeClass("expand");
			drawerWrapper.children(".drawer").children("div").hide();
        }

		/* reset drawer toggle link */
		function resetLink(drawerWrapper) {
			drawerWrapper.find(".drawer-toggle a").each(function() {
				element = $(this);
				if (element.hasClass("expand"))
					element.html("Collapse All");
				else
					element.html("Expand All");
				element.toggleClass("expand");
			});
		}
});

},{}],3:[function(require,module,exports){
(function($) {
	$(document).ready(function() {
		/*
		 * Note, there is currently a bug in flexslider when there are multiple
		 * slider on a page. if one particular slider disables pause/play and
		 * paging control, subsequent sliders with pause/play and paging enabled
		 * will not display the controls properly.
		 */
		$(".flexslider").each(function() {
			var slider = $(this), flexCaption = $('.flex-caption');

			/*
			 * default settings. enable auto slideshow. enable pause/play and
			 * paging control. disable direction control.
			 */
			var settings = {
				controlNav: false,
				directionNav: false,
				nextText: "&gt;",
				prevText: "&lt;"
			};

			/*
			 * update settings if pause/play and paging control is disabled.
			 */
			if (slider.has(".flex-controls").length > 0) {
				settings = $.extend(settings, {
					controlNav: true,
					controlsContainer: ".flex-controls",
					pausePlay: true,
					slideshow: true
				});
			}

			if (Modernizr.touch) {
                            settings = $.extend(settings, {
                                animation: "slide"
                            });

                            flexCaption.css({
                                "display": "block",
                                "padding": "10px",
                                "left": "auto",
                                "width": "inherit",
                                "box-sizing": "border-box",
                                "-moz-box-sizing": "border-box",
                                "-webkit-box-sizing": "border-box",
                                "z-index": "9"
                            });

                            if (navigator.userAgent.match(/(iPad|iPhone|iPod)/g)) {
                            	settings = $.extend(settings, {
                            		useCSS: false,
                            		start: function(){
									    flexCaption.css({
									    	"padding": "2%"
									    });
									},

                            		before: function(){
									    flexCaption.css({
									    	"width": "100%"
									    });
									},

									after: function(){
									    flexCaption.css({
									    	"width": "inherit"
									    });
									}
                            	});
                            }
			}
			/*
			 * update settings if alternative theme.
			 */
			if (slider.hasClass("alt")) {
				settings = $.extend(settings, {
					directionNav: true
				});
			}
			/*
			 * update settings if auto slideshow is disabled, enable direction
			 * control.
			 */
			if (slider.hasClass("noSlideShow")) {
				settings = $.extend(settings, {
					controlNav: false,
					slideshow : false,
					directionNav : true
				});
			}

			if (slider.find('li').length == 1) { // Disable touch/controls/play if there's only one list item within the slider.
				settings = $.extend(settings, {
					touch: false,
					controlNav: false,
					pausePlay: false
				});
			}

			if(typeof blinkPausePlay == 'function') {
			    blinkPausePlay(slider, settings);
			}

			if(!(typeof blinkPausePlay == 'function')) {
			    $(this).flexslider(settings);
			}

			if (Modernizr.touch) {
				if (slider.has(".controls").length > 0) {
				    slider.children(".controls").appendTo(slider);
			    };
			};
		});
	});
})(jQuery);
},{}],4:[function(require,module,exports){
/* initialize footer links */
function initFooter(feedbackUrl) {
	feedbackUrl = feedbackUrl + location.pathname;
	var feedback_url = "<a href=\"";
	feedback_url += feedbackUrl;
	feedback_url += "\" onclick=\"window.open('";
	feedback_url += feedbackUrl;
	feedback_url += "', 'DYGWYW', 'menubar=0,resizable=1,scrollbars=1,width=450,height=650');\" target=\"DYGWYW\">Feedback</a>";
	$("#tdr_footer_feedback").empty();
	$("#tdr_footer_feedback").append(feedback_url);
};
},{}],5:[function(require,module,exports){
/* initialize login links */
function initLogout(logoutUrl) {
	var url = "https://a4.ucsd.edu/tritON/resources/bugscript.jsp?target=https%3A%2F%2Fwww.ucsd.edu&jsoncallback=?";
	$.getJSON(url, function(data) {
		if (data.eduUcsdActLoggedin) {
			var url = "<div id=\"tdr_login_content\">You are logged in | <a href=\"https://act.ucsd.edu/security/logout?url=";
			url += logoutUrl;
			url += "\">Log Out</a></div>";
			$("div#tdr_login").empty();
			$("div#tdr_login").append(url);
		}
	});
};
},{}],6:[function(require,module,exports){
$(document).ready(function() {

    var $body = $('body'),
        desktopBreak = 768,
        maxNavHeight = 38,
        $topNav = $('#tdr_nav'),
        $window = $(window),
        $search = $topNav.find('.tdr_search'),
        $searchBtn = $topNav.find('.btn-default'),
        $navList = $('.tdr_nav_list'),

    /* do we have a nav menu? */
        hasNav = false;


    if ($navList.find('> li').length > 0) {
        hasNav = true;
    }

    if (hasNav) {
        /* init nav menu */
        $navList.superfish({
            cssArrows: false
        });
    } else {
        /* hide menu icon */
        $("#tdr_title_menu_link").attr("style", "display: none");
        $("#tdr_title_content").addClass("noMenu");
    }

    /* search link */
    $("#tdr_search_toggle").click(function(event) {
        $search.toggleClass("show");
    });

    $("#tdr_search_toggle").click(function(event) {
        $searchBtn.toggleClass("btn-s");
    });

    $(".navbar-toggle").on("click", function() {
        $body.toggleClass("active");
        if ($('#tdr_search_content>form').length) {
            $('#tdr_search_content>form').appendTo($('.nav-offcanvas>.tdr_search'));
            $('#tdr_nav .tdr_nav_list').appendTo('#tdr_side_nav');
        } else {
            $('.nav-offcanvas>.tdr_search>form').appendTo($('#tdr_search_content'));
            $('#tdr_side_nav>.tdr_nav_list').prependTo('#tdr_nav_content');
        }
        /* init nav menu */
        $navList.superfish({
            cssArrows: false
        });
    });

    function navMover() {
        if ($window.width() >= desktopBreak) {

            if ($body.hasClass("active")) {

                $body.removeClass("active");

                if ($('#tdr_search_content>form').length) {
                    //
                } else {
                    $('.nav-offcanvas>.tdr_search>form').appendTo($('#tdr_search_content'));
                    $('#tdr_side_nav>.tdr_nav_list').prependTo('#tdr_nav_content');
                    /* init nav menu */
                    $navList.superfish({
                        cssArrows: false
                    });
                }

            }

            if ($topNav.height() > maxNavHeight ) {
                $body.addClass('collapse-nav');
            } else {
                $body.removeClass('collapse-nav');
            }
        }

        if ($window.width() < desktopBreak && $body.hasClass("collapse-nav")) {
            $body.removeClass("collapse-nav");
        }


    }


    FastClick.attach(document.body);

    // Detecting IE 7
    var oldIE = false;
    if(navigator.appVersion.indexOf("MSIE 7.")!=-1) {
        oldIE = true;
    }

    if (!oldIE) {
        $window.on('load orientationchange resize', navMover);
    }


});
},{}],7:[function(require,module,exports){
/*! Respond.js: min/max-width media query polyfill. Remote proxy (c) Scott Jehl. MIT/GPLv2 Lic. j.mp/respondjs  */
(function(win, doc, undefined){
	var docElem			= doc.documentElement,
		proxyURL		= doc.getElementById("respond-proxy").href,
		redirectURL		= (doc.getElementById("respond-redirect") || location).href,
		baseElem		= doc.getElementsByTagName("base")[0],
		urls			= [],
		refNode;

	function encode(url){
		return win.encodeURIComponent(url);
	}

	 function fakejax( url, callback ){

		var iframe,
			AXO;
		
		// All hail Google http://j.mp/iKMI19
		// Behold, an iframe proxy without annoying clicky noises.
		if ( "ActiveXObject" in win ) {
			AXO = new ActiveXObject( "htmlfile" );
			AXO.open();
			AXO.write( '<iframe id="x"></iframe>' );
			AXO.close();
			iframe = AXO.getElementById( "x" );
		} else {
			iframe = doc.createElement( "iframe" );
			iframe.style.cssText = "position:absolute;top:-99em";
			docElem.insertBefore(iframe, docElem.firstElementChild || docElem.firstChild );
		}

		iframe.src = checkBaseURL(proxyURL) + "?url=" + encode(redirectURL) + "&css=" + encode(checkBaseURL(url));
		
		function checkFrameName() {
			var cssText;

			try {
				cssText = iframe.contentWindow.name;
			}
			catch (e) { }

			if (cssText) {
				// We've got what we need. Stop the iframe from loading further content.
				iframe.src = "about:blank";
				iframe.parentNode.removeChild(iframe);
				iframe = null;

			
				// Per http://j.mp/kn9EPh, not taking any chances. Flushing the ActiveXObject
				if (AXO) {
					AXO = null;

					if (win.CollectGarbage) {
						win.CollectGarbage();
					}
				}

				callback(cssText);
			}
			else{
				win.setTimeout(checkFrameName, 100);
			}
		}
		
		win.setTimeout(checkFrameName, 500);
	}

    // http://stackoverflow.com/a/472729
	function checkBaseURL(href) {
        var el = document.createElement('div'),
        escapedURL = href.split('&').join('&amp;').
            split('<').join('&lt;').
            split('"').join('&quot;');

        el.innerHTML = '<a href="' + escapedURL + '">x</a>';
        return el.firstChild.href;
	}
	
	function checkRedirectURL() {
		// IE6 & IE7 don't build out absolute urls in <link /> attributes.
		// So respond.proxy.gif remains relative instead of http://example.com/respond.proxy.gif.
		// This trickery resolves that issue.
		if (~ !redirectURL.indexOf(location.host)) {

			var fakeLink = doc.createElement("div");

			fakeLink.innerHTML = '<a href="' + redirectURL + '"></a>';
			docElem.insertBefore(fakeLink, docElem.firstElementChild || docElem.firstChild );

			// Grab the parsed URL from that dummy object
			redirectURL = fakeLink.firstChild.href;

			// Clean up
			fakeLink.parentNode.removeChild(fakeLink);
			fakeLink = null;
		}
	}
	
	function buildUrls(){
		var links = doc.getElementsByTagName( "link" );
		
		for( var i = 0, linkl = links.length; i < linkl; i++ ){
			
			var thislink	= links[i],
				href		= links[i].href,
				extreg		= (/^([a-zA-Z:]*\/\/(www\.)?)/).test( href ),
				ext			= (baseElem && !extreg) || extreg;

			//make sure it's an external stylesheet
			if( thislink.rel.indexOf( "stylesheet" ) >= 0 && ext ){
				(function( link ){			
					fakejax( href, function( css ){
						link.styleSheet.rawCssText = css;
						respond.update();
					} );
				})( thislink );
			}	
		}

		
	}
	
	if( !respond.mediaQueriesSupported ){
		checkRedirectURL();
		buildUrls();
	}

})( window, document );

},{}],8:[function(require,module,exports){
$('.social-list li').click(function(e) {
    window.location.href = $(this).find('a').attr('href');
});
},{}]},{},[1,2,3,4,5,6,7,8]);
