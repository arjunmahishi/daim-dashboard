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
            $("#para").text("" + json[i].content);
            $("#hidden").text(json[i].id);

            $("#comments").text(json[i].comments_count + " comments");
            $("#posted_by").text("By " + json[i].posted_by + ", " + jQuery.timeago(json[i].date));
            $("#container").clone(true, true).insertAfter("#container");

        }

        $("#hidden").text(json[i].id);
        $("#comments").text(json[i].comments_count + " comments");
        $("#posted_by").text("By " + json[i].posted_by);
    }

    $("#container").click(function (e) {
        var position = jQuery("p:first", this).text();
        sessionStorage.sosid = position;
        sessionStorage.desc = json[json.length - position].content;
        window.location.replace("/sos-messages.html");


    })

});
