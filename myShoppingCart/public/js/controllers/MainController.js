'use strict';

angular.module('myApp')

    .controller('MainController', ['$scope', '$http', '$location', 'MainService', '$mdSidenav', '$mdDialog', function($scope, $http, $location, MainService, $mdSidenav, $mdDialog){

        $scope.showProducts = true;

        var productList = {};
        $scope.products = [];
        var user =  {};

        $scope.init = function (userData) {

            user = JSON.parse(userData);
            $scope.isAdmin = user.admin;

        };

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

        MainService.getProducts().then(function (products) {

            var productObjectsArray = products.data.data;

            for (var i=0; i<productObjectsArray.length; i++) {
                if(productObjectsArray[i].qty > 0 || $scope.isAdmin) {
                    $scope.products.push (productObjectsArray[i]);
                }
            }
        });

        $scope.removeProduct = function (product) {

            var productID = product._id;
            MainService.deleteProduct(productID);
            MainService.getProducts().then(function (products) {

                $scope.products = products.data.data;

            });

        };


        $scope.makeEditable = function(product) {

            product.isEditable = true;

        };

        $scope.saveProduct = function(product) {

            var productID = product._id;
            MainService.updateProduct(productID, product);
            product.isEditable = false;

        };


        $scope.cancel = function(product) {

            product.isEditable = false;

        };


        $scope.addToCart = function (product) {

            var quantityDialog = $mdDialog.prompt()
                .title('Enter quantity')
                .initialValue('1')
                .placeholder('Product Quantity')
                .ariaLabel('Product Quantity')
                .ok('Ok')
                .cancel('Cancel');

            var qty = 0;

            $mdDialog.show(quantityDialog).then(function (result) {

                qty = parseInt( result );
                var found = false;
                for(var prodId in productList) {

                    var prod = productList[prodId];
                    if (prodId === product._id) {
                        prod.orderedQuantity += qty;
                        found = true;
                        break;
                    }
                }

                if (!found)
                {
                    var prod = {};
                    prod._id = product._id;
                    prod.title = product.title;
                    prod.description = product.description;
                    prod.price = product.price;
                    prod.image = product.image;
                    prod.qty = product.qty;
                    prod.orderedQuantity = qty;
                    productList[prod._id] = prod;

                    var count = document.getElementById("cartCount").value;
                    count++;
                    document.getElementById("cartCount").value = count;
                }
            })

        };
        
        
        $scope.checkout = function () {

            for (var prodId in productList)
            {
                var product = productList[prodId];
                var prod = {};
                prod._id = product._id;
                prod.title = product.title;
                prod.description = product.description;
                prod.image = product.image;
                prod.price = product.price;
                var quantity = product.qty - product.orderedQuantity;
                if (quantity < 0) {
                    quantity = 0;
                }
                prod.qty = quantity;

                MainService.updateProduct(prod._id, prod);

                console.log(prod._id+" "+prod);

                MainService.getProducts().then(function (products) {

                    $scope.products = products.data.data;

                });
            }

            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Your items have been checked out!')
                    .textContent('Thank you for shopping with us.')
                    .ariaLabel('Checkout')
                    .ok('OK')
            );

        };


    }]);

