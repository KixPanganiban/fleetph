(function () {
  'use strict';

  angular
    .module('myapp.routes')
    .config(config);

  config.$inject = ['$routeProvider'];

  /**
  * @name config
  * @desc Define valid application routes
  */
  function config($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: '/static/templates/layout/index.html',
    }).otherwise('/');
  }
})();
