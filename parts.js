var url = "https://daimler-backend.herokuapp.com/parts/";
var token = "e7cf60af4daa0ccfbafefc40328085cdc856211b";
$(function(){
fetch(url, {
	 method: "get",
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'Authorization' : 'Token '+token
                }
            }).then(function(response){
            	if(response.ok){
            		response.json().then(function(json){
					          console.log(json);
                    addCards(json);
                    updateDisplay(json);
            	   });
            	}
            	else {
            		 console.log('Network request failed with response ' + response.status + ': ' + response.statusText);
            	}
            });

function updateDisplay(parts){

//Now new list items have been added from addCards method.
var partContainer = document.querySelector('.collapsible.popout');
var partDetails = partContainer.children;

console.log(partDetails);


for(var i=0; i<partDetails.length; i++) {

    // traverse the DOM and get the li element
    var supplierNameListItem = partDetails[i].childNodes[1].childNodes[1].childNodes[0];
    var supplierNameHTMLString = supplierNameListItem.innerHTML;
    supplierNameListItem.innerHTML = supplierNameHTMLString + " " + parts[i].supplier_name;
    var partNoListItem = partDetails[i].childNodes[1].childNodes[1].childNodes[2];
    var partNoHTMLString = partNoListItem.innerHTML;
    partNoListItem.innerHTML = partNoHTMLString + " " + (i+1);

    //traverse the DOM and get the span element on popout
    var detailSpan = partDetails[i].childNodes[3].childNodes[1];
    detailSpan.innerHTML = "backlog: " + parts[i].backlog + "<br/>" + "count: " + parts[i].count
                           + "<br/>" + "description: "  + parts[i].description + "<br/>" +
                           "ETA: " + parts[i].eta_dicv + "<br/>" +
                           "planned vehicle quantity: " + parts[i].planned_vehicle_qty + "<br/>" +
                           "pmc: " + parts[i].pmc + "<br/>" +
                           "quantity: " + parts[i].quantity + "<br/>" +
                           "quantity expected: " + parts[i].quantity_expected + "<br/>" +
                           "reported on: " + parts[i].reported_on + "<br/>" +
                           "short on: " + parts[i].short_on + "<br/>" +
                           "shortage reason: " + parts[i].shortage_reason + "<br/>" +
                           "truck details: " + parts[i].truck_details + "<br/>" +
                           "unloading point: " + parts[i].unloading_point + "<br/>";

}

}
function addCards(list){
    var cardContainer = document.querySelector('.collapsible.popout');
    var children = cardContainer.childNodes;
    var card = children[1];
    for( i=0; i<list.length - 1; i++)
    {
        var newItem = card.cloneNode(true);
        cardContainer.appendChild(newItem);
    }


}


});

// var ul = document.getElementById("foo");
// var items = ul.getElementsByTagName("li");
// for (var i = 0; i < items.length; ++i) {
//   // do something with items[i], which is a <li> element
// }

//Name:<br/>Open stock:<br/>Qty expected:<br/>ETA: