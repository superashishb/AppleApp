const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const userSchema = new Schema({
    username : {
        type : 'String',
        required : true,
    },
    email : {
        type : 'String',
        required : true,
        unique : true,
    },
    password : {
        type : 'String',
        required : true,
    },
    role : {
        type : 'String',
        required : false,
    },
    resetToken : String,
    resetTokenExpiration : Date,
    cart : [
        {
            productId : {
                type : Schema.Types.ObjectId,
                ref : "Product",
                required : true,
            },
            quantity : {
                type : "Number",
                required : true,
            },
        },
    ],
    address : [
        {
            houseNo : {
                type : "Number",
                required : true,
            },
            street : {
                type : "String",
                required : true,
            },
            city : {
                type : "String",
                required : true,
            },
            pincode : {
                type : "Number",
                required : true,
            },
            contactNo : {
                type : "Number",
                required : true,
            },
        },
    ],
},
    { timestamps : true }
);

userSchema.methods.addToCart = function(prodId){
    console.log("getting prod in model");
    const existingProductIndex = this.cart.findIndex((p) => {
        return p.productId.toString() === prodId ;
    });
    const updatedCartItems = [...this.cart];
    if(existingProductIndex >= 0){
        updatedCartItems[existingProductIndex].quantity += 1;
    } else {
        updatedCartItems.push({ productId: prodId, quantity: 1});
    }
    // console.log(updatedCartItems);
    this.cart = updatedCartItems ;
    return this.save() ;
}

userSchema.methods.updateCart = function(qty, prodId){
    const existingProductIndex = this.cart.findIndex((p) => {
        return p.productId.toString() === prodId ;
    });
    const updatedCartItems = [...this.cart] ;

    updatedCartItems[existingProductIndex].quantity += qty ;
    this.cart = updatedCartItems ;
    return this.save();
};

userSchema.methods.removeFromCart = function(prodId) {
    const updatedCart = this.cart.filter((p)=> {
       return p.productId.toString() !== prodId ;
    })
    // console.log(cart) ;
    this.cart = updatedCart ;
   return this.save() ;
}

userSchema.methods.clearCart = function() {
    this.cart = [] ;
    return this.save() ;
};

userSchema.methods.setAddress = function(userAddress) {
    console.log(this.address);
    const updatedAddress = [...this.address];
    updatedAddress.push(userAddress);
    this.address = updatedAddress;
    return this.save() ;
}

 module.exports = mongoose.model('User', userSchema);

