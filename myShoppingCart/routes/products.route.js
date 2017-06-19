///////////////////////
// Require
///////////////////////

var express = require('express');
var router = express.Router();
var mongoose  = require('mongoose');
var config = require('../config/dev.config.json');
var products = require('../services/products.service');

///////////////////////
// Routes
///////////////////////


///// Multiple Product Routes ////

    router.get('/', function(req, res, next) {

        products.getProducts(function (err, products) {
           if(err) {
               throw err;
           }

           res.json({
              href:req.hostname + ":" + config.port + req.originalUrl,
              data:products
           });

        })

    });

    router.post('/', function (req, res, next) {

        var product = req.body;

        products.addProduct(product, function (err, product) {
            if(err) {
                throw err;
            }

            res.json({
                href:req.hostname + ":" + config.port + req.originalUrl,
                data:product
            });
        })

    });

///// Single Product Routes ////

    router.patch('/:ID', function (req, res, next) {

        var productId = req.params.ID;
        var product = req.body;


        products.updateProduct(productId, product, function (err, product) {
            if(err) {
                throw err;
            }

            res.json({
                href:req.hostname + ":" + config.port + req.originalUrl,
                data:product
            });
        })

    });


    router.delete('/:ID', function (req, res, next) {

        var productId = req.params.ID;

        products.deleteProduct(productId, function (err, product) {
            if(err) {
                throw err;
            }


            res.json({
                href:req.hostname + ":" + config.port + req.originalUrl,
                data:product
            });

        })


    });


module.exports = router;
