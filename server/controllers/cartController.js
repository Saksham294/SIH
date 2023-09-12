const Cart = require('../models/Cart');
const User=require("../models/User")
const Product = require('../models/Product');

exports.get_cart_items = async (req,res) => {
    const userId = req.params.id;
    try{
        let cart = await Cart.findOne({userId});
        if(cart && cart.items.length>0){
            res.status(200).json({
                cart,
                message: "Cart items retrieved successfully"
            })
        }
        else{
            res.send(null);
        }
    }
    catch(err){
        console.log(err);
        res.status(400).send("Something went wrong");
    }
}

exports.add_cart_item = async (req, res) => {
    const userId = req.params.id;
    const { productId } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        let item = await Product.findOne({ _id: productId });
        if (!item) {
            return res.status(404).send('Item not found!');
        }

        const name = item.name;
        let boughtBy = [];
        let brand = [];
        let subCategory = [];
        const image=item.image;
        if (item.boughtBy!=undefined) {
            boughtBy = item.boughtBy;
        }

        if (item.brand) {
            brand.push(item.brand);
        }

        if (item.subCategory) {
            subCategory.push(item.subCategory);
        }
        if (cart) {
            // if cart exists for the user
            let itemIndex = cart.items.findIndex(p => p.productId == productId);

            // Check if product exists or not
            if (itemIndex > -1) {
                let productItem = cart.items[itemIndex];
                cart.items[itemIndex] = productItem;
            } else {
                cart.items.push({ productId, name,image, boughtBy, brand, subCategory  });
            }
            cart = await cart.save();
            return res.status(200).json({
                cart,
                message: "Item added to cart successfully"
            });
        } else {
            // no cart exists, create one
            const newCart = await Cart.create({
                userId,
                items: [{  }],
            });
            console.log(newCart);
            return res.status(201).json({newCart, message: "Item added to cart successfully"});
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};


exports.delete_item = async (req, res) => {
    const userId = req.params.id;
    const prodId = req.params.productId;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        let itemIndex = cart.items.findIndex(p => p.productId == prodId);
        if (itemIndex > -1) {
            cart.items.splice(itemIndex, 1);
        }

        cart = await cart.save();
        return res.status(200).json({
            cart,
            message: "Item deleted successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            message: "Something went wrong"
        });
    }
};
