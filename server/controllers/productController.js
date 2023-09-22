const Product = require("../models/Product")
const cloudinary = require("cloudinary")
const User=require("../models/User")
const Plant=require("../models/Plant")


exports.postProduct = async (req, res) => {
    try {
        const { name, image, brand, price, mainCategory, subCategory, description, rating } = req.body
        let product = await Product.findOne({ name })
        if (product) {
            return res.status(400).json({
                success: false,
                message: "Product already exists"
            })
        }

        const myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "productImages"
        })
        product = await Product.create({
            name,
            image: {
                public_id: myCloud.public_id, url: myCloud.secure_url
            },
            brand,
            price,
            mainCategory,
            subCategory,
            description,
            rating
        })

        res.status(200).json({
            success: true,
            message: "Product posted successfully",
            product
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.postPlant = async (req, res) => {
    try {

        const { name, image, price, description, hindiName } = req.body
        let plant=await Plant.findOne({ name })
        if (plant) {
            return res.status(400).json({
                success: false,
                message: "Plant already exists"
            })
        }
        plant = await Plant.create({
            name,
            image,
            price,
            description,
            hindiName
        })
        res.status(200).json({
            success: true,
            message: "Plant posted successfully",
            plant
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.getAllPlants=async(req,res)=>{
    try {

        const plants=await Plant.find({})
        res.status(200).json({
            success: true,
            plants
        })
        

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.getPlantById=async(req,res)=>{
    try {
        const plant=await Plant.findById(req.params.id)
        res.status(200).json({
            success: true,
            plant
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json({
            success: true,
            product
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.incrementVisitCount=async(req, res) => {
    try {
        const productId=req.params.id;
        const userId=req.body.userId;
        console.log('userId:',userId);
        console.log('productId:',productId);

        // Find the product by ID and update its visitCount
          let product=await Product.findByIdAndUpdate(
            productId,
            { $inc: { viewCount: 1 } }, 
            
            
            
            // Increment visitCount by 1
            { new: true } // Return the updated product
        );
        
       product=await Product.findByIdAndUpdate(
            productId,
            {$addToSet:{visitedBy:userId}},
            // Increment visitCount by 1
            { new: true } // Return the updated product
        );



        await User.findByIdAndUpdate(
            userId,
            { $addToSet:{visited_items:productId } }, // Add to set to ensure no duplicates
            { new: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

exports.purchaseProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        const buyer = await User.findById(req.user.id)
        //check if product is already bought by same user then don't add redundant id in array
        if (product.boughtBy.includes(buyer._id)) {
            return res.status(200).json({
                success: true,
                message: "Item Bought",
            });
        }
        product.boughtBy.push(buyer._id);
        buyer.itemsBought.push(product)

        await buyer.save()
        await product.save()
        res.status(200).json({
            product,
            success: true,
            message: "Item Bought",
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getHighRatedProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ rating: -1 }).limit(4)

        res.status(200).json({
            success: true,
            products
        })
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.clearBoughtBy = async (req, res) => {
    try {
        const products=await Product.find({})
        products.forEach(async(product)=>{
            product.boughtBy=[]
            await product.save()
        })

        res.status(200).json({
            success: true,
            message: "BoughtBy cleared"
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.clearVisitedByandViewCount = async (req, res) => {
    try {
        const products=await Product.find({})
        products.forEach(async(product)=>{
            product.visitedBy=[]
            product.viewCount=0
            await product.save()
        })
        res.status(200).json({
            success: true,
            message: "VisitedBy cleared"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}