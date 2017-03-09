"use strict";angular.module("wats4030CapstoneApp",["ngAnimate","ngAria","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","720kb.socialshare"]).config(["$routeProvider","$sceDelegateProvider",function(a,b){b.resourceUrlWhitelist(["self","https://congress.api.sunlightfoundation.com/**"]),a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).when("/contactdetails",{templateUrl:"views/contactdetails.html",controller:"ContactdetailsCtrl",controllerAs:"contactdetails"}).otherwise({redirectTo:"/"})}]),angular.module("wats4030CapstoneApp").controller("MainCtrl",["$scope","current","repsearchfed","repsearch",function(a,b,c,d){a.current=b.query(),a.refreshCurrent=function(e){a.IsVisible=a.IsVisible?!1:!0,a.current=b.query({location:e}),a.current.$promise.then(function(b){a.repsearchfed=c.query({lat:b.results[0].geometry.location.lat,lng:b.results[0].geometry.location.lng}).then(function(b){a.repdata=b.data})}),a.current.$promise.then(function(b){a.repsearch=d.query({lat:b.results[0].geometry.location.lat,lng:b.results[0].geometry.location.lng})})}}]),angular.module("wats4030CapstoneApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("wats4030CapstoneApp").factory("current",["$resource",function(a){return a("https://maps.googleapis.com/maps/api/geocode/json?address=:location&key=AIzaSyDHcLJvjxGIE2Z3Hk3jKN2WZhB73fXAt4c",{},{query:{method:"GET",params:{location:"Seattle University, 12th Avenue, Seattle, WA"},isArray:!1}})}]),angular.module("wats4030CapstoneApp").factory("repsearch",["$resource",function(a){return a("https://openstates.org/api/v1/legislators/geo/?lat=:lat&long=:lng",{},{query:{method:"GET",params:{lat:"42.96",lng:"-108.09"},isArray:!0}})}]),angular.module("wats4030CapstoneApp").factory("repsearchfed",["$http",function(a){var b="https://congress.api.sunlightfoundation.com/legislators/locate";return{query:function(c){return a.jsonp(b,{jsonpCallbackParam:"callback",params:{latitude:c.lat,longitude:c.lng}})}}}]),angular.module("wats4030CapstoneApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<body ng-app="wats4030CapstoneApp"> <!-- START Test Lat - Long data --> <!-- START Test Lat - Long data --> <div class="container-fluid" id="intro"> <div class="row is-flex"> <p class="lead"> <div class="col-sm-12" ng-init="location=\'\'"> <h1>Contact your legislators now.</h1> <span>Our legislators must be held accountable to the people they represent- us. Use <strong style="display:inline">your</strong> voice to make a difference today. All it takes is 5 minutes.</span> <h4>You can make a difference, just call once a week!</h4> <span>The time to act is now. Make yourself <strong>heard</strong> and hold your reps accountable to the values that got you to vote for them.</span> <br>Not sure what to say? Look at this script to help you get your message to legislators about important issues:<br> <i>Hello, my name is __________, and I’m calling today from __(city)__ to urge Senator/Congressman __________ to support/oppose____________. This is an important issue to me as one of their constituents and I hope that they will continue to uphold my values so that I can vote for them. Thank you for sharing my message.</i><br> <div class="container-fluid"> <div class="row is-flex"> <div class="col-sm-12 col-md-6 findReps"> <label for="location"><h5>To find your repsenatives, put your Street Address in here:<input type="text" name="location" ng-model="location" value=""> <span class="disclaimerText">*It\'s safe!</span></h5> </label> </div> <div class="col-sm-6 col-md-6 findReps"> <h5>Then click the button: <button class="btn btn-xs btn-primary" ng-click="refreshCurrent(location)">Show me my Reps</button> </h5> </div> </div> </div> <!--  <dl>\n            <dt>Lat</dt>\n            <dd>{{current.results[0].geometry.location.lat}}</dd>\n            <dt>Lng</dt>\n            <dd>{{current.results[0].geometry.location.lng}}</dd>\n          </dl>  --> </div> </p> </div> </div> <!-- END Test Lat - Long data --> <!-- END Test Lat - Long data --> <!--Start RepSearch//////////////////////////--> <!--Start RepSearch//////////////////////////--> <!--////////////////////////////////////\nTThis note refers to 2 variables that are used in the code below. (and created here in the html)\nIt’s a reminder of how to perform a basic function on a site, looping through data.\n	1) var repinfo\n	2) var role\nThe data that is returned from the API can be looped through and any data they contain\ncan be pulled out to show on the site.\nSETP ONE:\nData returned from the API : repsearch - (an array containing a bunch of objects).\n<dl ng-repeat="repinfo in repsearch”…..\n	means: Go through the array (repsearch) and pull out anything you find inside that array.\n		Each thing found will be added to the variable repinfo.\n\n	So..  <dd>{{repinfo.last_name}}….:\n		Means: Go through repsearch and add all the last_name values to repinfo.\n		The double curlies means print it out on the site.\nNEXT STEP\nThere is an array inside this array, called roles.\nRoles, is (also) the whole array (of roles). We want to pull out parts of\nthat array and deal with them the way we want. Some parts we don’t care about,\nsome parts get put here, others go there. The procedure is the same as above.\nMake a variable to hold the parts of the array we are interested in.\n\nData returned from the API : repsearch - (is an array that also contains an array called: roles).\n		We are already looping through repsearch and adding data to repinfo (step one).\n		While doing this: When the site gets to the array roles:\n		let’s loop through that and add any data found to another variable: role.\n\n<dl ng-repeat="role in repinfo.roles”….\n	means: Go through the array (roles) and pull out anything you find inside that array.\n		Each thing found will be added to the variable role.\n\n	So..  <dd>{{role.term}}….:\n		Means: Go through (repsearch.roles??????) and add all the term values to role.\n		The double curlies means print it out on the site.\n\nRINSE AND REPEATE\n////////////////////////////////////--> <div ng-show="IsVisible" class="container-fluid {{repinfofed.state}}" id="statereps" ng-init="repsearchfed" ng-repeat="repinfofed in repdata.results | limitTo:1"> <div ng-init="repsearch" class="row is-flex" id="headertext"> <h1 class="headertext">Your Reps</h1> <!-- <img ng-src="../images/{{repinfofed.state}}.jpg" />\n\nurl("../images/American-Iphone-Flag-HD-Wallpapers_V2.0445419a.jpg")\n--> <div class="container"> <dl class="col-sm-12 col-md-4 col-lg-4 reps" ng-repeat="repinfo in repsearch"> <dd ng-switch="repinfo.photo_url"> <img class="img-responsive" ng-src="{{repinfo.photo_url}}"></dd> <!--Data supplies chamber: upper or lower to designate House or Senate\nUpper & Lower are meaningless to the public so we\'ll translate them here.--> <dd ng-switch="repinfo.chamber"> <span ng-switch-when="lower">HOUSE</span> <span ng-switch-when="upper">SENATE</span> </dd> <dd ng-switch="repinfo.party">{{repinfo.first_name}} {{repinfo.last_name}} <span ng-switch-when="Democratic">Democrat</span> <span ng-switch-when="Republican">Republican</span> </dd> <dl ng-repeat="office in repinfo.offices"> <dd>Ph: <a href="tel:+1{{office.phone}}">{{office.phone}}</a></dd> <span ng-show="contactDetails"> <dd ng-if="office.fax">Fx: {{office.fax}}</dd> <dd ng-if="office.email">email: {{office.email}}</dd> <p></p> <dd> {{office.name}}</dd> <dd>Address: {{office.address}}</dd> </span> <dl ng-repeat="role in repinfo.roles" ng-show="$first"> <dd>Term of Service: {{role.term | limitTo:4}} - {{role.term | limitTo:-4}}</dd> </dl> </dl> </dl> </div> </div> <div class="container-fluid" ng-show="IsVisible"> <div class="row is-flex"> <div class="col-sm-12 col-md-6"> <span>Show More Contact Details: <input type="checkbox" ng-model="contactDetails"></span> </div> <div class="call col-sm-12 col-md-6">You can call your reps by simply clicking on the phone numbers! </div> </div> </div> </div> <!--End RepSearch//////////////////////////--> <!--End RepSearch//////////////////////////--> <!--Start RepSearchFED//////////////////////////--> <!--Start RepSearchFED//////////////////////////--> <div ng-show="IsVisible" class="container-fluid" id="fedreps"> <div class="row is-flex"> <h1 class="headertext">Your FED Reps</h1> <!--{{repdata|json}}--> <div ng-init="repsearchfed" class="container"> <dl class="col-sm-6 col-md-4 col-lg-4 reps" ng-repeat="repinfofed in repdata.results"> <dd><img class="img-responsive" ng-src="https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/225x275/{{repinfofed.bioguide_id}}.jpg"> </dd> <dd>{{repinfofed.chamber | uppercase}}</dd> <dd ng-switch="repinfofed.party">{{repinfofed.first_name}} {{repinfofed.last_name}} <span ng-switch-when="D">Democrat</span> <span ng-switch-when="R">Republican</span> </dd> <dd>Ph: <a href="tel:+1{{repinfofed.phone}}">{{repinfofed.phone}}</a></dd> <span ng-show="contactDetails"> <dd ng-if="repinfofed.fax">Fx: {{repinfofed.fax}}</dd> <dd ng-if="repinfofed.oc_email">email: {{repinfofed.oc_email}}</dd> <p></p> <dd>{{repinfofed.office}}</dd> </span> <dd>Term of Service {{repinfofed.term_start}}, {{repinfofed.term_end}} </dd> </dl> </div> </div> <div class="container-fluid" ng-show="IsVisible"> <div class="row is-flex"> <div class="col-sm-12 col-md-6"> <span>Show More Contact Details: <input type="checkbox" ng-model="contactDetails"></span> </div> <div class="call col-sm-12 col-md-6">You can call your reps by simply clicking on the phone numbers! </div> </div> </div> </div> <!--End RepSearchFED//////////////////////////--> <!--End RepSearchFED//////////////////////////--> <div class="row marketing"> <!-- Start SocialShare Buttons ////////////////////////////////--> <!-- Start SocialShare Buttons ////////////////////////////////--> <div class="sidebar"> <strong>Share this website!</strong> <p></p> <!-- Start Facebook Share ////////////////////////////////--> <button class="socialbutton" socialshare socialshare-provider="facebook" socialshare-type="share" socialshare-via="145634995501895" socialshare-media="http://imgur.com/a/HKHL3" socialshare-quote="It only takes a few minutes." socialshare-hashtags="#MJG, #ourgovs.com" socialshare-title="This is Our Government" socialshare-mobileiframe="true" socialshare-caption="Calling our Legislators is ann easy way to help keep our country on track" socialshare-url="http://ourgovs.com" socialshare-popup-height="300" socialshare-popup-width="400" socialshare-trigger="click"><img ng-src="images/Facebook.252ba2ed.png"> </button> <!-- Start Facebook Share ////////////////////////////////--> <!-- Start Twitter Share ////////////////////////////////--> <button class="socialbutton" socialshare socialshare-provider="twitter" socialshare-hashtags="ourgovs.com, reps, congress" socialshare-via="twitter" socialshare-text="{{test.testValue}}" socialshare-url="http://ourgovs.com" socialshare-popup-height="300" socialshare-popup-width="400" socialshare-trigger="click"><img ng-src="images/Twitter.72736a69.png"> </button> <!-- End Twitter Share ////////////////////////////////--> <!-- Start LinkedIn Share ////////////////////////////////--> <button class="socialbutton" socialshare socialshare-provider="linkedin" socialshare-text="{{test.testValue}}" socialshare-url="http://imgur.com/a/HKHL3" socialshare-description="OurGovs.com will tell you who your repesenatives are" socialshare-source="OurGovs.com" socialshare-popup-height="300" socialshare-popup-width="400" socialshare-trigger="click"> <img ng-src="images/LinkedIn.8435861c.png"> </button> <button class="socialbutton" socialshare socialshare-provider="email" socialshare-body="Hello! http://ourgovs.com" socialshare-to="test@test.ing" socialshare-cc="test@test.ing" socialshare-media="https://www.google.it/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" socialshare-subject="Very important email" socialshare-popup-height="300" socialshare-popup-width="400"> <img ng-src="images/Email.158e8e6c.png"> </button> </div> <!-- End LinkedIn Share ////////////////////////////////--> <!-- End SocialShare Buttons ////////////////////////////////--> <!-- End SocialShare Buttons ////////////////////////////////--> </div> </body>')}]);