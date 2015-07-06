$(document).ready( function() {
    // initialize calendar
    $("#calendar").fullCalendar({
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

            //console.log(eventStart);
            //console.log("event.end: " + event.end);
            if(!event.end) console.log(eventEnd);


                //contentEvent = "Date: " + eventDate +
                //            "<br/> Time: " + eventTime +
                //            "<br/>" +
                //            "<br/><a href=" + output_url + " class=pull-right>more details</a>";

            element.popover({
                html: true,
                placement: 'top',
                trigger: 'click',
                title: event.name,
                //content: contentEvent
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

        dateTimeOutput.push( moment( rawDate ).format( "dddd, MMMM Do YYYY" ));
        dateTimeOutput.push( moment( rawDate ).format( "h:mm a" ));

        return dateTimeOutput;
    }

    function rangeOfTime( start, end ) {
        //console.log('in range of time fcn');
        //console.log("start[0]: " + start[0]);
        //console.log("start[1]: " + start[1]);
        //
        //console.log("end[0]: " + end[0]);
        //console.log("end[1]: " + end[1]);
    }

    //fcAddDataAttr();
});