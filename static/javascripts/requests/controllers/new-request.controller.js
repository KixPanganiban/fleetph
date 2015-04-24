/**
* NewRequestController
* @namespace myapp.requests.controllers
*/
(function () {
  'use strict';

  angular
    .module('myapp.requests.controllers')
    .controller('NewRequestController', NewRequestController);

  NewRequestController.$inject = ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Requests', 'geolocation'];

  /**
  * @namespace NewRequestController
  */
  function NewRequestController($rootScope, $scope, Authentication, Snackbar, Requests, geolocation) {
    var vm = this;

    vm.submit = submit;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf myapp.requests.controllers.NewRequestController
    */
    function activate() {
      geolocation.getLocation().then(function(data){
        vm.coords = {lat:data.coords.latitude, long:data.coords.longitude};
      });
    }

    /**
    * @name submit
    * @desc Create a new request
    * @memberOf myapp.requests.controllers.NewRequestController
    */
    function submit() {
      $rootScope.$broadcast('request.created', {
        origin: vm.coords.lat + ',' + vm.coords.long,
        destination: vm.destination,
        owner: {
          username: Authentication.getAuthenticatedAccount().username
        },
      });

      $scope.closeThisDialog();

      Requests.create(vm.coords.lat + ',' + vm.coords.long, vm.destination).then(createRequestSuccessFn, createRequestErrorFn);

      /**
      * @name createrequestSuccessFn
      * @desc Show snackbar with success message
      */
      function createRequestSuccessFn(data, status, headers, config) {
        Snackbar.show('Success! request created.');
      }


      /**
      * @name createRequestErrorFn
      * @desc Propogate error event and show snackbar with error message
      */
      function createRequestErrorFn(data, status, headers, config) {
        $rootScope.$broadcast('request.created.error');
        Snackbar.error(data.error);
      }
    }
  }
})();
