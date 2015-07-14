// inefficent, have to get and parse json file every time user clicks
// build locally in array and parse array itself?

function formatTime( rawDate ) {
    var dateTimeOutput = [];

    dateTimeOutput.push( moment( rawDate ).format( "ddd, MMMM Do YYYY" ));
    dateTimeOutput.push( moment( rawDate ).format( "h:mm a" ));

    return dateTimeOutput;
}

/**
 * start & end parameters are arrays
 */
function rangeOfTime( start, end ) {
    var eventRangeOutput, evStart, evEnd,
        yearRegex = /( )20(\d){2}/;

    evStart             = start[0].toString().replace( yearRegex, ", " + start[1] );
    evEnd               = end[0].toString().replace( yearRegex, ", " + end[1] );
    eventRangeOutput    = evStart + " - " + evEnd;

    return eventRangeOutput;
}

function isSameDay( start, end ) {
    var evStart, evEnd;
    evStart = start[0].toString();
    evEnd = end[0].toString();

    return ( evStart === evEnd );
}

// adding list items to the detail list
function addDetailListItem( eventName, eventDetails ) {
    var eventDetailList = $(".cal-detail-list"),
        calDetail;

        // no event details
        if(!eventDetails) return;

        calDetail = "<li class='cal-detail'>" +
                        "<h4>" + eventName + "</h4>" +
                        "<span>" + eventDetails + "</span>" +
                    "</li>";

    eventDetailList.append(calDetail);
}

function parseURL() {
    var url = window.location.href;

    var parseRegex = new RegExp(/(?:(\?id=))\w+/g);
    var parseID = url.match(parseRegex);

    // takes parsed URL, turns into string and splits
    // takes the 2nd value in array for just the id
    return parseID.toString().split('=')[1];
}

function populateEventOutput( json ) {
    alert(json);
    var jsonID, eventID, eventTitle,
        eventDetails, eventLocation, eventContact, eventWebsite, eventPhone,
        outputTitle     = $("#title");


    var eventStart = [],
        eventEnd = [];

    jsonID = parseURL();

    $.each( json, function (i, event) {
        eventID         = event.id;
        eventTitle      = event.title;
        eventAllDay     = event.allDay;
        eventDetails    = event.details;
        eventLocation   = event.location;
        eventContact    = event.contact;
        eventWebsite    = event.website;
        eventPhone      = event.phone;

        eventStart      = formatTime(event.start);
        eventEnd        = formatTime(event.end);

        if ( eventID == jsonID ) {
            outputTitle.append(eventTitle);

            if(eventAllDay) {
                addDetailListItem( "When", eventStart[0]);
                addDetailListItem( "Time", "All Day");
            }
            else if(isSameDay( eventStart, eventEnd )) {
                addDetailListItem( "When", eventStart[0]);
                addDetailListItem( "Time", eventStart[1] + " - " + eventEnd[1]);
            } else {
                addDetailListItem( "When", rangeOfTime( eventStart, eventEnd ) );
            }

            addDetailListItem( "Location", eventLocation );
            addDetailListItem( "Contact", eventContact );
            addDetailListItem( "Website", eventWebsite );
            addDetailListItem( "Phone", eventPhone );
            addDetailListItem( "Details", eventDetails );
        }
    });
}

$(document).ready( function() {
    $.getJSON( "json.json", function(json ) {
        console.log("in get json fcn");
        populateEventOutput( json );
    });
});