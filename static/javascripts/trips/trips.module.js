(function () {
  'use strict';

  angular
    .module('myapp.trips', [
      'myapp.trips.controllers',
      'myapp.trips.directives',
      'myapp.trips.services',
      'infinite-scroll',
      'relativeDate'
    ]);

  angular
    .module('myapp.trips.controllers', []);

  angular
    .module('myapp.trips.directives', ['ngDialog']);

  angular
    .module('myapp.trips.services', ['LocalStorageModule']);
})();
