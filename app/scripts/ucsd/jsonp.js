/**
 * Created by jkchang on 10/21/2015.
 */
/* Loading JSON objects using JSONP */
(function($) {
    var url = 'https://qa-cwo.ucsd.edu/_files/menu.json';
    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        contentType: "application/json",
        dataType: 'jsonp',
        jsonpCallback: 'jsonCallback',
        success: function(json) {

            console.log(json["Decorator.menu"]);
            $('#menu').html(json["Decorator.menu"]);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('error', jqXHR, textStatus, errorThrown);
        }
    });
})(jQuery);