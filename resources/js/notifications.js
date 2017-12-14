var url = "https://daimler-backend.herokuapp.com/api/comments/?type=true&userid="+sessionStorage.userid;
var token= sessionStorage.tokenid;
$(function(){
	fetch(url, {
		method:"get",
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
                {addItems(json);
                 $("#item").remove();
                }
                else {
                    var div = document.getElementById('item');
                    if (div)
                        div.parentNode.removeChild(div);
                    $("#data-h").show();

                }
            });
        } else {
            console.log("Error")
        }
    })
  function addItems(json)
  {
     for(i=json.length-1;i!=0;i--)
     {
     	$("#content").text(json[i].content);
     	$("#posted-by").text('Posted By: '+json[i].posted_by);
     	$("#posted-on").text(jQuery.timeago(json[i].date));
     	$("#item").show();
     	$("#item").clone(true,true).insertAfter("#item");
     }
      $("#content").text(json[i].content);
     	$("#posted-by").text('Posted By: '+json[i].posted_by);
     	$("#posted-on").text(jQuery.timeago(json[i].date));
     	$("#item").show();
     	$("#item").clone(true,true).insertAfter("#item");

  }
})