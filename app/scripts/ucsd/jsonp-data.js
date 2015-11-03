(function () {
    var jsonp = $('script[data-decorator-site]'),
        site = jsonp[0].getAttribute('data-decorator-site'),
        elem = jsonp[0].getAttribute('data-elem'),
        siteURL = "https://qa-" + site + ".ucsd.edu/_decorator-html/json.json",
        elemResult;
        //siteURL = "menu.json";

    console.log('elem: ', elem);
    elemResult = elem.replace(/\s/g, "").split(",");
    console.log('elemResult: ', elemResult);


    // ToDo: JSON.parse(elem) needs to be parsed through a function

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
                $("nav div.layout-container").append(json["decorator." + JSON.parse(elem)[0]]);

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