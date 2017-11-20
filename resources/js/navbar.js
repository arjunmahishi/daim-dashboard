var urlnav="https://daimler-backend.herokuapp.com/rest-auth/logout/"
$("#uname").text(sessionStorage.name);
$("#uemail").text(sessionStorage.email);
$("#sos").click(function(event){
     window.location.replace("/sos-dashboard.html");
});
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
$('#axel').click(function () {

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

$('#logout').click(function(){
  var xhr = new XMLHttpRequest();
  xhr.open('POST', urlnav, true);
  
  xhr.onload = function () {
            if(xhr.status=200)
                window.location.replace("/");
            else
                alert("Unable to log out");
           }
  xhr.send();
});