'use strict';

var app = angular.module('homepageApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'pascalprecht.translate',
  'ui.bootstrap'
])
  .config(function ($routeProvider, $translateProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

      $translateProvider.useStaticFilesLoader({
        prefix: 'scripts/l10n/',
        suffix: '.json'
      });
      $translateProvider.preferredLanguage("ko_KR");
  });

app.filter("sanitize", ['$sce', function($sce) {
  return function(htmlCode) {
    return $sce.trustAsHtml(htmlCode);
  }
}]);
