const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const productSchema = new Schema({
    title : {
        type : 'String',
        required : true,
    },
    imageUrl : {
        type : 'String',
        required : false,
    },
    price : {
        type : 'Number',
        required : true,
    },
    category : {
        type : 'String',
        required : true,
    },
    description : {
        type : 'String',
        required : false,
    }, 
    display : {
        type : 'String',
        required : false,
    }, 
    camera : {
        type : 'String',
        required : false,
    }, 
}
,
    { timestamps : true }
);

 module.exports = mongoose.model('Product', productSchema);