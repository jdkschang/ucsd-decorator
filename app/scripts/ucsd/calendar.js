$(document).ready( function() {
    // initialize calendar
    $("#calendar").fullCalendar({
        // options & callbacks
        eventClick: function( calEvent, jsEvent, view ) {
            //console.log("event id: " + calEvent.id);
            //console.log("event name: " + calEvent.name);
            //console.log("event date: " + calEvent.date);

            $(this).popover('show');

            //var output_url = "cal-output.html?id=";
            //window.location.href = output_url + calEvent.id;;
        },
        eventRender: function( event, element) {
            element.popover({
                html: true,
                placement: 'top',
                title: "testing title",
                content: event.msg
            })
        },
        eventSources: [
            // event source
            {
                url: "calendar.json"
            }
        ]
    });
});