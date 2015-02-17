(function(document) {
    var toggleDocumentationMenu = function() {
        var navBtn              = document.querySelector('.nav-btn');
        var navList             = document.querySelector('.navbar-list');
        var navIsOpenedClass    = 'nav-is-opened';
        var navListIsOpened     = false;

        navBtn.addEventListener('click', function (event) {
            event.preventDefault();

            if (!navListIsOpened) {
                addClass(navList, navIsOpenedClass);
                navListIsOpened = true;
            } else {
                removeClass(navList, navIsOpenedClass);
                navListIsOpened = false;
            }
        });
    }

    var toggleMainNav = function() {
        var documentationItem           = document.querySelector('.main-nav__item--documentation');
        var documentationLink           = document.querySelector('.main-nav__item--documentation > .main-nav__link');
        var documentationIsOpenedClass  = 'subnav-is-opened';
        var documentationIsOpened       = false;

        if (documentationLink) {
            documentationLink.addEventListener('click', function (event) {
                event.preventDefault();

                if (!documentationIsOpened) {
                    documentationIsOpened = true;
                    addClass(documentationItem, documentationIsOpenedClass);
                } else {
                    documentationIsOpened = false;
                    removeClass(documentationItem, documentationIsOpenedClass);
                }
            });
        }
    }

    var addClass = function (element, className) {
        if (!element) { return; }
        element.className = element.className.replace(/\s+$/gi, '') + ' ' + className;
    }

    var removeClass = function(element, className) {
        if (!element) { return; }
        element.className = element.className.replace(className, '');
    }

    toggleDocumentationMenu();
    toggleMainNav();
})(document);