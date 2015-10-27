/**
 * Created by jkchang on 10/21/2015.
 */
/* Loading JSON objects using JSONP */
var jsonp = jsonp || (function() {
    "use strict";
    var _args = {}; // private

    return {
        init: function (Args) {
            _args = Args;
            // some other initialising
        },

        renderDecorator: function() {
            $(document).ready( function () {
                decorateNav();

                console.log('render decorator: document ready');


                //decorateScripts();
            });

            function decorateNav () {
                var nav = $("nav"),
                    navClass = "navdrawer-container layout-navbar",
                    container = "<div class=\"layout-container\"></div>";

                nav.addClass(navClass);
                nav.append(container);
            }

            function decorateScripts () {
                var vendorjs = addScripts("vendor.js"),
                    basejs   = addScripts("base-min.js"),
                    footer = $("footer"),
                    footerClass = "layout-footer",
                    container = "<div class=\"layout-container\">" + vendorjs + basejs + "</div>";

                footer.addClass(footerClass);
                footer.append(container);
            }

            function addScripts (script) {
                return "<script src=\"https://cdn.ucsd.edu/cms/decorator-4.5/scripts/" + script + "\"></script>";
            }
        },

        renderPage: function () {
            var url = _args[0];

            console.log('page rendered');

            $.ajax({
                type: 'GET',
                url: url,
                async: false,
                contentType: "application/json",
                dataType: 'jsonp',
                jsonpCallback: 'jsonCallback',
                success: function (json) {
                    console.log(json["Decorator.menu"]);
                    $("nav div.layout-container").html(json["Decorator.menu"]);

                    // async load base script
                    (function() {
                        var s = document.createElement('script');
                        s.type = 'text/javascript';
                        s.async = true;
                        s.src = 'https://cdn.ucsd.edu/cms/decorator-4.5/scripts/base-min.js';
                        var x = document.getElementsByTagName('script')[0];
                        x.parentNode.insertBefore(s, x);

                        console.log('async');
                    })();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('error', jqXHR, textStatus, errorThrown);
                }
            });
        }
    }
})();