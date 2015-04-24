/**
* trip
* @namespace myapp.trip.directives
*/
(function() {
	'use strict';

angular
	.module('myapp.trips.directives')
	.directive('reverseGeocode', reverseGeocode);

/**
* @namespace trip
*/
function reverseGeocode() {
        return {
            restrict: 'E',
            template: '',
            link: function (scope, element, attrs) {
                var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(attrs.longlat.split(',')[0], attrs.longlat.split(',')[1]);
                geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            element.text(results[0].formatted_address);
                        } else {
                            element.text('Location not found');
                        }
                    } else {
                        element.text('Geocoder failed due to: ' + status);
                    }
                });
            },
            replace: false
        }
}
})();