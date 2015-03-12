(function(document) {
    var mobileView = false;

    var toggleMainNav = function() {
        var navBtn              = document.querySelector('.btn-nav');
        var navList             = document.querySelector('.navdrawer-container');
        var layoutHeader        = document.querySelector('.layout-header');         // for menu button transition
        var layoutMain          = document.querySelector('.layout-main');
        var layoutFooter        = document.querySelector('.layout-footer');
        var navIsOpenedClass    = 'navbar-is-opened';
        var menuOpen            = 'open';
        var navListIsOpened     = false;

        navBtn.addEventListener('click', function (e) {
            e.preventDefault();

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
        });
    }

    var toggleSubNav = function() {
        var subNav          = document.querySelector('.navbar-subnav');
        var subList         = document.querySelector('.navbar-sublist');
        var subNavList      = 'subnav-is-opened';
        var subNavHover     = 'subnav-hover';
        var subNavIsOpened  = false;

        subNav.addEventListener('click', function(e) {
            e.preventDefault();
            detectBrowserWidth();

            if(!subNavIsOpened) {
                addClass(subList, subNavList);

                subNavIsOpened = true;
            } else {
                removeClass(subList, subNavList);

                subNavIsOpened = false;
            }
        });

        if(mobileView) {
            alert('in mobile view');
            subNav.addEventListener('mouseover', function (e) {
                e.preventDefault();

                addClass(subNav, subNavHover);

                subNavIsOpened = true;
            });

            subNav.addEventListener('mouseout', function (e) {
                e.preventDefault();

                removeClass(subNav, subNavHover);

                subNavIsOpened = false;
            })
        }
    };

    var detectBrowserWidth = function() {
        var browserWidth = window.innerWidth;
        var mobileDesktopBorder = 768;

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

    toggleMainNav();
    toggleSubNav();
})(document);