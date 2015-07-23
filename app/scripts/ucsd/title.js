(function(document) {
    var title = $("#title"),
        titleShort = $(".title-header-short"),
        titleWidth = title[0].offsetWidth,
        logoWidth = 229,
        titleOverflow = titleWidth + logoWidth + 1,
        titleWrapper;

    var removeLongTitle = function () {
        title.toggle(false);
        titleShort.toggle(true);
    };

    var showLongTitle = function () {
        title.toggle(true);
        titleShort.toggle(false);
    };

    var checkTitleOverflow = function () {
        // titleWrapper initialized here to dynamically
        titleWrapper = $(".layout-title .layout-container")[0].offsetWidth;

        console.log(titleOverflow);
        console.log(titleWrapper);

        if (titleWrapper >= 960) {
            if (titleOverflow > titleWrapper) {
                console.log("titleOverflow is greater");
                console.log("titleWrapper: " + titleWrapper + "   titleOverflow: " + titleOverflow);
                removeLongTitle();
            } else {
                console.log("titleOverflow is NOT greater");
                console.log("titleWrapper: " + titleWrapper + "   titleOverflow: " + titleOverflow);
                showLongTitle();
            }
        }
    };

    // ToDo: function callback only registers twice
    $(window).resize(function () {
        checkTitleOverflow();
    });

    $(window).ready(function () {
        checkTitleOverflow();
    });
})(document);