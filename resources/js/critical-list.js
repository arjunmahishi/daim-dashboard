//var url = "https://daimler-backend.herokuapp.com/critical_list/";





$(function(){

    $('#hdt').click(function(){
        sessionStorage.selection = "HDT ENGINE";
        window.location.replace("https://daimler-frontend.netlify.com/critical-list-detail.html");
    });
    $('#mdt').click(function(){
        sessionStorage.selection = "MDT ENGINE";
        window.location.replace("https://daimler-frontend.netlify.com/critical-list-detail.html");

    });
    $('#transmission').click(function(){

        var cardTitle = "TRANSMISSION";
        sessionStorage.selection = cardTitle;
        console.log(cardTitle);
        window.location.replace("https://daimler-frontend.netlify.com/critical-list-detail.html");

    });
    $('#axle').click(function(){

        var cardTitle = "AXLE";
        sessionStorage.selection = cardTitle;
        console.log(cardTitle);
        window.location.replace("https://daimler-frontend.netlify.com/critical-list-detail.html");

    });
    $('#casting-and-forging').click(function(){

        var cardTitle = "CASTING AND FORGING";
        sessionStorage.selection = cardTitle;
        console.log(cardTitle);
        window.location.replace("https://daimler-frontend.netlify.com/critical-list-detail.html");

    });






});
