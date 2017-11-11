var url = "https://daimler-backend.herokuapp.com/critical_list/";
var token = sessionStorage.tokenid || "3d35519e0f437d19e8f625c143bb63a7989753a8";
console.log(token);
var json;

var selection = sessionStorage.selection;
selection = selection.replace(/ /g,'%20');
//if(token==undefined) window.location="http://localhost:3000";
var partList = [];
$(function(){
fetch(url + selection, {
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
                    updateDates(json);
                    //addCards(json);


                    // for(var k in json){
                    //     var value = json[k];
                    //     console.log(value);
                        var dates = Object.keys(json);
                        partList = json[dates[0]]['parts'];
                        console.log(partList);

                        //method to add individual parts under a part type
                        for(var i=0; i<partList.length - 1; i++){
                          addItems(partList);
                        }



                    // }

                    updateDisplay(json, dates[0]);
            	   });
            	}
            	else {
            		 console.log('Network request failed with response ' + response.status + ': ' + response.statusText);
            	}
            });

function updateDisplay(json, dateSelected){

var dates = Object.keys(json);
if(dates.indexOf(dateSelected) === 0){
  $('#day').text('Today');
  document.getElementById('date').innerHTML = dateSelected;

}else if(dates.indexOf(dateSelected) === 1){
    $('#day').text('Tomorrow');
    $('#date').text(dateSelected);


}else {
      $('#day').text('Day after Tomorrow');
      $('#date').text(dateSelected);


}


var container = document.querySelector('div.container');
var children = container.children;


//for every key in the root object

  parts = json[dateSelected]['parts'];



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
                           "truck details: " + parts[j].truck_details + "<br/>" +
                           "unloading point: " + parts[j].unloading_point + "<br/>";
   }

}




//Now new list items have been added from addCards method.
// var partContainer = document.querySelector('.collapsible.popout');
// var partDetails = partContainer.children;

// console.log(partDetails);


// for(var i=0; i<partDetails.length; i++) {

//     // traverse the DOM and get the li element
//     var supplierNameListItem = partDetails[i].childNodes[1].childNodes[2].childNodes[1];
//     var supplierNameHTMLString = supplierNameListItem.innerHTML;
//     supplierNameListItem.innerHTML = supplierNameHTMLString + " " + parts[i].supplier_name;
//     var partNoListItem = partDetails[i].childNodes[1].childNodes[2].childNodes[3];
//     var partNoHTMLString = partNoListItem.innerHTML;
//     partNoListItem.innerHTML = partNoHTMLString + " " + (i+1);

//     //traverse the DOM and get the span element on popout
//     var detailSpan = partDetails[i].childNodes[3].childNodes[0];
//     detailSpan.innerHTML = "backlog: " + parts[i].backlog + "<br/>" + "count: " + parts[i].count
//                            + "<br/>" + "description: "  + parts[i].description + "<br/>" +
//                            "ETA: " + parts[i].eta_dicv + "<br/>" +
//                            "planned vehicle quantity: " + parts[i].planned_vehicle_qty + "<br/>" +
//                            "pmc: " + parts[i].pmc + "<br/>" +
//                            "quantity: " + parts[i].quantity + "<br/>" +
//                            "quantity expected: " + parts[i].quantity_expected + "<br/>" +
//                            "reported on: " + parts[i].reported_on + "<br/>" +
//                            "short on: " + parts[i].short_on + "<br/>" +
//                            "shortage reason: " + parts[i].shortage_reason + "<br/>" +
//                            "truck details: " + parts[i].truck_details + "<br/>" +
//                            "unloading point: " + parts[i].unloading_point + "<br/>";

//                     }
}


function addItems(list){
    var container = document.querySelector('div.container');
    var children = container.children;

      var itemContainer = children[0].childNodes[1].childNodes[1].childNodes[3].childNodes[1];
      var child = itemContainer.childNodes;
      var item = child[1];
      for( var j=0; j<list.length-1; j++)
      {
          var newItem = item.cloneNode(true);
          itemContainer.appendChild(newItem);
      }
}

//method to add dates along with the radio buttons
function updateDates(json){

var dates = Object.keys(json);
$('#day-1').text(dates[0]);
$('#day-2').text(dates[1]);
$('#day-3').text(dates[2]);


}

// $('#star').click(function(){
//   this.setAttribute("src","images/filled_star.png");
// });

var star = document.getElementById('star');
star.onclick = function(e){
var image = e.target;
this.src = "images/filled_star.png";
};

// to select a date
$('#date-selection').click(function(){

  var datesCard = document.getElementById('date-choices');
  datesCard.style.removeProperty('display');
  console.log(datesCard.children);

  $('#apply-btn').click(function(){
      datesCard.setAttribute('style','display: none;');

      var dateSelected = $('input[name=dates]:checked').next().text();
      console.log(dateSelected);
      updateDisplay(json, dateSelected);

  });

});



});


