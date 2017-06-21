'use strict';

var app = angular.module('myApp', ['ngRoute','ngMaterial','ngMessages']);

app.config(function ($mdThemingProvider) {

    $mdThemingProvider.theme('default')
        .primaryPalette('teal')
        .accentPalette('blue-grey');

});




