/**
* TripController
* @namespace myapp.trips.controllers
*/
(function () {
  'use strict';

  angular
    .module('myapp.trips.controllers')
    .controller('TripController', TripController);

  TripController.$inject = ['$scope', '$routeParams', 'Trips', 'Snackbar', 'Authentication'];

  /**
  * @namespace TripController
  */
  function TripController($scope, $routeParams, Trips, Snackbar, Authentication) {
    var vm = this;

    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.trip = undefined;
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf myapp.trips.controllers.ProfileController
    */
    function activate() {
      var id = $routeParams.id;
      Trips.get(id).then(tripsuccessFn, profileErrorFn);

      /**
      * @name tripsuccessProfile
      */
      function tripsuccessFn(data, status, headers, config) {
        vm.trip = data.data;
      }


      /**
      * @name profileErrorFn
      * @desc Redirect to index and show error Snackbar
      */
      function profileErrorFn(data, status, headers, config) {
        $location.url('/');
        Snackbar.error('That user does not exist.');
      }
    }
  }
})();
