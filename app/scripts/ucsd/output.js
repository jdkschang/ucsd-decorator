// inefficent, have to get and parse json file every time user clicks
// build locally in array and parse array itself?

function formatTime( rawDate ) {
    var dateTimeOutput = [];

    dateTimeOutput.push( moment( rawDate ).format( "dddd, MMMM Do YYYY" ));
    dateTimeOutput.push( moment( rawDate ).format( "h:mm a" ));

    return dateTimeOutput;
}

/**
 * start & end parameters are arrays
 */
function rangeOfTime( start, end ) {
    console.log('in range of time fcn');
    console.log("start[0]: " + start[0]);
    console.log("start[1]: " + start[1]);

    console.log("end[0]: " + end[0]);
    console.log("end[1]: " + end[1]);
}

$(document).ready( function() {
    var jsonID, eventID, eventName,
        eventDetails, eventLocation, eventContact, eventWebsite, eventPhone,
        outputName      = $("#title"),
        outputDate      = $("#date span"),
        outputTime      = $("#time span"),
        outputLocation  = $("#location"),
        outputDetails   = $("#details"),
        outputContact   = $("#contact"),
        outputWebsite   = $("#website"),
        outputPhone     = $("#phone"),
        url             = window.location.href;

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
                rangeOfTime( eventStart, eventEnd );

                outputName.append(eventName);
                outputDate.append(eventStart[0]);
                outputTime.append(eventStart[1]);
                outputLocation.append(eventLocation);
                outputContact.append(eventContact);
                outputWebsite.append(eventWebsite);
                outputPhone.append(eventPhone);
                outputDetails.append(eventDetails);
            }
        });
    });
});