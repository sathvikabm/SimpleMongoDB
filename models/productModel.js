const mongoose = require('mongoose')
// timestamp is used to save when the data is saved and mofified
const productSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Please enter a product name"]
        },
        quantity:{
            type: Number,
            required: true,
            default: 0
        },
        price:{
            type: Number,
            required: true,
        },
        image:{
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
)
// This line creates a Mongoose model named "Product" based on the provided schema (productSchema)
const Product = mongoose.model('Product', productSchema);
module.exports = Product
// This line exports the "Product" model so that it can be imported and used in other parts of the application.