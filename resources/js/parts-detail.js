var url = "https://daimler-backend.herokuapp.com/api/parts/";

var data = [];
var json;
var token = sessionStorage.tokenid || "d453ba42af06ebabf88f0d966c5abfd8ed5d71c2";
var urlParams = new URLSearchParams(window.location.search);

console.log(urlParams.has('partid')); // true
console.log(urlParams.get('partid')); // true
var partid=urlParams.get('partid');


//main function
$(function () {
    getData();
});

function getData() {

    fetch(url+partid+"/", {
        method: "get",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Token ' + token
        }
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                json = data;
                $('#part_number_re').text(data.part_number);
                console.log(json);
                if (data.status == 3) {
                    $("#status").addClass("red");
                    $("#status").text("Critical");
                } else if (data.status == 2) {
                    $("#status").addClass("orange");
                    $("#status").text("Warning");
                } else {
                    $("#status").addClass("green");
                    $("#status").text("Normal");
                }
                    if(data.starred){
        $('#star_status').text('star')
    }
    else{
        $('#star_status').text('star_border')
    }
                var tablehtml=``;
                Object.entries(json).forEach(([key, value]) => {
                    if(!(key==='url'||key==='starred'||key==='part_number'||key==='comments'||key==='shop'||key==='status'))
                        tablehtml += `<tr><th>${key}:</th><td>${value}</td></tr>`.replace('_',' ');
                });

                $('#details').html(tablehtml);
                $('.send').click(function(event){
                    
                    var usersData=getUserList();

                    $('#number_notify').text(json.part_number);
                    event.target.setAttribute('class', 'modal-trigger material-icons prefix');
                    event.target.setAttribute('href', '#modal_notify');

                });
                $('.edit').click(function(event){

                    event.target.setAttribute('class', 'modal-trigger material-icons prefix');
                    event.target.setAttribute('href', '#modal1');



                    populateAndEditModal(json);

                });
                $('.star').click(function(event){
                    
                    if($(this).text()=='star'){
                        unStar();
                    }
                    else{
                        star();
                    }



                });



            });



        }
        else {
            console.log('Network request failed with response ' + response.status + ': ' + response.statusText);
        }
    });
}

