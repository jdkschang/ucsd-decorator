(function(document) {
    var title = $(".title-header"),
        titleShort = $(".title-header-short"),
        titleWidth = title[0].offsetWidth,
        logoWidth = 229,
        menuWidth = 62,
        navHeight = 40,
        navOverflow,
        titleOverflow,
        titleWrapper;

    function removeLongTitle () {
        title.toggle( false );
        titleShort.toggle( true );
    }

    function showLongTitle () {
        title.toggle( true );
        titleShort.toggle( false );
    }

    function isMenuView() {
        var browserWidth = window.innerWidth,
            menuDesktopBorder = 960;

        return (browserWidth < (menuDesktopBorder+1));
    }

    function checkOverflow (titleOverflow, titleWrapper) {
        if ( titleOverflow > titleWrapper ) {
            removeLongTitle();
        } else {
            showLongTitle();
        }
    }

    function checkTitleOverflow () {
        // titleWrapper initialized here to dynamically
        titleWrapper = $(".layout-title")[0].offsetWidth;

        // NO hamburger menu & logo on right
        if ( titleWrapper >= 960 ) {
            titleOverflow =  titleWidth + logoWidth + 1;
            checkOverflow( titleOverflow, titleWrapper);
        }
        // hamburger menu & logo on right
        else if( titleWrapper > 768 ) {
            titleOverflow = titleWidth + logoWidth + menuWidth + 1;
            checkOverflow( titleOverflow, titleWrapper);
        }
        // hamburger menu & logo on left
        else if( titleWrapper <= 768 ) {
            titleOverflow = titleWidth + menuWidth + 1;
            checkOverflow( titleOverflow, titleWrapper);
        }
    }

    function checkNavOverflow() {
        var body = $('body'),
            navHeight = $('.navdrawer-container')[0].scrollHeight,
            navbarCollapse = 'collapse-navbar',
            navMaxHeight = 39;

        // view will not have menu
        if(!isMenuView()) {
            if (navHeight > navMaxHeight) {
                body.addClass(navbarCollapse);
            } else {
                body.removeClass(navbarCollapse);
            }
        }
    }


    // ToDo: function callback only registers twice
    $(window).resize( function () {
        checkTitleOverflow();
        checkNavOverflow();
    });

    $(window).ready( function () {
        checkTitleOverflow();
        checkNavOverflow();
    });
})(document);