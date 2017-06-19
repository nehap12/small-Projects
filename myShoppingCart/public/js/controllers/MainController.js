'use strict';

angular.module('myApp')

    .controller('MainController', ['$scope', '$http', '$location', 'MainService', '$mdSidenav', function($scope, $http, $location, MainService, $mdSidenav){

        $scope.showProducts = true;
        $scope.message = "Loading...";

        var user =  {};

        $scope.init = function (userData) {

            user = JSON.parse(userData);
            $scope.isAdmin = user.admin;

        };

        MainService.getProducts().then(function (products) {

            $scope.products = products.data.data;

        });


        $scope.openSidebar = function () {

            $mdSidenav('left').open();

        };

        $scope.closeSidebar = function () {

            $mdSidenav('left').close();

        };

        $scope.addProduct = function (product) {

            MainService.addProduct(product);
            $scope.closeSidebar();
            MainService.getProducts().then(function (products) {

                $scope.products = products.data.data;

            });

        };


        $scope.removeProduct = function (product) {

                var productID = product._id;
                MainService.deleteProduct(productID);
                MainService.getProducts().then(function (products) {

                    $scope.products = products.data.data;

                });

        };



    }]);

