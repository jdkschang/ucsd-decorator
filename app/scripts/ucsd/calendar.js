$(document).ready( function() {
    // initialize calendar
    $("#calendar").fullCalendar({
        // options & callbacks
        eventClick: function( calEvent, jsEvent, view ) {
            //console.log("event id: " + calEvent.id);
            //console.log("event name: " + calEvent.name);
            //console.log("event date: " + calEvent.date);

            //var output_url = "cal-output.html?id=";
            //window.location.href = output_url + calEvent.id;;
        },
        eventRender: function( event, element) {
            var eventDate = formatTime(event.date)[0],
                eventTime = formatTime(event.date)[1],
                contentEvent = "Date: " + eventDate + "Time: " + eventTime,
                output_url = "cal-output.html?"



            element.popover({
                html: false,
                placement: 'top',
                trigger: 'click focus',
                title: event.title,
                content: contentEvent
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

    /**
     * manual triggers popover
     *
     * multiple trigger not working
     */
    var showPopover = function () {
            $(this).popover('show');
        },
        hidePopover = function () {
            $(this).popover('hide');
        };
});