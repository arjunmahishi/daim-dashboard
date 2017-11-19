var token = sessionStorage.tokenid;
var json;
var url = "https://daimler-backend.herokuapp.com/api/comments/?posted_by=&sosid=" + sessionStorage.sosid + "&date=&partid=";
var urlpost = "https://daimler-backend.herokuapp.com/api/comments/";
$(function () {
    $("#description").text(sessionStorage.desc);
    fetch(url, {
        method: "get",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Token ' + token
        }
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                json = data;
                console.log(json);
                if (json.length != 0)
                    addItems(json);
                else {
                    var div = document.getElementById('messageContainer');
                    if (div)
                        div.parentNode.removeChild(div);


                }
            });
        } else {
            console.log("Error")
        }
    })

    function addItems(json) {
        for (var i = json.length - 1; i != 0; i--) {
            $("#message").text(json[i].content);
            $("#user").text(json[i].posted_by);
            $("#time").text(jQuery.timeago(json[i].date));
            if (json[i].media != undefined) {
                openlink(json[i].media);
            }
            $("#messageContainer").clone().insertAfter("#messageContainer");

        }
        $("#time").text(jQuery.timeago(json[i].date));
        $("#message").text(json[i].content);
        $("#user").text(json[i].posted_by);
        if (json[i].media != undefined) {
            openlink(json[i].media);
        }

    }
    $("#blah").click(function (event) {
        if (sessionStorage.file != undefined)
            window.open(sessionStorage.file);
    })
    $("#send").click(function (event) {
        event.preventDefault();
        var text = $("#icon_prefix").val();

        var form = document.getElementById('message-form');
        var formData = new FormData();
        var fileSelect = document.getElementById('file-select');
        var file = fileSelect.files;
        formData.append("content", text);
        formData.append("sosid", "https://daimler-backend.herokuapp.com/api/sos/" + sessionStorage.sosid + "/");


        var xhr = new XMLHttpRequest();
        xhr.open('POST', urlpost, true);
        //xhr.setRequestHeader('Content-Type','multipart/form-data');
        xhr.setRequestHeader('Authorization', 'Token ' + token);

        for (var i of formData.values()) {
            console.log(i);
        }
        xhr.onload = function () {
            console.log(xhr.status);
            if (xhr.status === 201) {
                window.location.replace("/sos-messages.html");
            } else {
                alert('An error occurred!');
            }
        };
        xhr.send(formData);
    })

    function openlink(link) {
        var a = document.createElement('a');
        var linkText = document.createTextNode("\tClick to view the file");
        a.appendChild(linkText);
        a.title = "\nClick to view the file";
        a.href = link;
        a.target = "_blank";
        document.getElementById("message").append(a);
    }


})
