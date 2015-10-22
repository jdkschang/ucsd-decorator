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

        renderDecorator: function () {
            var url = _args[0];
            $.ajax({
                type: 'GET',
                url: url,
                async: false,
                contentType: "application/json",
                dataType: 'jsonp',
                jsonpCallback: 'jsonCallback',
                success: function (json) {

                    console.log(json["Decorator.menu"]);
                    $('#menu').html(json["Decorator.menu"]);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('error', jqXHR, textStatus, errorThrown);
                }
            });
        }
    }
})();