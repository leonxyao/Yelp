(function(window, document, undefined) {
  var GoogleMapView = {};
  
  // zoom level for Google Map
  var DEFAULT_ZOOM = 14;
  var STATUS_OK = 200;

  var MAP_URL = 'http://maps.googleapis.com/maps/api/geocode/json?address=';

  /* Renders a map for the given entry into the provided $map element. */
  GoogleMapView.render = function($map, entryData) {
  	if(entryData===null) return;
    var request = new XMLHttpRequest();
    var address = entryData.address.split(' ');
    url = MAP_URL+address[0];
    for(var i=1; i<address.length;i++){
      if(address[i].indexOf('#') == -1){ //add + between words in address
        url+='+'+address[i]; //if # is in address, for example in apt #, then take out
      } //this is because google maps somehow cannot find the address with it
    }
    url+='&sensor=true'; 
    request.addEventListener('load', function(event) { //once request loads, find lat,lng of address
	    if(this.status === STATUS_OK){
	    	var results = JSON.parse(this.responseText).results;
	    	var lat = results[0].geometry.location.lat;
	    	var lng = results[0].geometry.location.lng;
	    }
	    var myLatlng = new google.maps.LatLng(lat,lng); 
	    var mapOptions = {
	          center: myLatlng,
	          zoom: 15 //zoom 15 gives good focused view of location
	        };
	    var map = new google.maps.Map(document.getElementsByClassName("map")[0],mapOptions);
	   	var marker = new google.maps.Marker({ //add marker to the lat,lng found earlier
	      position: myLatlng,
	      map: map,
	      title: entryData.name
	  	});

	});
  request.open('GET',url,true);
	request.send();
  };
  
  window.GoogleMapView = GoogleMapView;
})(this, this.document);
