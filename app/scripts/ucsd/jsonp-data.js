(function () {
    var jsonp = $('script[data-decorator-site]'),
        site = jsonp[0].getAttribute('data-decorator-site'),
        elem = jsonp[0].getAttribute('data-elem'),
        siteURL = "https://qa-" + site + ".ucsd.edu/_decorator-html/json.json",
        elemResult;



    /* function: parseElem
     *
     * Input: element list and element component query
     *
     * Description: takes in user input list of elements: header, footer, and menu
     * returns list of booleans
     *
     * return type: bool
     * */
    function parseElem (elemList, elementComponent) {
        var outList = [],
            elemResult;

        elemResult = elemList.replace(/\s/g, "").split(",");

        for(var i = 0; i < elemResult.length; i++) {
            if(elementComponent === elemResult[i]) {
                return true;
            }
        }

        return false;
    }



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
                if(parseElem(elem, "menu")) {
                    $("nav div.layout-container").append(json["decorator.menu"]);
                }

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