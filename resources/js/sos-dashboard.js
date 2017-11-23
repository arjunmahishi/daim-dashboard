var token = sessionStorage.tokenid;
var url = "https://daimler-backend.herokuapp.com/api/sos/";
var url2 = "https://daimler-backend.herokuapp.com/api/comments/";
var json1, json;
$(function () {
    fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Token ' + token
        }

    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                json = data;
                addItems(json);
            });
        } else {
            console.log('Network request failed with response ' + response.status + ': ' + response.statusText);
        }
    });

    function addItems(json) {

        for (var i = json.length - 1; i != 0; i--) {
        	if(json[i].status==true||sessionStorage.username==json[i].posted_by)
        	{
                console.log(json[i].status);
            $("#para").text("" + json[i].content);
            $("#hidden").text(json[i].id);

            $("#comments").text(json[i].comments_count + " comments");
            if(sessionStorage.username==json[i].posted_by)
                 $("#posted_by").text("you posted this "  + jQuery.timeago(json[i].date));
             else
                $("#posted_by").text("By " + json[i].posted_by + ", " + jQuery.timeago(json[i].date));
            if(json[i-1].status==true||sessionStorage.username==json[i-1].posted_by)
                 $("#container").clone(true, true).insertAfter("#container");
        }

        }
        if(json[i].status==true||sessionStorage.username==json[i].posted_by)
        	{
        $("#para").text("" + json[i].content);
        $("#hidden").text(json[i].id);
        $("#comments").text(json[i].comments_count + " comments");
         if(sessionStorage.username==json[i].posted_by)
                 $("#posted_by").text("you posted this "  + jQuery.timeago(json[i].date));
             else
                $("#posted_by").text("By " + json[i].posted_by + ", " + jQuery.timeago(json[i].date));
    }
    }

    $("#container").click(function (e) {
        var position = jQuery("p:first", this).text();
        sessionStorage.sosid = position;
        sessionStorage.desc = json[json.length - position].content;
        sessionStorage.status=json[json.length - position].status;
        sessionStorage.name=   json[json.length - position].name;
        sessionStorage.level=json[json.length - position].level; 
        window.location.replace("/sos-messages.html");


    })

});
