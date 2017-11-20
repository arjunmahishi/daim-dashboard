




$(function () {

    $('#hdt').click(function () {
        sessionStorage.selection = "HDT ENGINE";
        window.location.replace("/critical-list-detail.html");
    });
    $('#mdt').click(function () {
        sessionStorage.selection = "MDT ENGINE";
        window.location.replace("/critical-list-detail.html");

    });
    $('#transmission').click(function () {

        var cardTitle = "TRANSMISSION";
        sessionStorage.selection = cardTitle;
        console.log(cardTitle);
        window.location.replace("/critical-list-detail.html");

    });
    $('#axle').click(function () {

        var cardTitle = "AXLE";
        sessionStorage.selection = cardTitle;
        console.log(cardTitle);
        window.location.replace("/critical-list-detail.html");

    });
    $('#casting-and-forging').click(function () {

        var cardTitle = "CASTING AND FORGING";
        sessionStorage.selection = cardTitle;
        console.log(cardTitle);
        window.location.replace("/critical-list-detail.html");

    });






});
