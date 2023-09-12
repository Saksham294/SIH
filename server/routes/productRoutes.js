const {postProduct,getAllProducts,getProductById,purchaseProduct, incrementVisitCount, getHighRatedProducts, clearBoughtBy, clearVisitedByandViewCount } = require("../controllers/productController")
const express = require("express")
const router = express.Router();
const isAuthenticated = require("../middleware/auth")


router.post("/postProduct",isAuthenticated,postProduct)
router.get("/getAllProducts",getAllProducts)
router.get("/product/:id",getProductById);
router.route("/product/buy/:id").get(isAuthenticated,purchaseProduct)
router.post("/product/:id",incrementVisitCount);
router.get("/topRated",getHighRatedProducts)
router.get("/clearBoughtBy",clearBoughtBy)
router.get("/clearVisitedBy",clearVisitedByandViewCount)



module.exports = router