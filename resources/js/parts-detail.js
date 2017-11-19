var url = "https://daimler-backend.herokuapp.com/api/parts/";
var token = "3d35519e0f437d19e8f625c143bb63a7989753a8";
console.log(token);
var json;
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();

var partNumber = sessionStorage.partNumber;

//global variable that holds a reference to the node that displays parts
var tableRow;

// global variable that is used in patch request for starring.
var partNumber;

if(dd<10) {
    dd = '0'+dd
}

if(mm<10) {
    mm = '0'+mm
}



var selection = sessionStorage.selection || "MDT ENGINE";
console.log(selection);
var shopType = selection; // For card Title
var date = today;
selection = selection.replace(/ /g,'%20');

date = yyyy + '-' + mm + '-' + dd;
// if(token==undefined) window.location="http://localhost:3000";
$(function(){

   //get response from api
  getData();

  $('#shop_type').html(shopType);


//For storing a reference to the node that displays parts
      var tableContainer = document.getElementById('table');
      var childNodes = tableContainer.children;
      console.log(childNodes);

       tableRow = childNodes[1].childNodes[1];



  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: true // Close upon selecting a date,
  });

  // var picker = $input.pickadate('picker');
  // date = picker.get('select', 'yyyy/mm/dd');
  // console.log(date);

  // $('.card.hoverable').on('click', function(e){
  //   return false;
  // });

  // $('td.clickable').click(function(e){
  //   e.stopPropagation();
  //   alert(e.target.value);
  // });

//to select a date
$('#sort-selection').click(function(){

  var sortsCard = document.getElementById('sort-choices');

  if($('#sort-choices').css('display') == 'none') {
    sortsCard.style.removeProperty('display');
      console.log(sortsCard.children);

  }
  else{
    $('#sort-choices').css('display','none');

  }

  $('#apply-btn').click(function(){
      sortsCard.setAttribute('style','display: none;');

      var sortSelected = $('input[name=dates]:checked').next().text();
      console.log(sortSelected);

      var year = $('.datepicker').pickadate('picker').get('highlight', 'yyyy');
      var month = $('.datepicker').pickadate('picker').get('highlight', 'mm');
      var day = $('.datepicker').pickadate('picker').get('highlight', 'dd');
      date = year + '-' + month + '-' + day;



      getData();

      updateDisplay(json, date);

  });

});


$('#next').click(function(){
  var d= $('#date').text();
  dd= parseInt(d.substr(8,9));
  dd++;
  if(dd==31) dd=1;
  date = yyyy + '-' + mm + '-' + dd;

  getData();
});
$('#prev').click(function(){
  var d= $('#date').text();
  dd= parseInt(d.substr(8,9));

  dd--;
  if(dd==0) dd=31;
  date = yyyy + '-' + mm + '-' + dd;
  getData();
});


});

function getData(){
fetch(url + partNumber, {
   method: "get",
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'Authorization' : 'Token '+token
                }
            }).then(function(response){
              if(response.ok){
                response.json().then(function(data){
                    json = data;
                    console.log(json);

                        //method to add individual parts under a part type
                          //addItems(json);
                          updateDisplay(json, date);
                 });
              }
              else {
                 console.log('Network request failed with response ' + response.status + ': ' + response.statusText);
              }
            });
        }

