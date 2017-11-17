var url = "https://daimler-backend.herokuapp.com/parts/?ordering=short_on,-status&shop=";
var token = "3d35519e0f437d19e8f625c143bb63a7989753a8";
console.log(token);
var json;
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();

//global variable that holds a reference to the node that displays parts
var tableRow;

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

  // var star = document.getElementById('star');
  // star.onclick = function(e){
  // var image = e.target;
  // this.src = "images/filled_star.png";
  // };

  var images = document.getElementsByTagName('img');
  for( var i=0; i<images.length; i++){
    images[i].onclick = starring;
  }

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
fetch(url + selection+"&short_on="+date, {
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
                          addItems(json);
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

var card_ref = document.getElementById('card-cont');
var no_data = document.getElementById('data-h');

if(json.length>0)
{
  no_data.setAttribute('style','display: none;');
   card_ref.removeAttribute('style','display: none;');
  for(var i=0; i<json.length; i++){


  var j=0;
  for(var prop in json[i]){

    if(prop === "url")continue;

    var parts = json[i];

    //traverse the DOM and get the td cell
    var cells = partDetails[i].children;

    //change color of item according to status level
    if(prop === "status"){
      if(parts[prop] === 3){
        cells[j].innerText = "Critical";
        partDetails[i].setAttribute('class', 'red lighten-2');
      }
      else if(parts[prop] === 2){
        cells[j].innerText = "Warning";
        partDetails[i].setAttribute('class', 'yellow lighten-2');
      }else {
        cells[j].innerText = "Normal";
        partDetails[i].setAttribute('class', 'green lighten-2');
      }

    }

      else if(prop === "starred")
      {
        if(parts[prop]===true)
        {
          cells[j].innerHTML = "<img src='images/filled_star.png'>";
        }
        else
        {
          cells[j].innerHTML = "<img src='images/star2.png'>";
        }
      }
      else
      {
        cells[j].innerText = parts[prop];
      }

      j++;





 }
  }

}
else
  {
     card_ref.setAttribute('style','display: none;');
     no_data.removeAttribute('style','display: none;');
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
        for( var j=0; j<list.length; j++)
      {
          var newRow = tableRow.cloneNode(true);
          tableBody.appendChild(newRow);
      }
    }else{

          var newRow = tableRow.cloneNode(true);
          tableBody.appendChild(newRow);

    }



}

function starring(){
  alert('clicked');
  console.log('clicked');
}


// $('#star').click(function(){
//   this.setAttribute("src","images/filled_star.png");
// });




