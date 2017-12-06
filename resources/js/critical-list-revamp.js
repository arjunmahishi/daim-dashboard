var url = "https://daimler-backend.herokuapp.com/api/critical_list/critical_parts/";
var data = [];
var json;
var token = sessionStorage.tokenid || "83cc351e4ec002a30f5fbe3e768cc4874263e9dd";
var ctx = document.getElementById('myChart').getContext('2d');

//variables for date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();

if (dd < 10) {
    dd = '0' + dd
}

if (mm < 10) {
    mm = '0' + mm
}

date = yyyy + '-' + mm + '-' + dd;

//main function
$(function () {
    getData();
    $('#mdt').click(function () {
        sessionStorage.selection = "Giftson";
        window.location.replace("/critical-list-detail.html");

    });
    $('#hdt').click(function () {
        sessionStorage.selection = "Arulselvan";
        window.location.replace("/critical-list-detail.html");
    });
    $('#axle').click(function () {

        var cardTitle = "AXLE";
        sessionStorage.selection = "Joshna";
        console.log(cardTitle);
        window.location.replace("/critical-list-detail.html");

    });
    $('#casting-and-forging').click(function () {

        var cardTitle = "CASTING AND FORGING";
        sessionStorage.selection = "Premkumar";
        console.log(cardTitle);
        window.location.replace("/critical-list-detail.html");

    });
    $('#transmission').click(function () {

        var cardTitle = "TRANSMISSION";
        sessionStorage.selection = "Balaji";
        console.log(cardTitle);
        window.location.replace("/critical-list-detail.html");

    });

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15, // Creates a dropdown of 15 years to control year,
        today: 'Today',
        clear: 'Clear',
        close: 'Ok',
        closeOnSelect: true // Close upon selecting a date,
    });

    //For storing a reference to the node that displays parts
    var tableContainer = document.getElementById('table');
    var childNodes = tableContainer.children;
    console.log(childNodes);

    tableRow = childNodes[1].childNodes[1];


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
            sessionStorage.date = date;



            getData();
        });
    });

    $('#next').click(function(e){
        var d= $('#date').text();
        dd= parseInt(d.substr(8,9));
        dd++;
        if(dd==31) dd=1;
        date = yyyy + '-' + mm + '-' + dd;

        getData();
        e.stopPropagation();
    });
    $('#prev').click(function(e){
        var d= $('#date').text();
        dd= parseInt(d.substr(8,9));

        dd--;
        if(dd==0) dd=31;
        date = yyyy + '-' + mm + '-' + dd;
        getData();
        e.stopPropagation();
    });

});

function getData() 
{
    fetch(url, {
        method: "get",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Token ' + token
        }
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                json = data;
                console.log(json);
                addItems(json);
                dataForChart(json);
                updateDisplay(json,date);

            });
        } else {
            console.log('Network request failed with response ' + response.status + ': ' + response.statusText);
        }
    });
}

function addItems(json) {
    for (var i = 0; i < json.length; i++) {


        $("#part_number_re").text("" + json[i].part_number);
        if(json[i].status==3)
            $("#status").text("critical");
        else
            $("#status").text("normal");
        $('#details').html("<b>Supplier: </b>"+json[i].supplier_name+"<br><b>PMC:</b>"+json[i].pmc);

        $("#collection").clone(true, true).insertAfter("#collection");



    }


}
function dataForChart(json) {
    var partnumber = [];
    var quantityAvailable = [];
    var plannedVehicleQuantity = [];
    var dicv = [];

    for (var i = 0; i < json.length; i++) {

        if (i == 4) break;

        for (var prop in json[i]) {
            if (prop == 'part_number')
                partnumber.push(json[i][prop]);

            else if (prop === 'quantity')
                quantityAvailable.push(json[i][prop]);

            else if (prop === 'eta_dicv')
                dicv.push(json[i][prop]);

            else if (prop === 'planned_vehicle_qty')
                plannedVehicleQuantity.push(json[i][prop]);


        }
        console.log(quantityAvailable);

    }
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
        scaleFontColor: '#fffffff',

        // The data for our dataset
        data: {
            labels: partnumber,
            datasets: [{
                label: "Quantity Avl",
                backgroundColor: 'rgb(210, 48, 48)',
                borderColor: 'rgb(210, 48, 48)',
                data: quantityAvailable,
            },
                       {
                           label: "Planned Vehicle Qty",
                           backgroundColor: 'rgb(200, 200, 136)',
                           borderColor: 'rgb(200, 200, 136)',
                           data: plannedVehicleQuantity,
                       },
                      ],
        },

        // Configuration options go here
        options: {
            scaleFontColor: '#ffffff',
            responsive: "true",
            layout: {
                padding: {
                    left: 20,
                    right: 20,
                    top: 10,
                    bottom: 10
                }
            },
            legend: {
                labels: {
                    fontColor: "#ffffff",
                }
            },

            scales: {
                xAxes: [{
                    ticks: {
                        fontColor: "#ffffff",
                    }
                }],
                yAxes: [{
                    ticks: {
                        fontColor: "#ffffff",
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}