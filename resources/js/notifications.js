var url = "https://daimler-backend.herokuapp.com/api/comments/?type=true&userid="+sessionStorage.userid;
var token= sessionStorage.tokenid;
var it;
var json;
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
                $('#item').click(function(event)
                    {
                        
                        position=$("#item").index(this);
                        console.log(position);
                        it = (json[json.length-position-1].partid).split("/");
                        console.log(json[json.length-position-1].partid);
                        console.log(it);
                        console.log(it[it.length-2]);
                        window.location.replace("/part-detail.html?partid="+it[it.length-2]);
                        console.log(json.length-position-1].part_number);
//                        window.location.replace("/part-detail.html?partid="+json[json.length-position-1].part_number);

                    });
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
        it = (json[i].partid).split("/");
         console.log(it);
     	$("#posted-title").text('Part No: ' + it[it.length-2]);
     	$("#item").show();
     	$("#item").clone(true,true).insertAfter("#item");
     }
      $("#content").text(json[i].content);
     	$("#posted-by").text('Posted By: '+json[i].posted_by);
     	$("#posted-on").text(jQuery.timeago(json[i].date));
            itt = (json[0].partid).split("/");
      console.log(itt);
     	$("#posted-title").text('Part N: ' + itt[itt.length-2]);

        $("#item").show();
     	$("#item").clone(true,true).insertAfter("#item");
      

  }
})