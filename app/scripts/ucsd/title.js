(function(document) {
    var title = $(".title-header"),
        titleShort = $(".title-header-short"),
        logoWidth = 229,
        menuWidth = 62,
        titleOverflow,
        titleWrapper;

    if(title[0]) { // title exists
        var titleWidth = title[0].offsetWidth;
    }

    function removeLongTitle () {
        title.toggle( false );
        titleShort.toggle( true );
    };

    function showLongTitle () {
        title.toggle( true );
        titleShort.toggle( false );
    };

    function checkOverflow (titleOverflow, titleWrapper) {
        if ( titleOverflow > titleWrapper ) {
            removeLongTitle();
        } else {
            showLongTitle();
        }
    };

    function checkTitleOverflow () {
        // titleWrapper initialized here to dynamically
        if($(".layout-title")[0]) { // title wrapper exists
            titleWrapper = $(".layout-title")[0].offsetWidth;
        }

        // NO hamburger menu & logo on right
        if ( titleWrapper >= 960 ) {
            titleOverflow =  titleWidth + logoWidth + 1;
            checkOverflow( titleOverflow, titleWrapper);
        }
        // hamburger menu & logo on right
        else if( titleWrapper > 768 ) {
            console.log('hamburger');
            titleOverflow = titleWidth + logoWidth + menuWidth + 1;
            checkOverflow( titleOverflow, titleWrapper);
        }
        // hamburger menu & logo on left
        else if( titleWrapper <= 768 ) {
            titleOverflow = titleWidth + menuWidth + 1;
            checkOverflow( titleOverflow, titleWrapper);
        }
    };

    // ToDo: function callback only registers twice
    $(window).resize( function () {
        checkTitleOverflow();
    });

    $(window).ready( function () {
        checkTitleOverflow();
    });
})(document);