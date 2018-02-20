
// the openNav and closeNav is inspired from https://www.w3schools.com/howto/howto_js_sidenav.asp#
// the openNav it make menu for 250 px
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

// the closeNav is close the menu

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}


var map;
var markers = [];

var locations = [
    {title: 'Alhamra park ', location: {lat: 25.973062, lng: 43.754495}},
    {title: 'Afran Alhatab Bakery ', location: {lat: 26.000588, lng: 43.731621}},
    {title: 'Four guys restaurant ', location: {lat: 25.997484, lng: 43.727867}},
    {title: 'Alkaife', location: {lat: 26.002393, lng: 43.733860}},
    {title: 'Kudo', location: {lat: 25.998950, lng: 43.729622}},
];

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 25.975277, lng: 43.74577},
        zoom: 14
    });


    var largeInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        });
        bounds.extend(markers[i].position);
    }
    // Extend the boundaries of the map for each marker
    map.fitBounds(bounds);
}

function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<h2>' + marker.title + '</h2>');
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
        });
    }
}


// https://stackoverflow.com/questions/34584181/create-live-search-with-knockout
//

function ViewModel(){
    var self =this;
    this.filter = ko.observable();

    this.places = ko.observableArray(markers);


    this.visiblePlaces = ko.computed(function(){
        return this.places().filter(function(place){
            if(!self.filter() || place.title.toLowerCase().indexOf(self.filter().toLowerCase()) !== -1)
                return place;
        });
    },this);

}

ko.applyBindings(new ViewModel());

//
// var beers = [
//     {
//         name: "Dragon's Milk",
//         brewery: "New Holland Brewing Company",
//         style: "Imperial Stout"},
//     {
//         name: "Oberon",
//         brewery: "Bell's",
//         style: "Wheat"},
//     {
//         name: "El Molé Ocho",
//         brewery: "New Holland Brewing Company",
//         style: "Mole Ale"}
// ];
//
// var viewModel = {
//     query: ko.observable('')
// };
//
// viewModel.markers = ko.dependentObservable(function() {
//     var search = this.query().toLowerCase();
//     return ko.utils.arrayFilter(markers, function(beer) {
//         return beer.title.toLowerCase().indexOf(search) >= 0;
//     });
// }, viewModel);
//
// ko.applyBindings(viewModel);