'use strict';

angular.module('myApp')

    .constant("baseURL","http://localhost:3000/")
    .service('MainService', ['$http', 'baseURL', function($http, baseURL) {

        this.getProducts = function () {

           return $http.get(baseURL+'products');

        };

        this.addProduct = function (product) {

            $http({
                url: baseURL+'products',
                method: 'POST',
                data: product,
                headers: {'Content-Type': 'application/json'}
            }).then(function (res) {
                console.log(res.data);
            }, function (res) {
                console.log(error);
            });

        };

        this.updateProduct = function (productID, product) {

            $http({
                url: baseURL+'products/'+productID,
                method: 'PATCH',
                data: product,
                headers: {'Content-Type': 'application/json'}
            }).then(function (res) {
                console.log(res.data);
            }, function (res) {
                console.log(error);
            });

        };

        this.deleteProduct = function (productID) {

            $http({
                url: baseURL+'products/'+productID,
                method: 'DELETE'
            }).then(function (res) {
                console.log(res.data);
            }, function (error) {
                console.log(error);
            });

        };

        var msg;
        this.sendList = function (message) {

            msg = message;
            console.log("Message from service: "+msg);
        };

        this.getList = function () {

            return msg;

        };

}]);