function populateAndEditModal(jsonn){

    // populate the input fields with values from the api response.
    $('#part_name').text(jsonn['part_number']);
    $('#description').val(jsonn['description']);
    $('#supplier_name').val(jsonn['supplier_name']);
    $('#variants').val(jsonn['variants']);
    $('#count').val(jsonn['count']);
    $('#reported_on').val(jsonn['reported_on']);
    $('#short_on').val(jsonn['short_on']);
    $('#shop').val(jsonn['shop']);
    $('#pmc').val(jsonn['pmc']);
    $('#team').val(jsonn['team']);
    $('#backlog').val(jsonn['backlog']);
    $('#region').val(jsonn['region']);
    $('#unloading_point').val(jsonn['unloading_point']);
    $('#p_q').val(jsonn['p_q']);
    $('#quantity').val(jsonn['quantity']);
    $('#quantity_expected').val(jsonn['quantity_expected']);
    $('#planned_vehicle_qty').val(jsonn['planned_vehicle_qty']);
    $('#eta_dicv').val(jsonn['eta_dicv']);
    $('#truck_details').val(jsonn['truck_details']);
    $('#shortage_reason').val(jsonn['shortage_reason']);
    $('#status').val(jsonn['status']);

    if(jsonn['status'] === 3)
        $('#critical-radio-btn').attr('checked','checked');
    else if(jsonn['status'] === 2)
        $('#warning-radio-btn').attr('checked','checked');
    else
        $('#normal-radio-btn').attr('checked','checked');

}
$('#done-btn').click(function(){
    var obj={};
    obj['starred'] = $('#starred').val();
    obj['description'] = $('#description').val();
    obj['supplier_name'] = $('#supplier_name').val();
    obj['variants'] = $('#variants').val();
    obj['count'] = $('#count').val();
    obj['reported_on'] = $('#reported_on').val();
    obj['short_on'] = $('#short_on').val();
    obj['pmc'] = $('#pmc').val();
    obj['team'] = $('#team').val();
    obj['backlog'] = $('#backlog').val();
    obj['region'] = $('#region').val();
    obj['unloading_point'] = $('#unloading_point').val();
    obj['p_q'] = $('#p_q').val();
    obj['quantity'] = $('#quantity').val();
    obj['quantity_expected'] = $('#quantity_expected').val();
    obj['planned_vehicle_qty'] = $('#planned_vehicle_qty').val();
    obj['eta_dicv'] = $('#eta_dicv').val();
    obj['truck_details'] = $('#truck_details').val();
    obj['shortage_reason'] = $('#shortage_reason').val();
    obj['shop'] = $('#shop').val();

    // var warning = $('warning-radio-btn').isChecked();
    // var critical = $('critical-radio-btn').isChecked();
    // var normal = $('normal-radio-btn').isChecked();

    // if(warning === true)
    //     obj['status'] = 2;
    // if(critical === true)
    //     obj['status'] = 3;
    // if(normal === true)
    //     obj['status'] = 1;
    var status = $('input[name=status]:checked').next().text();
    if(status === "Warning")
        obj['status'] = 2;
    else if(status === 'Critical')
        obj['status'] = 3;
    else if(status === 'Normal')
        obj['status'] = 1;



    updateField( obj);
});
function updateField(obj){

    console.log(JSON.stringify(obj));



    console.log(partid);

    var url = "https://daimler-backend.herokuapp.com/api/parts/" + partid + "/";

    var xhr = new XMLHttpRequest();

    // Open the connection.
    xhr.open('PATCH', url, true);

    xhr.setRequestHeader('Authorization','Token '+token);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Set up a handler for when the request finishes.
    xhr.onload = function () {
        console.log(xhr.status);
        if (xhr.status === 200) {
            //alert('successful');
            location.reload(true);

        }
        else {
            alert('An error occurred!');
        }
    };

    // Send the Data.
    xhr.send(JSON.stringify(obj));
}
function star(){
    var url = "https://daimler-backend.herokuapp.com/api/current_user/starred_parts/";

    var formData = new FormData();

    formData.append('part_number', json.part_number);

    var xhr = new XMLHttpRequest();

    // Open the connection.
    xhr.open('PATCH', url, true);

    xhr.setRequestHeader('Authorization','Token '+token);

    // Set up a handler for when the request finishes.
    xhr.onload = function () {
        console.log(xhr.status);
        if (xhr.status === 200) {
            //alert('successful');
            $('.star').text('star');

        }
        else {
            alert('An error occurred!');
        }
    };

    // Send the Data.
    xhr.send(formData);
}
function unStar(){

    var url = "https://daimler-backend.herokuapp.com/api/current_user/starred_parts/";

    var formData = new FormData();

    formData.append('part_number', json.part_number);

    var xhr = new XMLHttpRequest();

    // Open the connection.
    xhr.open('DELETE', url, true);

    xhr.setRequestHeader('Authorization','Token '+token);

    // Set up a handler for when the request finishes.
    xhr.onload = function () {
        console.log(xhr.status);
        if (xhr.status === 200) {
            //alert('successful');
            $('.star').text('star_border');
        }
        else {
            alert('An error occurred!');
        }
    };

    // Send the Data.
    xhr.send(formData);

}
function getUserList()
{
    var userurl='https://daimler-backend.herokuapp.com/api/users/'
    fetch(userurl, {
        method: "get",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Token ' + token
        }
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                autocomplete={};
                var autocompleteData={};
                data.forEach(function(obj){
                    autocomplete[obj.username]=obj.url;
                    autocompleteData[obj.username]=null;
                });
                console.log(autocompleteData);
                $('.chips-autocomplete').material_chip({
                    autocompleteOptions: {
                        data: autocompleteData,
                        limit: Infinity,
                        minLength: 1}

                });
                return autocomplete;

            });
        } else {
            console.log('Network request failed with response ' + response.status + ': ' + response.statusText);
        }
    });

}

