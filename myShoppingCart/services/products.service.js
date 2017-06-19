var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;

var products = require('../models/products.model').Products;

//////////////////////////
// Export Utilities
//////////////////////////

module.exports ={

    getProducts: function (callback) {

        var query = {
            is_displayed: true
        };

        products.find(query, callback);

    },

    addProduct : function (product, callback) {

        var query = {
            title : product.title,
            description : product.description,
            price : product.price,
            qty : product.qty,
            is_displayed: true
        };

        products.create(query, callback);

    },

    updateProduct : function (productID, product, callback) {


        var query = {
            _id: productID
        };

        products.update(query, {
            $set: {
                title: product.title,
                description: product.description,
                price: product.price,
                qty: product.qty
            }
        }, callback)

    },

    deleteProduct: function (productID, callback) {

        var query = {
            _id : productID
        };


        products.update(query, {$set:{is_displayed:false}}, callback);

    }


};
