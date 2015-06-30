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
            var eventDate = formatTime(event.date)[0],
                eventTime = formatTime(event.date)[1],
                output_url = "cal-output.html?id=" + event.id,
                contentEvent = "Date: " + eventDate +
                            "<br/> Time: " + eventTime +
                            "<br/> <a href=" + output_url + "> more details</a>";

            element.popover({
                html: true,
                placement: 'top',
                title: event.title,
                content: contentEvent
                //function() {
                //    return $("#cal-test").html();
                //}
            })
        },
        eventSources: [
            // event source
            {
                url: "calendar.json"
            }
        ]
    });

    function formatTime( rawDate ) {
        var dateTimeOutput = [];

        dateTimeOutput.push( moment( rawDate ).format( "dddd, MMMM Do YYYY" ));
        dateTimeOutput.push( moment( rawDate ).format( "h:mm a" ));

        return dateTimeOutput;
    }
});