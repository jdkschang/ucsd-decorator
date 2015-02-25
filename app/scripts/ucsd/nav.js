(function(document) {
    var toggleMainNav = function() {
        var navBtn              = document.querySelector('.nav-btn');
        var navList             = document.querySelector('.navdrawer-container');
        var layoutHeader        = document.querySelector('.layout-header');         // for menu button transition
        var layoutMain          = document.querySelector('.layout-main');
        var layoutFooter        = document.querySelector('.layout-footer');
        var navIsOpenedClass    = 'navbar-is-opened';
        var menuOpen            = 'open';
        var navListIsOpened     = false;

        navBtn.addEventListener('click', function (event) {
            event.preventDefault();

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

    var addClass = function (element, className) {
        if (!element) { return; }
        element.className = element.className.replace(/\s+$/gi, '') + ' ' + className;
    }

    var removeClass = function(element, className) {
        if (!element) { return; }
        element.className = element.className.replace(className, '');
    }

    toggleMainNav();
})(document);