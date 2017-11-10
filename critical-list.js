var url = "https://daimler-backend.herokuapp.com/critical_list/";
var token = "99f2d9e404f270fb5ec6033b0e5fbaa5d8c09f35";




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



            });


function addCards(json){
var cardContainer = document.querySelector('div.container');
var rows = cardContainer.children;
console.log(rows);
var numberOfKeys = Object.keys(json).length;
var numberOfRows = Math.ceil(numberOfKeys / 2);
console.log(numberOfRows);
for(i=0; i<numberOfRows - 1; i++){
    var newRow = rows[0].cloneNode(true);
    newRow.removeChild(newRow.childNodes[1]);
    cardContainer.appendChild(newRow);

}
var card = rows[0].childNodes[1];
card.style.removeProperty('display');
// var card = children[1];
var rowNumber = 0;
for(var i=1; i< numberOfKeys; i++){
    var newCard = card.cloneNode(true);

    //console.log(newCard);
    // if(i==1){
    //     rowNumber = 0;
    // }
    // else{
    //     rowNumber = Math.ceil(i/2);
    //     rows[rowNumber].appendChild(newCard);
    // }

    if(i<2){
    rows[0].appendChild(newCard);
    }else if(i>=2 && i<4){
        rows[1].appendChild(newCard);
    }else{
        rows[2].appendChild(newCard);
    }

  }
}

function updateDisplay(json){
    var i=0, j=0;
    var cardContainer = document.querySelector('div.container');
    var rows = cardContainer.children;
    var rowCount = 0;

    for(var k in json){
        cards = rows[rowCount].children;
        cardTitle = cards[j].childNodes[1].childNodes[1].childNodes[1];
        cardTitle.innerHTML = k;

        cards[j].onclick = function(e){
            var selection = this.childNodes[1].childNodes[1].childNodes[1].innerText;
            sessionStorage.selection = selection;
            window.location.replace("https://localhost:3000/critical-list-detail.html");

        }

        i++;j++;
        if(j>1) j=0;
        if(i<2) rowCount=0;
        else if(i>=2 && i<4) rowCount=1;
        else rowCount=2;
    }
}


});