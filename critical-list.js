//var url = "https://daimler-backend.herokuapp.com/critical_list/";





$(function(){

    $('#hdt').click(function(){
        var children = this.children;
        var cardTitle = children[0].childNodes[1].childNodes[1].innerHTML;
        sessionStorage.selection = cardTitle;
        cardTitle = cardTitle + " ENGINE";
        console.log(cardTitle);
        window.location.replace("https://daimler-frontend.netlify.com/critical-list-detail.html");
    });
    $('#mdt').click(function(){
        var children = this.children;
        var cardTitle = children[0].childNodes[1].childNodes[1].innerHTML;
        sessionStorage.selection = cardTitle;
        cardTitle = cardTitle = " ENGINE";
        console.log(cardTitle);
        window.location.replace("https://daimler-frontend.netlify.com/critical-list-detail.html");

    });
    $('#transmission').click(function(){
        var children = this.children;
        var cardTitle = children[0].childNodes[1].childNodes[1].innerHTML;
        sessionStorage.selection = cardTitle;
        console.log(cardTitle);
        window.location.replace("https://daimler-frontend.netlify.com/critical-list-detail.html");

    });
    $('#axle').click(function(){
        var children = this.children;
        var cardTitle = children[0].childNodes[1].childNodes[1].innerHTML;
        sessionStorage.selection = cardTitle;
        console.log(cardTitle);
        window.location.replace("https://daimler-frontend.netlify.com/critical-list-detail.html");

    });
    $('#casting-and-forging').click(function(){
        var children = this.children;
        var cardTitle = children[0].childNodes[1].childNodes[1].innerHTML;
        sessionStorage.selection = cardTitle;
        console.log(cardTitle);
        window.location.replace("https://daimler-frontend.netlify.com/critical-list-detail.html");

    });






});