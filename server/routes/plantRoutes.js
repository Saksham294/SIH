const {postPlant,getAllPlants,getPlantById,getPlantByName } = require("../controllers/productController")
const express = require("express")
const router = express.Router();
const isAuthenticated = require("../middleware/auth")


router.post("/postPlant",isAuthenticated,postPlant)
router.get("/getAllPlants",getAllPlants)
router.get("/plant/:id",getPlantById);
router.get("/plant",getPlantByName);
// router.route("/product/buy/:id").get(isAuthenticated,purchaseProduct)



module.exports = router