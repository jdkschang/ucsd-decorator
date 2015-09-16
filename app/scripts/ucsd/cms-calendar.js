var cmsCalendar = cmsCalendar || (function() {
    var _args = {}; // private

    var isMobileView = function() {
        var browserWidth = window.innerWidth,
            mobileDesktopBorder = 768;

        return (browserWidth < (mobileDesktopBorder+1));
    };

    return {
        init: function (Args) {
            _args = Args;
        },
        renderCalendar: function () {
            var isJSON = true,
                ifJSONFailOutput,
                jsonObjectReturn = [];


            // initialize calendar
            // check json valid
            $.get(_args[0], function (json) {
                console.log('this is json from get: ', json);

                //$.each(json, function (i, event) {
                //    console.log('i:\t', i);
                //    console.log('json at i & details:\t', json[i].details);
                //})
            })
                .done(function() {
                    console.log( "second success" );
                })
                .fail(function( data ) {
                    console.log('JSON FAILED');
                    isJSON = false;
                    $.each(data, function (i) {
                        // find failed json string
                        if(i.toString() === "responseText") {
                            var detailRegex = /(?:"details": .*>",)/g,
                                encloseRegex = /[\[\]\{\}]/g,
                                endObjectRegex = /}/g,
                                jsonOutput = data[i].split('\n'),
                                jsonObject = {};

                            function populateJsonObject (arr) {
                                jsonObject[arr[0]] = arr[1];
                                //console.log('jsonObject:', jsonObject);
                            }

                            $.each(jsonOutput, function(index, content) {
                                var contentOutput = content.split(": ");


                                // trimming string "" on key
                                if(contentOutput[1] !== undefined) {
                                    // extracting word from string ""
                                    contentOutput[0] = contentOutput[0].trim(" ");
                                    //console.log('contentOutput: ', contentOutput);
                                    //contentOutput[0] = contentOutput[0].substring(1, contentOutput[0].length - 1);
                                    //console.log('contentOutput: ', contentOutput);
                                }

                                // if content contains detail section
                                if(content.search(detailRegex) > -1) {
                                    // extracting content without ending double quotes and comma
                                    var testContent = contentOutput[1].substring(1, contentOutput[1].length - 3);
                                    // if content still contains double quotes
                                    if(testContent.search(/"/g) > -1) {
                                        // need to replace double quotes with single or escape
                                        testContent = testContent.replace(/\"/g, '\\"');
                                    }

                                    contentOutput[1] = "\"" + testContent + "\",";
                                }

                                if(content.search(encloseRegex) < 0) {
                                    //console.log('contentOutput: ', contentOutput);
                                    //jsonObject[contentOutput[0]] = contentOutput[1];
                                    //console.log('jsonObject;\t', jsonObject);
                                    populateJsonObject(contentOutput);
                                } else if(content.search(endObjectRegex) > -1){
                                    jsonObjectReturn.push(jsonObject);
                                    jsonObject = {};
                                    console.log('jsonObjectReturn:\t', jsonObjectReturn);
                                }
                            });
                            //jsonObjectReturn = jsonObjectReturn.join('\n');
                            //console.log('json FORMATTED: ', jsonObjectReturn);
                            //console.log('\tjson TYPE:\t', typeof jsonObjectReturn);

                            jsonObjectReturn = JSON.stringify(jsonObjectReturn);
                            //console.log('json STRINGIFIED: ', jsonObjectReturn);
                            //console.log('\tjson TYPE:\t', typeof jsonObjectReturn);
                            //
                            jsonObjectReturn = JSON.parse(jsonObjectReturn);
                            //console.log('json PARSED: ', jsonObjectReturn);
                            //console.log('\tjson TYPE:\t', typeof jsonObjectReturn);
                        } // end of responseText

                    }); // END of $.each
                    console.log( "error" );
                })
                .always(function() {
                    console.log( "complete" );
                    execCalendar();
                });



            function execCalendar () {
                if (!isMobileView()) {
                    // desktop view
                    if (isJSON) {
                        console.log('JSON is TRUE');
                        $("#calendar").fullCalendar({
                            header: {
                                left: 'prev,next today',
                                center: 'title',
                                right: 'month,agendaWeek,agendaDay'
                            },
                            defaultView: 'month',

                            // parsing json to display event data formatted in popovers
                            // as well as inputting accessibility attributes
                            eventRender: function (event, element) {
                                var eventStart = formatTime(event.start),
                                    eventEnd = formatTime(event.end),
                                    allDayBool = event.allDay,
                                    output_url = "cal-output.html?id=" + event.id,
                                    popoverID = "popover" + event.id.toString().substring(0, 5),
                                    startDate, startTime;
                                var contentEvent;

                                // pending type of date, different contentEvent formatted
                                // category type also inputted

                                // if one day event
                                if (allDayBool) {
                                    startDate = eventStart[0];

                                    contentEvent = "Date: " + startDate +
                                        "<br/> Time: All day" +
                                        categoryInput(event.category) +
                                        "<br/>" +
                                        "<br/><a href=" + output_url + " class=pull-right>more details</a>";
                                } // if event only happens within the day
                                else if (isSameDay(eventStart, eventEnd)) {
                                    startDate = eventStart[0];
                                    startTime = eventStart[1] + " - " + eventEnd[1];

                                    contentEvent = "Date: " + startDate +
                                        "<br/> Time: " + startTime +
                                        categoryInput(event.category) +
                                        "<br/>" +
                                        "<br/><a href=" + output_url + " class=pull-right>more details</a>";

                                } else { // if event covers more than a day
                                    var eventRange = rangeOfTime(eventStart, eventEnd);

                                    contentEvent = "Date: " + eventRange[0] +
                                        categoryInput(event.category) +
                                        "<br/>" +
                                        "<br/><a href=" + output_url + " class=pull-right>more details</a>";
                                }

                                // check for google calendar link
                                // no popovers for google calendar
                                if (!element.context.href) {
                                    element.popover({
                                        html: true,
                                        placement: 'top',
                                        trigger: 'click',
                                        title: event.title,
                                        content: contentEvent
                                    })
                                        .attr("role", "button")
                                        .attr("data-toggle", "popover")
                                        .attr("tabindex", "0")              // allows events to be tabbed
                                        //.attr("href", output_url )
                                        .attr("aria-haspopup", true)
                                        .attr("data-id", popoverID)
                                        .attr("aria-hidden", true);

                                }
                            }, // if event has a category, color the event with the cateogry's color
                            eventAfterRender: function (event, element) {
                                if (event.category) {
                                    if (event.category === "Alumni") {
                                        elemCategoryColor(element, "#5229A3");
                                    }
                                    else if (event.category === "Holidays") {
                                        elemCategoryColor(element, "#FAD165");
                                    }
                                    else if (event.category === "Academics") {
                                        elemCategoryColor(element, "#0D7813");
                                    }
                                    else if (event.category === "Students") {
                                        elemCategoryColor(element, "#274D9A");
                                    }
                                    else if (event.category === "Events") {
                                        elemCategoryColor(element, "#A32929");
                                    }
                                }

                                // accessibility to prev & next buttons
                                var fcPrev = $('.fc-prev-button'),
                                    fcNext = $('.fc-next-button');

                                fcNext.attr("aria-label", "fc-next");
                                fcPrev.attr("aria-label", "fc-prev");
                            },
                            eventSources: [
                                //event source
                                {
                                    url: _args[0],
                                    error: function () {
                                        console.log('error fetching ', _args[0]);
                                    }
                                },
                                {
                                    googleCalendarApiKey: "AIzaSyDnWE6xGE0GPXVjY2HMNFUlSkBNeKzBtIo",
                                    googleCalendarId: _args[2],
                                    color: "orange",
                                    textColor: "#fff"
                                }
                            ]
                        });
                    } else {
                        console.log('JSON IS FALSE AND ARGS: ', typeof jsonObjectReturn);
                        console.log('JSON IS FALSE AND ARGS: ', jsonObjectReturn);
                        $("#calendar").fullCalendar({
                            header: {
                                left: 'prev,next today',
                                center: 'title',
                                right: 'month,agendaWeek,agendaDay'
                            },
                            defaultView: 'month',

                            // parsing json to display event data formatted in popovers
                            // as well as inputting accessibility attributes
                            eventRender: function (event, element) {
                                var eventStart = formatTime(event.start),
                                    eventEnd = formatTime(event.end),
                                    allDayBool = event.allDay,
                                    output_url = "cal-output.html?id=" + event.id,
                                    popoverID = "popover" + event.id.toString().substring(0, 5),
                                    startDate, startTime;
                                var contentEvent;

                                // pending type of date, different contentEvent formatted
                                // category type also inputted

                                // if one day event
                                if (allDayBool) {
                                    startDate = eventStart[0];

                                    contentEvent = "Date: " + startDate +
                                        "<br/> Time: All day" +
                                        categoryInput(event.category) +
                                        "<br/>" +
                                        "<br/><a href=" + output_url + " class=pull-right>more details</a>";
                                } // if event only happens within the day
                                else if (isSameDay(eventStart, eventEnd)) {
                                    startDate = eventStart[0];
                                    startTime = eventStart[1] + " - " + eventEnd[1];

                                    contentEvent = "Date: " + startDate +
                                        "<br/> Time: " + startTime +
                                        categoryInput(event.category) +
                                        "<br/>" +
                                        "<br/><a href=" + output_url + " class=pull-right>more details</a>";

                                } else { // if event covers more than a day
                                    var eventRange = rangeOfTime(eventStart, eventEnd);

                                    contentEvent = "Date: " + eventRange[0] +
                                        categoryInput(event.category) +
                                        "<br/>" +
                                        "<br/><a href=" + output_url + " class=pull-right>more details</a>";
                                }

                                // check for google calendar link
                                // no popovers for google calendar
                                if (!element.context.href) {
                                    element.popover({
                                        html: true,
                                        placement: 'top',
                                        trigger: 'click',
                                        title: event.title,
                                        content: contentEvent
                                    })
                                        .attr("role", "button")
                                        .attr("data-toggle", "popover")
                                        .attr("tabindex", "0")              // allows events to be tabbed
                                        //.attr("href", output_url )
                                        .attr("aria-haspopup", true)
                                        .attr("data-id", popoverID)
                                        .attr("aria-hidden", true);

                                }
                            }, // if event has a category, color the event with the cateogry's color
                            eventAfterRender: function (event, element) {
                                //console.log('full calendar add event source added');
                                //console.log('json object return: ', jsonObjectReturn);
                                //$('#calendar').fullCalendar('addEventSource', jsonObjectReturn);
                                if (event.category) {
                                    if (event.category === "Alumni") {
                                        elemCategoryColor(element, "#5229A3");
                                    }
                                    else if (event.category === "Holidays") {
                                        elemCategoryColor(element, "#FAD165");
                                    }
                                    else if (event.category === "Academics") {
                                        elemCategoryColor(element, "#0D7813");
                                    }
                                    else if (event.category === "Students") {
                                        elemCategoryColor(element, "#274D9A");
                                    }
                                    else if (event.category === "Events") {
                                        elemCategoryColor(element, "#A32929");
                                    }
                                }

                                // accessibility to prev & next buttons
                                var fcPrev = $('.fc-prev-button'),
                                    fcNext = $('.fc-next-button');

                                fcNext.attr("aria-label", "fc-next");
                                fcPrev.attr("aria-label", "fc-prev");
                            },
                            eventSources: [
                                //event source
                            //    {
                            //        events:
                            //            //jsonObjectReturn,
                            //            [
                            //    {
                            //        id: "8ffa293bac1a010c0ae376c64edaae4a",
                            //        title: "TEST Event 4 | Dynamic Rendering",
                            //        start: "2015-09-10 17:00:00",
                            //        end: "2015-09-10 19:00:00",
                            //        allday: false,
                            //        category: "Holidays",
                            //        details: "<p>Details about all day event</p><h2>test</h2><img src=\"hello.png\" alt=\"hello image\" >",
                            //        location: "Sandy Eggo",
                            //        contact: "Contact Name",
                            //        website: "",
                            //        phone: ""
                            //    },
                            //    {
                            //        id: "8ffa282dac1a010c0ae376c6e5f06e3a",
                            //        title: "TEST Event 5",
                            //        start: "2015-09-16 08:00:00",
                            //        end: "2015-09-16 10:00:00",
                            //        allDay: false,
                            //        category: "Students",
                            //        location: "Bella Vista",
                            //        contact: "Joe Pigga",
                            //        website: "Website",
                            //        phone: "000-000-000"
                            //    },
                            //    {
                            //        id: "8ffa26b2ac1a010c0ae376c67e7a1a7f",
                            //        title: "TEST Event 3",
                            //        start: "2015-09-07 17:00:00",
                            //        end: "2015-09-07 19:00:00",
                            //        allDay: true,
                            //        category: "Alumni",
                            //        details: "<p>Details about all day event</p>",
                            //        location: "Sandy Eggo",
                            //        contact: "Contact Name",
                            //        website: "ucsd.edu",
                            //        phone: "000-000-000"
                            //    },
                            //    {
                            //        id: "8ffa25a8ac1a010c0ae376c6586322ac",
                            //        title: "TEST Event 2",
                            //        start: "2015-09-15 05:00:00",
                            //        end: "2015-09-15 16:00:00",
                            //        allDay: false,
                            //        category: "Academics",
                            //        details: "<p>Details</p>",
                            //        location: "Location",
                            //        contact: "Contact Name",
                            //        website: "Website",
                            //        phone: "000-000-000"
                            //    },
                            //    {
                            //        id: "8ffa24aeac1a010c0ae376c6de0bdb18",
                            //        title: "TEST Event 1",
                            //        start: "2015-09-29 05:00:00",
                            //        end: "2015-09-30 06:00:00",
                            //        allDay: false,
                            //        category: "Events",
                            //        details: "<p>Details</p>",
                            //        location: "Location",
                            //        contact: "Contact Name",
                            //        website: "Website",
                            //        phone: "000-000-000"
                            //    }
                            //],
                            //        error: function() {
                            //            console.error('error fetching in EVENT SOURCES ', _args[0]);
                            //        }
                            //    },
                                {
                                    googleCalendarApiKey: "AIzaSyDnWE6xGE0GPXVjY2HMNFUlSkBNeKzBtIo",
                                    googleCalendarId: _args[2],
                                    color: "orange",
                                    textColor: "#fff"
                                }
                            ]
                        });
                    }
                } else {
                    // mobile view
                    // ToDo: mobile stuffs here
                }
            }

            // event background emulates category's color
            function elemCategoryColor (element, color) {
                element.css("background-color", color);
                element.css("border-color", color);
            };

            // formats raw date format and outputs array
            // array[0] contains the date name, month, day, and year
            // array[1] contains the hour, minute and am/pm
            function formatTime (rawDate) {
                var dateTimeOutput = [];

                dateTimeOutput.push(moment(rawDate).format("ddd, MMMM Do YYYY"));
                dateTimeOutput.push(moment(rawDate).format("h:mm a"));

                return dateTimeOutput;
            };

            // check if the event only happens in the same day
            function isSameDay (start, end) {
                var evStart, evEnd;
                evStart = start[0].toString();
                evEnd = end[0].toString();

                return ( evStart === evEnd );
            };

            // finds the event's date and time range
            function rangeOfTime (start, end) {
                var evStart, evEnd,
                    eventRangeOutput = [],
                    yearRegex = /( )20(\d){2}/;

                evStart = start[0].toString().replace(yearRegex, ", " + start[1]);
                evEnd = end[0].toString().replace(yearRegex, ", " + end[1]);

                eventRangeOutput.push(evStart + " - " + evEnd);
                eventRangeOutput.push(isSameDay(start, end));

                return eventRangeOutput;
            };

            // takes category input and outputs parsed html
            function categoryInput (category) {
                var categoryOutput = "";

                if (category) {
                    categoryOutput = "<br/>" +
                        "<span class='category category-" + category.toLowerCase() + "'>" + category + "</span>";
                }

                return categoryOutput;
            };

            // aria popover
            // role=tooltip
            // aria-describedby
            // adds accessibility attributes to popover
            // ToDo:: if aria attribute added, don't add again
            var popoverArray = [];   // array of arrays (tuples)
            function popoverAria (evt) {
                var popover = $('.popover'),
                    popoverLength = popover.length;

                // check if popover event has been clicked
                if (popoverLength > 0) {
                    var popoverTarget = $(evt.target);

                    // if in event target
                    if (popoverTarget.closest('a').length > 0) {
                        var popoverTargetID = $(evt.target).closest('a').data("id");
                        popoverTarget.closest('a').attr("aria-describedby", popoverTargetID);

                        var removePopoverID;
                        if (popoverArray.length > 0) {
                            removePopoverID = popoverArray.shift();
                            var removePopoverTargetID = $('[data-id=' + removePopoverID + ']');
                            removePopoverTargetID.removeAttr('aria-describedby');
                        }

                        popoverArray.push(popoverTargetID);

                        // adding tooltip & id to popovers
                        popover.attr("role", "tooltip")
                            .attr("id", popoverTargetID);
                    }
                }
            };

            // provides keyboard functionality to fullcalendar
            // 'enter' functions as a 'click' on events
            // 'left' & 'right' arrow goes to prev and next months respectively
            $(document).keydown(function (e) {
                switch (e.keyCode) {
                    // User pressed "Enter" key
                    case 13:
                        e.target.click();
                        break;
                    // User pressed "right" arrow
                    case 39:
                        $('#calendar').fullCalendar('next');
                        break;
                    // User pressed "left" arrow
                    case 37:
                        $('#calendar').fullCalendar('prev');
                        break;
                }
            });

            $('body').on('click', function (evt) {
                // add popoverAria attributes
                popoverAria(evt);

                // add close 'x' to popover
                $('.popover-title').append(
                    '<span class="close" data-dismiss="popover">x</span>'
                );

                // dismissible popover
                $('[data-toggle="popover"]').each(function () {
                    //the 'is' for buttons that trigger popups
                    //the 'has' for icons within a button that triggers a popup
                    if (!$(this).is(evt.target) && $(this).has(evt.target).length === 0) {
                        $(this).popover('hide');
                    }
                });
            });
        }
    };
}());
