// inefficent, have to get and parse json file every time user clicks
// build locally in array and parse array itself?

function formatTime( rawDate ) {
    var dateTimeOutput = [];

    dateTimeOutput.push( moment( rawDate ).format( "dddd, MMMM Do YYYY" ));
    dateTimeOutput.push( moment( rawDate ).format( "h:mm a" ));

    return dateTimeOutput;
}

$(document).ready( function() {
    var jsonID, eventID, eventName,
        eventDetails, eventLocation, eventContact, eventWebsite, eventPhone,
        outputName = $("#name span"),
        outputDate = $("#date span"),
        outputTime = $("#time span"),
        url     = window.location.href;

    var eventStart = [],
        eventEnd = [];

    //grabID.on( "click", function() {
    var parseRegex = new RegExp(/(?:(\?id=))\w+/g);
    var parseID = url.match(parseRegex);

    // takes parsed URL, turns into string and splits
    // takes the 2nd value in array for just the id
    jsonID = parseID.toString().split('=')[1];

    $.getJSON( "calendar.json", function( json ) {
        json.forEach(function (event) {
            eventID         = event.id;
            eventName       = event.name;
            eventDetails    = event.details;
            eventLocation   = event.location;
            eventContact    = event.contact;
            eventWebsite    = event.website;
            eventPhone      = event.phone;

            eventStart      = formatTime(event.start);
            eventEnd        = formatTime(event.end);

            if ( eventID == jsonID ) {
                outputName.append(eventName);
                outputDate.append(eventStart[0]);
                outputTime.append(eventStart[1]);
            }
        });
    });
    //});
});