var url = "https://daimler-backend.herokuapp.com/parts/?ordering=short_on,-status&shop=";
var token = "3d35519e0f437d19e8f625c143bb63a7989753a8";
console.log(token);
var json;
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();

//global variable that holds a reference to the node that displays parts
var item;

if(dd<10) {
    dd = '0'+dd
}

if(mm<10) {
    mm = '0'+mm
}



var selection = "MDT ENGINE";
var date = today;
selection = selection.replace(/ /g,'%20');

date = yyyy + '-' + mm + '-' + dd;
//if(token==undefined) window.location="http://localhost:3000";
$(function(){
//For storing a reference to the node that displays parts
      var container = document.querySelector('div.container');
      var children = container.children;
      var itemContainer = children[0].childNodes[1].childNodes[1].childNodes[3].childNodes[1];
      var child = itemContainer.childNodes;
      item = child[1];

  //get response from api
  getData();

  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year,
    today: 'Today',
    clear: 'Clear',
    close: 'Ok',
    closeOnSelect: false // Close upon selecting a date,
  });

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
  sortsCard.style.removeProperty('display');
  console.log(sortsCard.children);

  $('#apply-btn').click(function(){
      datesCard.setAttribute('style','display: none;');

      var sortSelected = $('input[name=dates]:checked').next().text();
      console.log(sortSelected);

      getData();

      //updateDisplay(json, dateSelected);

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
                    //updateDates();

                    // var dates = Object.keys(json);
                    //     for(i in dates){


                    //     partList[i] = json[dates[i]];
                    //     console.log(partList.length);
                    //      }

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

var container = document.querySelector('div.container');
var children = container.children;

var parts = json;



var partType = children[0].childNodes[1].childNodes[1].childNodes[1]; //card title
partType.innerHTML = selection.replace(/%20/g," ");
var partContainer = children[0].childNodes[1].childNodes[1].childNodes[3].childNodes[1]; //#ul class-collapsible popout
var partDetails = partContainer.children;

console.log(partDetails);

for(var j=0; j<partDetails.length; j++){


   if(parts.length>0){

    //traverse the DOM and get the li element
    var supplierNameListItem = partDetails[j].childNodes[1].childNodes[1].childNodes[1];
    supplierNameListItem.innerHTML = '<img id="star" src="images/star.png">'+'</img>' + "Supplier Name:" + " " + parts[j].supplier_name;
    var partNoListItem = partDetails[j].childNodes[1].childNodes[1].childNodes[3];
    partNoListItem.innerHTML = '<i class="material-icons">edit</i>' + "Part No:" + " " + parts[j].part_number;

     //traverse the DOM and get the span element on popout
    var detailSpan = partDetails[j].childNodes[3].childNodes[0];
    detailSpan.innerHTML = "backlog: " + parts[j].backlog + "<br/>" + "count: " + parts[j].count
                           + "<br/>" + "description: "  + parts[j].description + "<br/>" +
                           "ETA: " + parts[j].eta_dicv + "<br/>" +
                           "planned vehicle quantity: " + parts[j].planned_vehicle_qty + "<br/>" +
                           "pmc: " + parts[j].pmc + "<br/>" +
                           "quantity: " + parts[j].quantity + "<br/>" +
                           "quantity expected: " + parts[j].quantity_expected + "<br/>" +
                           "reported on: " + parts[j].reported_on + "<br/>" +
                           "short on: " + parts[j].short_on + "<br/>" +
                           "shortage reason: " + parts[j].shortage_reason + "<br/>" +
                           // "status:" + parts[j].status + "<br/>" +
                           "truck details: " + parts[j].truck_details + "<br/>" +
                           "unloading point: " + parts[j].unloading_point + "<br/>";

   }

}




//Now new list items have been added from addCards method.
// var partContainer = document.querySelector('.collapsible.popout');
// var partDetails = partContainer.children;

// console.log(partDetails);
}
function addItems(list){


      var container = document.querySelector('div.container');
      var children = container.children;
      var itemContainer = children[0].childNodes[1].childNodes[1].childNodes[3].childNodes[1];

      while (itemContainer.firstChild) {
        itemContainer.removeChild(itemContainer.firstChild);
      }
      console.log(list.length);
      for( var j=0; j<list.length; j++)
      {
          var newItem = item.cloneNode(true);
          itemContainer.appendChild(newItem);
      }
}

function starring(){
  alert('clicked');
  console.log('clicked');
}


// $('#star').click(function(){
//   this.setAttribute("src","images/filled_star.png");
// });




