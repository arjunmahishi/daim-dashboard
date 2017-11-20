var url = "https://daimler-backend.herokuapp.com/";
var token = "";
var url2="https://daimler-backend.herokuapp.com/rest-auth/password/reset/"

var form = document.getElementById('edit-form');
var json;
$(function () {

    $('#login-form').submit(function (e) {
        $('#login-card').attr("display","none");
        e.preventDefault();
        var formBody = $('#login-form').serialize();
        fetch(url + "api-token-auth/", {
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formBody
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (json) {
                    token = json.token;
                    console.log(token);
                    fetch(url + "api/current_user/", {
                        method: "get",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': 'Token ' + token
                        }
                    }).then(function (response) {
                        if (response.ok) {
                            response.json().then(function (json) {
                                sessionStorage.tokenid = token;
                                sessionStorage.email=json.email;
                                sessionStorage.name=json.username;
                                console.log(sessionStorage.tokenid);

                                window.location.replace("/select.html");
                            });
                        }
                    });
                });
            } else {
                console.log('Network request failed with response ' + response.status + ': ' + response.statusText);
            }
        });
    });

    $("#done").click(function(event){
        
        var formData= new FormData();
        var email= $("#field").val();
        formData.append("email",email);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url2, true);
        
        xhr.onload=function(){
           if(xhr.status=200)
           alert("password reset. Check your mail");
        }
        xhr.send(formData);

    })
});


   
