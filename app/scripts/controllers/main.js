'use strict';

/**
 * @ngdoc function
 * @name wats4030CapstoneApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the wats4030CapstoneApp
 */
angular.module('wats4030CapstoneApp')
  .controller('MainCtrl', function($scope, current, repsearchfed, repsearch) {
    $scope.current = current.query();
//// Refresh data in the div AND make the div visiable /////////////////
    $scope.refreshCurrent = function(location) {
//// Make the div visiable /////////////////
      $scope.IsVisible = $scope.IsVisible ? false : true;    
      $scope.current = current.query({
        location: location
      });
      $scope.current.$promise.then(function(data) {
        $scope.repsearchfed = repsearchfed.query({
          lat: data.results[0].geometry.location.lat, //This is the Google search
          lng: data.results[0].geometry.location.lng
        }).then(function(repdata) {
          $scope.repdata = repdata.data;
        });
      });


      $scope.current.$promise.then(function(data) {
        $scope.repsearch = repsearch.query({
          lat: data.results[0].geometry.location.lat, //This is the Google search
          lng: data.results[0].geometry.location.lng
        });
      });


    };

  });
