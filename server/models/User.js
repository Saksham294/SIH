const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please enter a name"],
    },
    avatar: {
        public_id: String,
        url: String,
      },
      visited_items:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }], 
    email:{
        type:String,
        required: [true, "Please enter an email"],
        unique: [true, "Email already exists"],
    },
    password:{
        type:String,
        required: [true, "Please enter a password"],
    },
    city:{
        type:String,
        required: [true, "Please enter a city"],
    },
    itemsBought:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }]

})

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10)
    }
  
    next()
  })

  userSchema.methods.getJWTToken=function(){
    return jwt.sign({_id:this._id},process.env.JWTKEY,
        {expiresIn:"5d"})
}
userSchema.methods.comparePassword=async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}



module.exports=mongoose.model("User",userSchema)