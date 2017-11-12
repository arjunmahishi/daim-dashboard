var url = "https://daimler-backend.herokuapp.com/sos/";
var token = "3d35519e0f437d19e8f625c143bb63a7989753a8";

$(function(){
var form = document.getElementById('file-form');
var fileSelect = document.getElementById('file-select');
var uploadButton = document.getElementById('upload-button');

form.onsubmit = function(event) {
  event.preventDefault();

  // Update button text.
  uploadButton.innerHTML = 'Uploading...';

// Get the selected files from the input.
var files = fileSelect.files;

// Create a new FormData object.
var formData = new FormData();

var file;
// Loop through each of the selected files.
for (var i = 0; i < files.length; i++) {
   file = files[i];

  // Check the file type.
  if (!file.type.match('image.*')) {
    continue;
  }

  // Add the file to the request.
  formData.append('media', file);
    }

    formData.append('name','sample2');
    formData.append('content','photo');
    formData.append('status','true');
    formData.append('level',2);
    formData.append('users','https://daimler-backend.herokuapp.com/users/1/');
for(var i of  formData.values())
{
console.log(i);
 }   // Set up the request.
var xhr = new XMLHttpRequest();

// Open the connection.
xhr.open('POST', url, true);

//xhr.setRequestHeader('Content-Type','multipart/form-data');
xhr.setRequestHeader('Authorization','Token '+token);


// Set up a handler for when the request finishes.
xhr.onload = function () {
  console.log(xhr.status);
  if (xhr.status === 201) {
    // File(s) uploaded.
    uploadButton.innerHTML = 'Upload';
    window.location.replace("https://daimler-frontend.netlify.com/sos-dashboard.html");
  } else {
    alert('An error occurred!');
  }
};

// Send the Data.
xhr.send(formData);
}


});