(function(document) {
    function mainNav() {
        var navBtn              = $('.btn-nav')[0];
        var navList             = $('.navdrawer-container')[0];
        var layoutHeader        = $('.layout-header')[0];         // for menu button transition
        var layoutMain          = $('.layout-main')[0];
        var layoutFooter        = $('.layout-footer')[0];
        var navIsOpenedClass    = 'navbar-is-opened';
        var menuOpen            = 'open';
        var navListIsOpened     = false;

        function toggleMainMenu() {
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
        }

        if(navBtn.addEventListener) { // ie8 conditional
            navBtn.addEventListener('click', function (e) {
                e.preventDefault();

                toggleMainMenu();
            });
        } else {
            navBtn.attachEvent("onclick", function() {
                toggleMainMenu();
            })
        }
    }

    function mainSubNav() {
        var subNavArray     = $('.navbar-subnav'),
            subListArray    = $('.navbar-sublist'),
            subNavList      = 'subnav-is-opened',
            subNavHover     = 'subnav-hover',
            subNavIsOpened  = false;
        var preIndex;

        /* if there are subNav elements run */
        if(subNavArray) {
            subNavArray.each( function(index) {
                var subNav  = subNavArray[index],
                    subList = subListArray[index];

                /* relocated toggleSubNav function due to variable scoping issues */
                function toggleSubNav() {
                    // check if subList opened, reset if antoher is already opened
                    checkToggleSubNav();

                    if(!subNavIsOpened) {
                        addClass(subList, subNavList);
                        subNavIsOpened = !subNavIsOpened;
                        preIndex       = index;
                    } else {
                        removeClass(subList, subNavList);
                        subNavIsOpened = !subNavIsOpened;
                    }
                }

                function checkToggleSubNav() {
                    var checkSubNav     = $('.subnav-is-opened')[0];

                    if(checkSubNav) {
                        removeClass(checkSubNav, subNavList);
                        if(preIndex != index)
                            subNavIsOpened = false;
                    }
                }

                if (subNav.addEventListener) {
                    subNav.addEventListener('click', function (e) {
                        if (isMobileView())
                            e.preventDefault();

                        e.stopPropagation();
                        toggleSubNav();
                    });

                    subList.addEventListener('click', function (e) {
                        e.stopPropagation();
                    });

                    subNav.addEventListener('mouseover', function (e) {
                        e.preventDefault();

                        if (!isMobileView()) {
                            addClass(subNav, subNavHover);
                            subNavIsOpened = !subNavIsOpened;
                        }
                    });

                    subNav.addEventListener('mouseout', function (e) {
                        e.preventDefault();

                        if (!isMobileView()) {
                            removeClass(subNav, subNavHover);
                            subNavIsOpened = !subNavIsOpened;
                        }
                    });
                } else { // ie 7/8 fix
                    subNav.attachEvent("onclick", function () {
                        toggleSubNav();
                    });

                    subNav.attachEvent("onmouseover", function () {
                        if (!isMobileView()) {
                            addClass(subNav, subNavHover);
                            subNavIsOpened = true;
                        }
                    });
                    subNav.attachEvent("onmouseout", function () {
                        if (!isMobileView()) {
                            removeClass(subNav, subNavHover);
                            subNavIsOpened = false;
                        }
                    });
                }
            });
        }
    }

    function mainSearch() {
        var searchBtn       = $('.search-toggle')[0];
        var searchContent   = $('.search-content')[0];
        var searchOpen      = 'search-is-open';
        var isSearchOpen    = false;

        function toggleSearch() {
            if(!isSearchOpen) {
                addClass(searchContent, searchOpen);
                addClass(searchBtn, searchOpen);
                isSearchOpen = true;
            } else {
                removeClass(searchContent, searchOpen);
                removeClass(searchBtn, searchOpen);
                isSearchOpen = false;
            }
        }

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
    }

    function isMobileView() {
        var browserWidth = window.innerWidth;
        var mobileDesktopBorder = 768;

        return (browserWidth < (mobileDesktopBorder+1));
    }

    function addClass(element, className) {
        if (!element) { return; }
        element.className = element.className.replace(/\s+$/gi, '') + ' ' + className;
    }

    function removeClass(element, className) {
        if (!element) { return; }
        element.className = element.className.replace(className, '');
    }

    mainNav();
    mainSubNav();
    mainSearch();

    function toggleMainNavbar() {

    }

    function checkNavOverflow () {
        var navbar = $('.navdrawer-container')[0],
            navHeight = navbar.scrollHeight,
            navbarCollapse = 'collapse-navbar',
            navMaxHeight = 39;

        //console.log('nav height: ', navHeight);
        if (navHeight > navMaxHeight) {
            addClass(navbar, navbarCollapse);
            //isNavbarCollapsed = true;
            console.log('added class navbarCollapse: ', navbarCollapse)
        } else {
            removeClass(navbar, navbarCollapse);
            //isNavbarCollapsed = false;
            console.log('REMOVED class navbarCollapse: ')
        }
    }

    // ToDo: function callback only registers twice
    $(window).resize( function () {
        checkNavOverflow();
    });
})(document);

