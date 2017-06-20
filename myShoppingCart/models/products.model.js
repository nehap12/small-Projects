//////////////////////////
// Requires
//////////////////////////

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.Types.ObjectId;


//////////////////////////
// Schema
//////////////////////////

var productsSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    is_displayed: {
        type: Boolean,
        required: true
    },
    editable: {
        type: Boolean,
        required: true
    }
});


//////////////////////////
// Export Schema
//////////////////////////

var Products = mongoose.model('Products',productsSchema,'products');
module.exports.Products = Products;
