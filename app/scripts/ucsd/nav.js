(function(document) {
    var mainNav = function() {
        var navBtn              = document.querySelector('.btn-nav');
        var navList             = document.querySelector('.navdrawer-container');
        var layoutHeader        = document.querySelector('.layout-header');         // for menu button transition
        var layoutMain          = document.querySelector('.layout-main');
        var layoutFooter        = document.querySelector('.layout-footer');
        var navIsOpenedClass    = 'navbar-is-opened';
        var menuOpen            = 'open';
        var navListIsOpened     = false;

        var toggleMainNav = function() {
            isMobileView();

            if (!navListIsOpened) {
                addClass(navList, navIsOpenedClass);

                addClass(layoutHeader, menuOpen);
                addClass(layoutMain, menuOpen);
                addClass(layoutFooter, menuOpen);
                navListIsOpened = true;
            } else {
                removeClass(navList, navIsOpenedClass);

                removeClass(layoutHeader, menuOpen);
                removeClass(layoutMain, menuOpen);
                removeClass(layoutFooter, menuOpen);
                navListIsOpened = false;
            }
        };

        if(navBtn.addEventListener) { // ie8 conditional
            navBtn.addEventListener('click', function (e) {
                e.preventDefault();

                toggleMainNav();
            });
        } else {
            navBtn.attachEvent("onclick", function() {
                toggleMainNav();
            })
        }
    };

    var mainSubNav = function() {
        var subNav          = document.querySelector('.navbar-subnav');
        var subList         = document.querySelector('.navbar-sublist');
        var subNavList      = 'subnav-is-opened';
        var subNavHover     = 'subnav-hover';
        var subNavIsOpened  = false;

        var toggleSubNav = function() {
            if(!subNavIsOpened) {
                addClass(subList, subNavList);

                subNavIsOpened = true;
            } else {
                removeClass(subList, subNavList);

                subNavIsOpened = false;
            }
        };

        if(subNav.addEventListener) {
            subNav.addEventListener('click', function (e) {
                e.stopPropagation();
                toggleSubNav();
            });

            subNav.addEventListener('mouseover', function (e) {
                e.preventDefault();

                if(!isMobileView()) addClass(subNav, subNavHover);

                subNavIsOpened = true;
            });

            subNav.addEventListener('mouseout', function (e) {
                e.preventDefault();

                if(!isMobileView()) removeClass(subNav, subNavHover);

                subNavIsOpened = false;
            })
        } else { // ie 7/8 fix
            subNav.attachEvent("onclick", function() {
                toggleSubNav();
            });

            subNav.attachEvent("onmouseover", function() {
                if(!isMobileView()) addClass(subNav, subNavHover);
                subNavIsOpened = true;
            });
            subNav.attachEvent("onmouseout", function() {
                if(!isMobileView()) removeClass(subNav, subNavHover);
                subNavIsOpened = false;
            });
        }

        //if(!isMobileView()) {
        //
        //    subNav.addEventListener('mouseover', function (e) {
        //        e.preventDefault();
        //
        //        if(!isMobileView()) addClass(subNav, subNavHover);
        //
        //        subNavIsOpened = true;
        //    });
        //
        //    subNav.addEventListener('mouseout', function (e) {
        //        e.preventDefault();
        //
        //        if(!isMobileView()) removeClass(subNav, subNavHover);
        //
        //        subNavIsOpened = false;
        //    })
        //}
    };

    var mainSearch = function() {
        var searchBtn = document.querySelector('.search-toggle');
        var searchContent = document.querySelector('.search-content');
        var searchOpen = 'search-is-open';
        var isSearchOpen = false;

        var toggleSearch = function() {
            if(!isSearchOpen) {
                addClass(searchContent, searchOpen);
                addClass(searchBtn, searchOpen);
                isSearchOpen = true;
            } else {
                removeClass(searchContent, searchOpen);
                removeClass(searchBtn, searchOpen);
                isSearchOpen = false;
            }
        };

        if(searchBtn.addEventListener) {
            searchBtn.addEventListener('click', function (e) {
                e.preventDefault();
                toggleSearch();
            });
        } else {
            searchBtn.attachEvent("onclick", function() {
                toggleSearch();
            })
        }
    };

    var isMobileView = function() {
        var browserWidth = window.innerWidth;
        var mobileDesktopBorder = 960;

        return (browserWidth < mobileDesktopBorder);
    };

    var addClass = function (element, className) {
        if (!element) { return; }
        element.className = element.className.replace(/\s+$/gi, '') + ' ' + className;
    };

    var removeClass = function(element, className) {
        if (!element) { return; }
        element.className = element.className.replace(className, '');
    };

    mainNav();
    mainSubNav();
    mainSearch();
})(document);