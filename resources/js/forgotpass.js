var url="https://daimler-backend.herokuapp.com/rest-auth/password/reset/"

var form = document.getElementById('edit-form');
var json;
$(function(){
	var formData= new FormData();
	$("#done").click(function(event){
		
		var email= $("#field").val();
		formData.append("email",email);
		var xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        
        xhr.onload=function(){
        	console.log(xhr.response);
        }
        xhr.send(formData);

	})
})