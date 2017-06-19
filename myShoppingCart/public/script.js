'use strict';

var app = angular.module('myApp', ['ngRoute','ngMaterial','ngMessages']);

app.config(function ($mdThemingProvider) {

    $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('blue-grey');
});




/*


app.config(function($routeProvider) {

$routeProvider
    .when('/', {
        templateUrl : './views/main.html',
        controller: 'ListController'
    })
    .when('/suggestedStory/:ID', {
        templateUrl : './views/view.html',
        controller : 'ViewController'
    })
    .when('/startstory', {
        templateUrl : './views/startstory.html',
        controller : 'ViewController'
    })
});
*/



