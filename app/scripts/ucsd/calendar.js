$(document).ready( function() {
    // initialize calendar
    $("#calendar").fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        defaultView: 'month',

        eventRender: function( event, element) {
            var eventStart = formatTime(event.start),
                eventEnd = formatTime(event.end),
                allDayBool = event.allDay,
                startDate, startTime,
                output_url = "cal-output.html?id=" + event.id;
            var contentEvent;

            // if one day event
            if(allDayBool) {
                startDate = eventStart[0];

                contentEvent = "Date: " + startDate +
                    "<br/> Time: All day" +
                    "<br/>" +
                    "<br/><a href=" + output_url + " class=pull-right>more details</a>";
            }
            else if( isSameDay( eventStart, eventEnd )) {
                startDate = eventStart[0];
                startTime = eventStart[1] + " - " + eventEnd[1];

                contentEvent = "Date: " + startDate +
                    "<br/> Time: " + startTime +
                    "<br/>" +
                    "<br/><a href=" + output_url + " class=pull-right>more details</a>";

            } else {
                var eventRange = rangeOfTime(eventStart, eventEnd);

                contentEvent = "Date: " + eventRange[0] +
                    "<br/>" +
                    "<br/><a href=" + output_url + " class=pull-right>more details</a>";
            }

            element.popover({
                html: true,
                placement: 'top',
                trigger: 'click',
                title: event.title,
                content: contentEvent
            })
            //.attr("tabIndex", "0")
            //.attr("data-trigger", "focus")
            .attr("data-toggle", "popover")
            //.attr("data-original-title", "");
            //var closePopover = '<a class="close" data-dismiss="popover">×</a>';
            //$(".popover-title").append(closePopover);
        },
        eventSources: [
            // event source
            {
                url: "json.json"
            }
        ]
    });

    function formatTime( rawDate ) {
        var dateTimeOutput = [];

        dateTimeOutput.push( moment( rawDate ).format( "ddd, MMMM Do YYYY" ));
        dateTimeOutput.push( moment( rawDate ).format( "h:mm a" ));

        return dateTimeOutput;
    }

    function isSameDay( start, end ) {
        var evStart, evEnd;
        evStart = start[0].toString();
        evEnd = end[0].toString();

        return ( evStart === evEnd );
    }

    function rangeOfTime( start, end ) {
        var evStart, evEnd,
            eventRangeOutput = [],
            yearRegex = /( )20(\d){2}/;

        evStart = start[0].toString().replace( yearRegex, ", " + start[1] );
        evEnd   = end[0].toString().replace( yearRegex, ", " + end[1] );

        eventRangeOutput.push(evStart + " - " + evEnd);
        eventRangeOutput.push( isSameDay( start, end ));

        return eventRangeOutput;
    }

    $('body').on('click', function (e) {
        $('[data-toggle="popover"]').each(function () {
            //the 'is' for buttons that trigger popups
            //the 'has' for icons within a button that triggers a popup
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });
});