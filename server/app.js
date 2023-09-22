const express = require("express")
const app = express()
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")
const plantRoutes=require("./routes/plantRoutes")

var cors = require('cors');
var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.json({
    limit: "50mb"
}))
app.use(cors());

app.use("/api/", userRoutes)
app.use("/api/", productRoutes)
app.use("/api/",cartRoutes)
app.use("/api/",plantRoutes)




module.exports = app 