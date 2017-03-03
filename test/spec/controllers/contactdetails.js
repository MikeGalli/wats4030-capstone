'use strict';

describe('Controller: ContactdetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('wats4030CapstoneApp'));

  var ContactdetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContactdetailsCtrl = $controller('ContactdetailsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ContactdetailsCtrl.awesomeThings.length).toBe(3);
  });
});
