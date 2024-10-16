const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://<username><password>");
const userSchema=new mongoose.Schema({
    //in this your are defining it more depth
    username:{
        type:String,
        

    },
    firstName:{
        type:String,
       
  
    },
    lastName:{
        type:String,
     
    },
    password:{
        type:String,
      


    }
});
const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
});
const Account=mongoose.model('Account',accountSchema);
const User=mongoose.model('User',userSchema);
module.exports={
    User,
    Account
};
