'use strict';

angular.module('homepageApp')
  .controller('MainCtrl', function ($scope, $window, $location, $translate, $http) {
    $scope.map = null;
    $scope.marker = null;
    $scope.show_popups = [false, false, true, false, false];
    $scope.pages_top = [0, 720, 1520, 2320, 3120, 3920];
    $scope.isCollapsed = false;


    $scope.initialize = function() {
      var mapOptions = {
        center: new google.maps.LatLng(37.5084321,127.0209702),
        zoom: 13,
        mayTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        disableDoubleClickZoom: true,
        draggable: true,
        overviewMapControl: false,
        streetViewControl: false,
        scaleControl: false,
        zoomControl: false
      };

      $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

      var iconOpt = {
        anchor: new google.maps.Point(0, 0),
        size: new google.maps.Size(60, 66),
        url: "../images/map_logo.png"
      };

      //var icon =  new google.maps.Icon(iconOpt);
      //console.log(icon);

      var markerOptions = {
        position: new google.maps.LatLng(37.5084321,127.0209702),
        title: "BLT Office",
        visible: true,
        icon: "../images/map_logo.png",
        map: $scope.map
      };

      $scope.marker = new google.maps.Marker(markerOptions);
    };

    $scope.scrollTo = function(id) {
      $location.hash(id);
      //$anchorScroll();
      $scope.isCollapsed = !$scope.isCollapsed;
    }

    $scope.languageChange = function(language) {
      switch(language) {
        case "us" :
          $translate.uses("en_US");
          break;
        case "kr" :
          $translate.uses("ko_KR");
          break;
        default:
          $translate.uses("en_US");
          break;
      }
    };


    $scope.getIP = function() {
      $http.jsonp("http://jsonip.com?callback=JSON_CALLBACK").success( function(data) {
        $scope.getLocationByIP(data.ip);
      });
    };

    $scope.getLocationByIP = function(ip) {
      $http.jsonp("http://ipinfo.io/" + ip + "/json?callback=JSON_CALLBACK").success( function(data) {
        if (data) 
          var lat = data.loc.split(',')[0];
          var lng = data.loc.split(',')[1];
          var new_loc = new google.maps.LatLng(lat, lng);
          $scope.map.setCenter(new_loc);
          var country = data.country;
          $scope.languageChange(country.toLowerCase());
          if ($window.localStorage) {
            $window.localStorage.setItem("location", country.toLowerCase());
          }
      });
    };

    $scope.show_readmore = function(e) {
      angular.element(e.target).parent().parent().find("p.desc.hidden").removeClass('hidden');
      angular.element(e.target).remove();
    };
  });
