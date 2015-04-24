/**
* NewRequestController
* @namespace myapp.requests.controllers
*/
(function () {
  'use strict';

  angular
    .module('myapp.requests.controllers')
    .controller('NewRequestController', NewRequestController);

  NewRequestController.$inject = ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Requests'];

  /**
  * @namespace NewRequestController
  */
  function NewRequestController($rootScope, $scope, Authentication, Snackbar, Requests) {
    var vm = this;

    vm.submit = submit;

    /**
    * @name submit
    * @desc Create a new request
    * @memberOf myapp.requests.controllers.NewrequestController
    */
    function submit() {
      $rootScope.$broadcast('request.created', {
        origin: vm.origin,
        destination: vm.destination,
        owner: {
          username: Authentication.getAuthenticatedAccount().username
        },
      });

      $scope.closeThisDialog();

      Requests.create(vm.origin, vm.destination).then(createRequestSuccessFn, createRequestErrorFn);

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
