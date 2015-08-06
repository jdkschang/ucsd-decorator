$(document).ready( function() {
    // initialize calendar
    $("#calendar").fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        defaultView: 'month',

        eventRender: function( event, element ) {
            var eventStart  = formatTime( event.start ),
                eventEnd    = formatTime( event.end ),
                allDayBool  = event.allDay,
                output_url  = "cal-output.html?id=" + event.id,
                popoverID   = "popover" + event.id.toString().substring(0, 5),
                startDate, startTime;
            var contentEvent;

            // if one day event
            if(allDayBool) {
                startDate = eventStart[0];

                contentEvent = "Date: " + startDate +
                    "<br/> Time: All day" +
                    categoryInput( event.category ) +
                    "<br/>" +
                    "<br/><a href=" + output_url + " class=pull-right>more details</a>";
            }
            else if( isSameDay( eventStart, eventEnd )) {
                startDate = eventStart[0];
                startTime = eventStart[1] + " - " + eventEnd[1];

                contentEvent = "Date: " + startDate +
                    "<br/> Time: " + startTime +
                    categoryInput( event.category ) +
                    "<br/>" +
                    "<br/><a href=" + output_url + " class=pull-right>more details</a>";

            } else {
                var eventRange = rangeOfTime(eventStart, eventEnd);

                contentEvent = "Date: " + eventRange[0] +
                    categoryInput( event.category ) +
                    "<br/>" +
                    "<br/><a href=" + output_url + " class=pull-right>more details</a>";
            }

            // check for google calendar link
            // no popovers for google calendar
            if( !element.context.href ) {
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
                .attr("aria-describedby", popoverID)
                .attr("aria-hidden", true);

            }
        },
        eventAfterRender: function( event, element, view ) {
            if( event.category ) {
                if( event.category === "Alumni") {
                    elemCategoryColor( element, "#5229A3");
                }
                else if( event.category === "Holidays") {
                    elemCategoryColor( element, "#FAD165");
                }
                else if( event.category === "Academics") {
                    elemCategoryColor( element, "#0D7813");
                }
                else if( event.category === "Students") {
                    elemCategoryColor( element, "#274D9A");
                }
                else if( event.category === "Events") {
                    elemCategoryColor( element, "#A32929");
                }
            }

            //$('[data-toggle="popover"]').popover({trigger: 'hover','placement': 'top'});

            //if(isMobileView()) {
            //    console.log('in event after render');
            //    $(".fc-toolbar").appendTo("#calendar")
            //} else {
            //    console.log('in else cond after render');
            //}
        },
        eventSources: [
            //event source
            {
                url: "json.json"
            },
            //{
            //    googleCalendarApiKey: "AIzaSyBPdlbHiiluijLwidJP8mZO3gdpyE--zP4",
            //    googleCalendarId: "kchangj@gmail.com"
            //},
            {
                googleCalendarApiKey: "AIzaSyDnWE6xGE0GPXVjY2HMNFUlSkBNeKzBtIo",
                googleCalendarId: "cwo.calendar@gmail.com",
                color: "orange",
                textColor: "#fff"
            }
        ]
    });

    var elemCategoryColor = function( element, color ) {
        element.css("background-color", color);
        element.css("border-color", color);
    };

    var formatTime = function( rawDate ) {
        var dateTimeOutput = [];

        dateTimeOutput.push( moment( rawDate ).format( "ddd, MMMM Do YYYY" ));
        dateTimeOutput.push( moment( rawDate ).format( "h:mm a" ));

        return dateTimeOutput;
    };

    var isSameDay = function( start, end ) {
        var evStart, evEnd;
        evStart = start[0].toString();
        evEnd = end[0].toString();

        return ( evStart === evEnd );
    };

    var rangeOfTime = function( start, end ) {
        var evStart, evEnd,
            eventRangeOutput = [],
            yearRegex = /( )20(\d){2}/;

        evStart = start[0].toString().replace( yearRegex, ", " + start[1] );
        evEnd   = end[0].toString().replace( yearRegex, ", " + end[1] );

        eventRangeOutput.push(evStart + " - " + evEnd);
        eventRangeOutput.push( isSameDay( start, end ));

        return eventRangeOutput;
    };

    var categoryInput = function ( category ) {
        var categoryOutput = "";

        if( category ) {
            categoryOutput = "<br/>" +
                "<span class='category category-" + category.toLowerCase() + "'>" + category + "</span>";
        }

        return categoryOutput;
    };

    // aria popover
    // role=tooltip
    // aria-describedby
    var popoverAria = function() {
        var popover = $('.popover'),
            popoverLength = popover.length;

        // check if popover event has been clicked
        if( popoverLength > 0 ) {
            if( popoverLength === 1 ) {
                popover.attr("role", "tooltip")
                    .attr("id", popover.prev()[0].getAttribute("aria-describedby"));
            } else if( popoverLength > 1 ) {
                popover.attr("role", "tooltip")
                    .attr("id", popover.prev()[1].getAttribute("aria-describedby"));
            }
        }
    };

    $('#calendar').on( 'click', function() {
        popoverAria();
    });

    $(document).keydown( function(e) {
        switch(e.keyCode) {
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

    $('body').on('click', function ( evt ) {

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
});