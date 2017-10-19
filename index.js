var url = "https://daimler-backend.herokuapp.com/";
var token = "";

$(function(){

    $('#login-form').submit(function(e){
        e.preventDefault();
        var formBody = $('#login-form').serialize();
        fetch(url + "api-token-auth/" ,{
        method: 'post',
        headers: {
            "Content-Type" : "application/x-www-form-urlencoded"
        },
        body: formBody
    }).then(function(response){
    if(response.ok){
        response.json().then(function(json){
            token = json.token;
            console.log(token);
            fetch(url + "current_user/", {
                method: "get",
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'Authorization' : 'Token '+token
                }
            }).then(function(response){
                if(response.ok){
                    response.json().then(function(json){
                        console.log(json);
                    });
                }
            });
        });
        }
    else {
            console.log('Network request failed with response ' + response.status + ': ' + response.statusText);
            }
});
        });
});