function updateDisplay(json, date){
$('#date').text(date);



var container = document.getElementById('table');
var children = container.children;





// var partType = children[0].childNodes[1].childNodes[1].childNodes[1]; //card title
// partType.innerHTML = selection.replace(/%20/g," ");
var partContainer = children[1] //tbody
var partDetails = partContainer.children;

console.log(partDetails);

var j=0;
  for(var prop in json){

    if(prop === "url")continue;

    var parts = json;


    //traverse the DOM and get the td cell
    var cells = partDetails[0].children;

    //add click handler to every cell
    cells[j].onclick = editCell;


    //change color of item according to status level
    if(prop === "status"){
      if(parts[prop] === 3){
        cells[j].innerText = "Critical";
        partDetails[0].setAttribute('class', 'red lighten-2');
      }
      else if(parts[prop] === 2){
        cells[j].innerText = "Warning";
        partDetails[0].setAttribute('class', 'yellow lighten-2');
      }else {
        cells[j].innerText = "Normal";
        partDetails[0].setAttribute('class', 'green lighten-2');
      }

    }

      else if(prop === "starred")
      {
        if(parts[prop]===true)
        {
          cells[j].innerHTML = "<img src='resources/images/filled_star.png' id='image' onClick='demo'>";
        }
        else
        {
          cells[j].innerHTML = "<img src='resources/images/star2.png' id='image' onClick='demo'>";
        }
      }
      else
      {
        cells[j].innerText = parts[prop];
      }





      j++;
 }

}

function addItems(list){
      var tableContainer = document.getElementById('table');
      var childNodes = tableContainer.children;
      console.log(childNodes);

      var tableBody = childNodes[1];

        while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
      }
      console.log(list.length);
      if(list.length>0){
        for( var i=0; i<list.length; i++)
      {
          var newRow = tableRow.cloneNode(true);
          var cells = newRow.children;
          for(var j=0; j<cells.length; j++){
            cells[j].onclick = editCell;


            // cells[j].getElementsByTagName('img').onclick = demo;
      }

          tableBody.appendChild(newRow);
      }
    }else{

          var newRow = tableRow.cloneNode(true);
          tableBody.appendChild(newRow);

    }



}

function editCell(event){
  if(event.target.getElementsByTagName('img').length > 0){

        var rowIndex = event.target.parentNode.rowIndex;
        rowIndex -= 1;
    var images = event.target.getElementsByTagName('img');
    var imageSource = images[0].src;
    var fileName = imageSource.substr(imageSource.lastIndexOf('/') + 1);
    if(fileName === "star2.png"){
      star(rowIndex);
      images[0].src = "resources/images/filled_star.png";

    }
    else{
      unStar(rowIndex);
      images[0].src = "resources/images/star2.png";
    }

    //alert(imageSource.substr(imageSource.lastIndexOf('/') + 1));
  }else{
    event.target.setAttribute('class', 'modal-trigger');
    event.target.setAttribute('href', '#modal1');

    $('#field').val(event.target.innerText);
    var columnNumber = event.target.cellIndex;
    //alert(columnNumber);
    var headings = document.getElementsByTagName('th');
    console.log(headings);
    $('#property_type').text(headings[columnNumber + 7].innerText);

  }
}


function star(rowIndex){
  var url = "https://daimler-backend.herokuapp.com/current_user/starred_parts/";

  var formData = new FormData();

  partNumber = json['part_number'];

  formData.append('part_number', partNumber);

  var xhr = new XMLHttpRequest();

// Open the connection.
xhr.open('PATCH', url, true);

xhr.setRequestHeader('Authorization','Token '+token);

// Set up a handler for when the request finishes.
xhr.onload = function () {
  console.log(xhr.status);
  if (xhr.status === 200) {
    alert('successful');
  }
  else {
    alert('An error occurred!');
  }
};

// Send the Data.
xhr.send(formData);
}

function unStar(rowIndex){

  var url = "https://daimler-backend.herokuapp.com/current_user/starred_parts/";

  var formData = new FormData();

  partNumber = json['part_number'];

  formData.append('part_number', partNumber);

  var xhr = new XMLHttpRequest();

// Open the connection.
xhr.open('DELETE', url, true);

xhr.setRequestHeader('Authorization','Token '+token);

// Set up a handler for when the request finishes.
xhr.onload = function () {
  console.log(xhr.status);
  if (xhr.status === 200) {
    alert('successful');
  }
  else {
    alert('An error occurred!');
  }
};

// Send the Data.
xhr.send(formData);


}



