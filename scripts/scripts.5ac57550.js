"use strict";angular.module("wats4030CapstoneApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider","$sceDelegateProvider",function(a,b){b.resourceUrlWhitelist(["self","https://congress.api.sunlightfoundation.com/**"]),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("wats4030CapstoneApp").controller("MainCtrl",["$scope","current","repsearchfed","repsearch",function(a,b,c,d){a.current=b.query(),a.refreshCurrent=function(e){a.current=b.query({location:e}),a.current.$promise.then(function(b){a.repsearchfed=c.query({lat:b.results[0].geometry.location.lat,lng:b.results[0].geometry.location.lng}).then(function(b){a.repdata=b.data})}),a.current.$promise.then(function(b){a.repsearch=d.query({lat:b.results[0].geometry.location.lat,lng:b.results[0].geometry.location.lng})})}}]),angular.module("wats4030CapstoneApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("wats4030CapstoneApp").factory("current",["$resource",function(a){return a("https://maps.googleapis.com/maps/api/geocode/json?address=:location&key=AIzaSyDHcLJvjxGIE2Z3Hk3jKN2WZhB73fXAt4c",{},{query:{method:"GET",params:{location:"Seattle University, 12th Avenue, Seattle, WA"},isArray:!1}})}]),angular.module("wats4030CapstoneApp").factory("repsearch",["$resource",function(a){return a("https://openstates.org/api/v1/legislators/geo/?lat=:lat&long=:lng",{},{query:{method:"GET",params:{lat:"42.96",lng:"-108.09"},isArray:!0}})}]),angular.module("wats4030CapstoneApp").factory("repsearchfed",["$http",function(a){var b="https://congress.api.sunlightfoundation.com/legislators/locate";return{query:function(c){return a.jsonp(b,{jsonpCallbackParam:"callback",params:{latitude:c.lat,longitude:c.lng}})}}}]),angular.module("wats4030CapstoneApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<body ng-app="wats4030CapstoneApp"> <!-- START Test Lat - Long data --> <!-- START Test Lat - Long data --> <div class="jum"> <div class="jum"> <p class="lead"> <div ng-init="location=\'\'"> What is "ours" extends beyond your own backyard. This is my land. This land is your land. You can take care of all it\'s issues by yourself or, we can help those who have been hired to help us - with a couple simple easy phone calls. <p> <div>Call your represenatives, after all they work for you (and me). Be kind and polite; call to tell them you\'d like them to do or stop doing something. Call to thank them for something they\'ve done. If they are doing something you approve of, they need to know. Encourage them to keep it up! Call once a week, it\'s not that many calls; this way you can help steer our government before things get further out of hand. </div> <label for="location">To find your repsenatives, put your Street Address in here: <input type="text" name="location" ng-model="location" value="Seattle University, 12th Avenue, Seattle, WA"> <span class="wrappable"> Then click the button: <button class="btn btn-lg btn-primary" ng-click="refreshCurrent(location)">Show me my Reps</button> </span> </label> </p> You can call your reps by simply clicking on the phone numbers! <!--  <dl>\n            <dt>Lat</dt>\n            <dd>{{current.results[0].geometry.location.lat}}</dd>\n            <dt>Lng</dt>\n            <dd>{{current.results[0].geometry.location.lng}}</dd>\n          </dl>  --> </div> </p> </div> </div> <!-- END Test Lat - Long data --> <!-- END Test Lat - Long data --> <!--Start RepSearch//////////////////////////--> <!--Start RepSearch//////////////////////////--> <!--////////////////////////////////////\nTThis note refers to 2 variables that are used in the code below. (and created here in the html)\nIt’s a reminder of how to perform a basic function on a site, looping through data.\n	1) var repinfo\n	2) var role\nThe data that is returned from the API can be looped through and any data they contain\ncan be pulled out to show on the site.\nSETP ONE:\nData returned from the API : repsearch - (an array containing a bunch of objects).\n<dl ng-repeat="repinfo in repsearch”…..\n	means: Go through the array (repsearch) and pull out anything you find inside that array.\n		Each thing found will be added to the variable repinfo.\n\n	So..  <dd>{{repinfo.last_name}}….:\n		Means: Go through repsearch and add all the last_name values to repinfo.\n		The double curlies means print it out on the site.\nNEXT STEP\nThere is an array inside this array, called roles.\nRoles, is (also) the whole array (of roles). We want to pull out parts of\nthat array and deal with them the way we want. Some parts we don’t care about,\nsome parts get put here, others go there. The procedure is the same as above.\nMake a variable to hold the parts of the array we are interested in.\n\nData returned from the API : repsearch - (is an array that also contains an array called: roles).\n		We are already looping through repsearch and adding data to repinfo (step one).\n		While doing this: When the site gets to the array roles:\n		let’s loop through that and add any data found to another variable: role.\n\n<dl ng-repeat="role in repinfo.roles”….\n	means: Go through the array (roles) and pull out anything you find inside that array.\n		Each thing found will be added to the variable role.\n\n	So..  <dd>{{role.term}}….:\n		Means: Go through (repsearch.roles??????) and add all the term values to role.\n		The double curlies means print it out on the site.\n\nRINSE AND REPEATE\n////////////////////////////////////--> <div class="container-fluid" id="statereps"> <div class="row is-flex" id="text"> <h1>Your Reps</h1> <div ng-init="repsearch" class="container"> <dl class="col-sm-6 col-md-4 col-lg-4" ng-repeat="repinfo in repsearch"> <dd><img class="img-responsive" ng-src="{{repinfo.photo_url}}"></dd> <!--Data supplies chamber: upper or lower to designate House or Senate\nUpper & Lower are meaningless to the public so we\'ll translate them here.--> <dd ng-switch="repinfo.chamber"> <span ng-switch-when="lower">HOUSE</span> <span ng-switch-when="upper">SENATE</span> </dd> <dd ng-switch="repinfo.party">{{repinfo.first_name}} {{repinfo.last_name}} <span ng-switch-when="Democratic">Democrat</span> <span ng-switch-when="Republican">Republican</span> </dd> <dl ng-repeat="office in repinfo.offices"> <dd>Ph: <a href="tel:+1{{office.phone}}">{{office.phone}}</a></dd> <dd ng-if="office.fax">Fx: {{office.fax}}</dd> <dd ng-if="office.email">email: {{office.email}}</dd> <p></p> <dd> {{office.name}}</dd> <dd>Address: {{office.address}}</dd> <dl ng-repeat="role in repinfo.roles" ng-show="$first"> <dd>Term of Service: {{role.term | limitTo:4}} - {{role.term | limitTo:-4}}</dd> </dl> </dl> </dl> </div> </div> </div> <!--End RepSearch//////////////////////////--> <!--End RepSearch//////////////////////////--> <!--Start RepSearchFED//////////////////////////--> <!--Start RepSearchFED//////////////////////////--> <div class="container-fluid" id="fedreps"> <div class="row is-flex"> <h1>Your FED Reps</h1> <!--{{repdata|json}}--> <div ng-init="repsearchfed" class="container"> <dl class="col-sm-6 col-md-4 col-lg-4" ng-repeat="repinfofed in repdata.results"> <dd><img class="img-responsive" ng-src="https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/225x275/{{repinfofed.bioguide_id}}.jpg"> </dd> <dd>{{repinfofed.chamber | uppercase}}</dd> <dd ng-switch="repinfofed.party">{{repinfofed.first_name}} {{repinfofed.last_name}} <span ng-switch-when="D">Democrat</span> <span ng-switch-when="R">Republican</span> </dd> <dd>Ph: <a href="tel:+1{{repinfofed.phone}}">{{repinfofed.phone}}</a></dd> <dd ng-if="repinfofed.fax">Fx: {{repinfofed.fax}}</dd> <dd ng-if="repinfofed.oc_email">email: {{repinfofed.oc_email}}</dd> <p></p> <dd>{{repinfofed.office}}</dd> <dd>Term of Service {{repinfofed.term_start}}, {{repinfofed.term_end}} </dd> </dl> </div> </div> </div> <!--End RepSearchFED//////////////////////////--> <!--End RepSearchFED//////////////////////////--> <div class="row marketing"> </div> </body>')}]);