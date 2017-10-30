addCards();

function addCards(){
    var cardContainer = document.querySelector('.collapsible.popout');
    children = cardContainer.childNodes;
    var card = children[1];
    
    for(var i=0; i<7; i++) {
        var newItem = card.cloneNode(true);
        cardContainer.append(newItem);
    }
    console.log(children);
}