$('#notify-btn').click(function(){


    var chipsData=$('.chips').material_chip('data');
    chipsData.forEach(function(person){
        var formData = new FormData();
        var body={
            content:$('#notify-content').val(),
            partid:json.url,
            userid:autocomplete[person.tag],
        }
        formData.append('content',body.content);
        formData.append('partid',body.partid);
        formData.append('userid',body.userid);
        formData.append('type',true);
        console.log(body);
        var urlpost='https://daimler-backend.herokuapp.com/api/comments/'

        var xhr = new XMLHttpRequest();
        xhr.open('POST', urlpost, true);
        //xhr.setRequestHeader('Content-Type','multipart/form-data');
        xhr.setRequestHeader('Authorization', 'Token ' + token);
        xhr.onload = function () {
            console.log(xhr.status);
            if (xhr.status === 201) {
                window.location.replace("#!");
            } else {
                alert('An error occurred!');
            }
        };
        xhr.send(formData);
    });


})
//Ported from sos-messages
var commentJson;
var commentsurl='https://daimler-backend.herokuapp.com/api/comments/'
$(function () {

    fetch(commentsurl+"?type=false&partid="+partid, {
        method: "get",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Token ' + token
        }
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                commentJson = data;
                console.log(commentJson);
                if (commentJson.length != 0)
                    addItems(commentJson);
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

    function addItems(commentJson) {
        
        for (var i = 0; i <commentJson.length-1; i++) {

            $("#message").text(commentJson[i].content);
            $("#user").text(commentJson[i].posted_by);
            $("#time").text(jQuery.timeago(commentJson[i].date));
            $("#messageContainer").show();
             if(commentJson[i].media!= undefined)
           {
           	openlink(commentJson[i].media);
           }
            
            $("#messageContainer").clone().insertAfter("#messageContainer");

        }
         $("#messageContainer").show();
        $("#message").text(commentJson[i].content);
        $("#user").text(commentJson[i].posted_by);
         if(commentJson[i].media!= undefined)
           {
           	openlink(commentJson[i].media);
           }
           if(sessionStorage.status=="false")
           {
                
                
    
           }

    }
    $("#blah").click(function(event){
  	if(sessionStorage.file!=undefined)
  	window.open(sessionStorage.file);
  });
    $("#delete").click(function(event){
        event.preventDefault();

        var xhr= new XMLHttpRequest();
        
        xhr.open('DELETE',urlsos, true);
        xhr.setRequestHeader('Authorization', 'Token ' + token);
        xhr.onload= function () {
           if(xhr.status==204)
           {
            alert("Thread deleted succesfully")
            window.location.replace("/sos-dashboard.html");
           }
           else
           {
            alert("Error occured!");
           }
        }
        xhr.send();
        
    })
    $("#send").click(function (event) {
        event.preventDefault();
        var text = $("#icon_prefix").val();

        var form = document.getElementById('message-form');
        var formData = new FormData();
        var fileSelect = document.getElementById('file-select');
        var file = fileSelect.files;
        formData.append("content", text);
        formData.append("partid", json.url);



        var xhr = new XMLHttpRequest();
        xhr.open('POST', commentsurl, true);
        //xhr.setRequestHeader('Content-Type','multipart/form-data');
        xhr.setRequestHeader('Authorization', 'Token ' + token);

        for (var i of formData.values()) {
            console.log(i);
        }
        xhr.onload = function () {
            console.log(xhr.status);
            if (xhr.status === 201) {
                window.location.reload(true);
            } else {
                alert('An error occurred!');
            }
        };
        xhr.send(formData);
    })
 function openlink(link)
  {
  	    var a = document.createElement('a');
        var linkText = document.createTextNode("\tClick to view the file");
        a.appendChild(linkText);
        a.title = "\nClick to view the file";
        a.href = link;
        a.target="_blank";
        document.getElementById("message").append(a);
  }
 

})
