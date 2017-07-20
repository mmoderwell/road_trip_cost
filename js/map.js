let time, dist;
let distance;

document.addEventListener("DOMContentLoaded", function(event) {
    //set your google maps parameters
    var latitude = 41.8781,
        longitude = -87.6298,
        map_zoom = 12;

    //define the basic color of your map, plus a value for saturation and brightness
    var main_color = '#6f87db',
        saturation_value = -10,
        brightness_value = 10;

    //we define here the style of the map
    var style = [{
            //set saturation for the labels on the map
            elementType: "labels",
            stylers: [
                { saturation: saturation_value }
            ]
        }, { //poi stands for point of interest - don't show these lables on the map 
            featureType: "poi",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        }, {
            //don't show highways lables on the map
            featureType: 'road.highway',
            elementType: 'labels',
            stylers: [
                { visibility: "off" }
            ]
        }, {
            //don't show local road lables on the map
            featureType: "road.local",
            elementType: "labels.icon",
            stylers: [
                { visibility: "off" }
            ]
        }, {
            //don't show arterial road lables on the map
            featureType: "road.arterial",
            elementType: "labels.icon",
            stylers: [
                { visibility: "off" }
            ]
        }, {
            //don't show road lables on the map
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [
                { visibility: "off" }
            ]
        },
        //style different elements on the map
        {
            featureType: "transit",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        }, {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        }, {
            featureType: "poi.government",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        }, {
            featureType: "poi.sport_complex",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        }, {
            featureType: "poi.attraction",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        }, {
            featureType: "poi.business",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        }, {
            featureType: "transit",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        }, {
            featureType: "transit.station",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        }, {
            featureType: "landscape",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]

        }, {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [
                { hue: main_color },
                { visibility: "on" },
                { lightness: brightness_value },
                { saturation: saturation_value }
            ]
        }
    ];


    //set google map options
    var map_options = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: map_zoom,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        styles: style,
    }
    //inizialize the map
    var map = new google.maps.Map(document.getElementById('google-container'), map_options);
    var geocoder = new google.maps.Geocoder;
    var start = document.getElementById('q2');
    var end = document.getElementById('q3');
    var start_autocomplete = new google.maps.places.Autocomplete(start);
    var end_autocomplete = new google.maps.places.Autocomplete(end);

    start_autocomplete.addListener('place_changed', function() {

        var place = start_autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }
        geocoder.geocode({ 'placeId': place.place_id }, function(results, status) {
            if (status !== 'OK') {
                window.alert('Geocoder failed due to: ' + status);
                return;
            }
            map.setZoom(11);
            map.setCenter(results[0].geometry.location);
            // Set the position of the marker using the place ID and location.
            start_marker.setPlace({
                placeId: place.place_id,
                location: results[0].geometry.location,
            });
        });
    });

    end_autocomplete.addListener('place_changed', function() {
        var place = end_autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }
        geocoder.geocode({ 'placeId': place.place_id }, function(results, status) {
            if (status !== 'OK') {
                window.alert('Geocoder failed due to: ' + status);
                return;
            }
            end_marker.setPlace({
                placeId: place.place_id,
                location: results[0].geometry.location,
            });

            //draw a line between start and end
            directions();

            // Set the position of the marker using the place ID and location.
            start_marker.setVisible(true);
            end_marker.setVisible(true);

        });
    });

    function directions() {
        var request = {
            destination: document.getElementById('q3').value,
            origin: document.getElementById('q2').value,
            travelMode: 'DRIVING'
        };
        // Pass the directions request to the directions service.
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function(response, status) {
            if (status == 'OK') {
                // Display the route on the map.
                directionsDisplay.setDirections(response);
            }
        });
    }

    distance = function() {
        return new Promise(function(resolve, reject) {
            //async code in promise
            var origin = document.getElementById('q2').value;
            var destination = document.getElementById('q3').value;
            var service = new google.maps.DistanceMatrixService;
            var textdist;
            service.getDistanceMatrix({
                origins: [origin],
                destinations: [destination],
                travelMode: 'DRIVING',
                unitSystem: google.maps.UnitSystem.IMPERIAL,
                avoidHighways: false,
                avoidTolls: false
            }, function(response, status) {
                if (status !== 'OK') {
                    alert('Error was: ' + status);
                } else {
                    var originList = response.originAddresses;
                    var destinationList = response.destinationAddresses;
                }
                var showGeocodedAddressOnMap = function(asDestination) {
                    return function(results, status) {
                        if (status === 'OK') {
                            return;
                        } else {
                            alert('Geocode was not successful due to: ' + status);
                        }
                    };
                };
                for (var i = 0; i < originList.length; i++) {
                    var results = response.rows[i].elements;
                    for (var j = 0; j < results.length; j++) {
                        geocoder.geocode({ 'address': destinationList[j] },
                            showGeocodedAddressOnMap(true));

                        textdist = results[j].distance.text;
                        //take string with distance data and unit and convert to raw number
                        textdist = textdist.replace('mi', '');
                        textdist = textdist.replace(/,/g, '');
                        textdist = textdist.replace(' ', '');
                        time = results[j].duration.text;
                        dist = textdist;

                        if (dist) {
                            resolve(dist);
                        } else {
                            reject(Error("Trouble fetching distance data."));
                        }

                    }
                }
            });
        });
    };

    function clearmap() {
        start_marker.setVisible(false);
        end_marker.setVisible(false);
        map.setZoom(map_zoom);
        map.setCenter(new google.maps.LatLng(latitude, longitude));
    }

    //add a custom marker to the map                
    var start_marker = new google.maps.Marker({
        map: map,
        icon: 'images/icon-location.png'
    });
    var end_marker = new google.maps.Marker({
        map: map,
        icon: 'images/icon-location.png'
    });

    var directionsDisplay = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: true,
    });

    // Set destination, origin and travel mode.

    //add custom buttons for the zoom-in/zoom-out on the map
    function CustomZoomControl(controlDiv, map) {
        //grap the zoom elements from the DOM and insert them in the map 
        var controlUIzoomIn = document.getElementById('zoom-in'),
            controlUIzoomOut = document.getElementById('zoom-out');
        controlDiv.appendChild(controlUIzoomIn);
        controlDiv.appendChild(controlUIzoomOut);

        // Setup the click event listeners and zoom-in or out according to the clicked element
        google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
            map.setZoom(map.getZoom() + 1)
        });
        google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
            map.setZoom(map.getZoom() - 1)
        });
    }

    var zoomControlDiv = document.createElement('div');
    var zoomControl = new CustomZoomControl(zoomControlDiv, map);

    //insert the zoom div on the top left of the map
    map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
});