/**
* IndexController
* @namespace myapp.layout.controllers
*/
(function () {
  'use strict';

  angular
    .module('myapp.layout.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', 'Feed', 'Snackbar', 'Collections', 'Authentication'];

  /**
  * @namespace IndexController
  */
  function IndexController($scope, Feed, Snackbar, Collections, Authentication) {
    var vm = this;

    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.featured_collections = [];
    vm.posts = new Feed();

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf myapp.posts.controllers.IndexController
    */
    function activate() {
      Collections.featured().then(collectionsSuccessFn, collectionsErrorFn);


      /**
        * @name collectionsSucessFn
        * @desc Update `featured_collectionss` on viewmodel
        */
      function collectionsSuccessFn(data, status, headers, config) {
        vm.featured_collections = data.data;
      }


      /**
        * @name collectionsErrorFn
        * @desc Show error snackbar
        */
      function collectionsErrorFn(data, status, headers, config) {
        Snackbar.error(data.data.error);
      }
    }
  }
})();
