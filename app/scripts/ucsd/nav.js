(function(document) {
    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function(search) {
            var d = document, elements, pattern, i, results = [];
            if (d.querySelectorAll) { // IE8
                return d.querySelectorAll("." + search);
            }
            if (d.evaluate) { // IE6, IE7
                pattern = ".//*[contains(concat(' ', @class, ' '), ' " + search + " ')]";
                elements = d.evaluate(pattern, d, null, 0, null);
                while ((i = elements.iterateNext())) {
                    results.push(i);
                }
            } else {
                elements = d.getElementsByTagName("*");
                pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");
                for (i = 0; i < elements.length; i++) {
                    if ( pattern.test(elements[i].className) ) {
                        results.push(elements[i]);
                    }
                }
            }
            return results;
        }
    }

    var mainNav = function() {
        var navBtn              = document.getElementsByClassName('btn-nav');
        var navList             = document.getElementsByClassName('navdrawer-container');
        var layoutHeader        = document.getElementsByClassName('layout-header');         // for menu button transition
        var layoutMain          = document.getElementsByClassName('layout-main');
        var layoutFooter        = document.getElementsByClassName('layout-footer');
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
        }
    };

    var mainSubNav = function() {
        var subNav          = document.getElementsByClassName('navbar-subnav');
        var subList         = document.getElementsByClassName('navbar-sublist');
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
        // ie 7/8 fix
        if(!subNav.addEventListener) {
            alert('subNav v1: removed . from className');
            subNav.attachEvent("onclick", function() {
                alert('in subnav attachEvent onclick');
                toggleSubNav();
            });

            subNav.attachEvent("onmouseover", function() {
                alert('in subnavHover attachEvent onmouseover');
                if(!isMobileView()) addClass(subNav, subNavHover);
                subNavIsOpened = true;
            });
            subNav.attachEvent("onmouseout", function() {
                if(!isMobileView()) removeClass(subNav, subNavHover);
                subNavIsOpened = false;
            });
        } else {
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
            });
        }

    };

    var mainSearch = function() {
        var searchBtn = document.getElementsByClassName('.search-toggle');
        var searchContent = document.getElementsByClassName('.search-content');
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

        if(!searchBtn.addEventListener) {
            searchBtn.attachEvent("onclick", function() {
                toggleSearch();
            })
        } else {
            searchBtn.addEventListener('click', function (e) {
                e.preventDefault();
                toggleSearch();
            });
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

    //polyfillQuery();
    mainNav();
    mainSubNav();
    mainSearch();
})(document);