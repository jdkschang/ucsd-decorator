$(document).ready( function() {
    // initialize calendar
    $("#calendar").fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        defaultView: 'agendaWeek',
        // options & callbacks
        eventClick: function( calEvent, jsEvent, view ) {
            //console.log("event id: " + calEvent.id);
            //console.log("event name: " + calEvent.name);
            //console.log("event date: " + calEvent.date);

            //var output_url = "cal-output.html?id=";
            //window.location.href = output_url + calEvent.id;
        },
        eventRender: function( event, element) {
            var eventStart = formatTime(event.start),
                eventEnd = formatTime(event.end),
                output_url = "cal-output.html?id=" + event.id;
            var contentEvent;

            //console.log(eventStart);
            //console.log("event.end: " + event.end);
            // if one day event
            if(!event.end) {
                var startDate = eventStart[0],
                    startTime = eventStart[1];

                contentEvent = "Date: " + startDate +
                    "<br/> Time: " + startTime +
                    "<br/>" +
                    "<br/><a href=" + output_url + " class=pull-right>more details</a>";
            } else {
                var eventRange = rangeOfTime(eventStart, eventEnd);

                contentEvent = "Date: " + eventRange +
                    "<br/>" +
                    "<br/><a href=" + output_url + " class=pull-right>more details</a>";

            }

            element.popover({
                html: true,
                placement: 'top',
                trigger: 'click',
                title: event.name,
                content: contentEvent
            })
            .attr("tabIndex", "0")
            .attr("data-trigger", "focus")
            .attr("data-toggle", "popover");
        },
        eventSources: [
            // event source
            {
                url: "calendar.json"
            }
        ]
    });

    var fcAddDataAttr = function() {
        // add data attributes to get focus event trigger to work
        var fcEvent = $(".fc-event-container .fc-event");

        console.log(fcEvent);

        fcEvent.attr("tabIndex", "0");
        fcEvent.attr("data-trigger", "focus");
    };

    function formatTime( rawDate ) {
        var dateTimeOutput = [];

        dateTimeOutput.push( moment( rawDate ).format( "ddd, MMMM Do YYYY" ));
        dateTimeOutput.push( moment( rawDate ).format( "h:mm a" ));

        return dateTimeOutput;
    }

    function rangeOfTime( start, end ) {
        var eventRangeOutput, evStart, evEnd,
            yearRegex = /( )20(\d){2}/;

        evStart = start[0].toString().replace( yearRegex, ", " + start[1] );
        evEnd   = end[0].toString().replace( yearRegex, ", " + end[1] );
        eventRangeOutput = evStart + " - " + evEnd;

        return eventRangeOutput;
    }
    //fcAddDataAttr();
});