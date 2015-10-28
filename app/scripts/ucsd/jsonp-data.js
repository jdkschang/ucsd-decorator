(function () {
    var jsonp = $('script[data-id="jsonp"]'),
        site = jsonp[0].getAttribute('data-site'),
        siteURL = "https://qa-" + site + ".ucsd.edu/_files/menu-4.5.json";

     function renderDecorator () {
        $.ajax({
            type: 'GET',
            url: siteURL,
            async: false,
            contentType: "application/json",
            dataType: 'jsonp',
            jsonpCallback: 'jsonCallback',
            success: function (json) {
                //console.log(json["Decorator.menu"]);
                $("nav div.layout-container").html(json["Decorator.menu"]);

                // async load base script to allow for dropdown
                var s = document.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.src = 'https://cdn.ucsd.edu/cms/decorator-4.5/scripts/base-min.js';
                var x = document.getElementsByTagName('script')[0];
                x.parentNode.insertBefore(s, x);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('error', jqXHR, textStatus, errorThrown);
            }
        });
    }

    renderDecorator();
})();