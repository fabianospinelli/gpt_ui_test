"use strict";

$(document).ready(function () {
    if (thematicViewerApp && thematicViewerApp.sandbox && thematicViewerApp.sandbox.active) {
        $('.mt').append(' ' + thematicViewerApp.sandbox.titleElement);
        $('.breadcrumb li:nth-child(3)').append(' [' + thematicViewerApp.sandbox.title + ']');
        $('body').css('background-image', 'url(' + thematicViewerApp.geoportalHostURL + '/images/sandbox-wm.png)');
        //$('[data-toggle="tooltip"]').tooltip();
    }
    
    //Include the header and footer
    $("#header").load("include/header.html");
    $("#footer").load("include/footer.html");

    //$('[data-toggle="tooltip"]').tooltip();

    $('[data-toggle="tooltip"]').tooltip();
});

