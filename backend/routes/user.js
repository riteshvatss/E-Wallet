const express=require("express");
const router=express.Router();
const zod=require("zod");
const jwt = require('jsonwebtoken');
const { User,Account } =require("../db/index");
const JWT_SECRET =require("../config");
const {authMiddleware} =require("../middleware/randomm");

//defining the schema for zod verification
const signupSchema=zod.object({
    username:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
});

router.post("/signup",async(req,res)=>{

    //its taking whole body as object
    const body=req.body;
    console.log(body);

    const {success}=signupSchema.safeParse(body);
    
    //this is for checking the input
    if(!success){
        console.log(success);
        return res.status(411).json({
            msg:"wrong credentials"
        })
    }

    //if user exists then sk to change
    const userExists=User.findOne({
        username:body.username
    })

    if(userExists._id){
        return res.json({
            msg:"User already exist"
        })
    }
    
    const currUser=await User.create({
        username:body.username,
        firstName:body.firstName,
        lastName:body.lastName,
        password:body.password
    })
    const currId=currUser._id;
    const token=jwt.sign({
        currId
    },JWT_SECRET)

    const userbalance=Math.floor(Math.random() * 1000);

    //adding account of user 
    await Account.create({
        userId:currId,
        balance:userbalance
    })

    res.json({
        msg:"User created Succesfully",userToken:token
    })
});


//for sign in purposes
router.post("/signin",(req,res)=>{
    const username=req.body.username;
    const password=req.nody.password;

    User.findOne({
        username
    })
    .then((values)=>{
        const userId=values._id;
        const token =jwt.sign({userId},JWT_SECRET);
        res.json({msg:"Sign in Succesfully",usertoken:token});
    })
    .catch((err)=>{
        res.send(err);
    })
});

const updateSchema=({
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
    password:zod.string().optional()
});

//for updating the firstname and last name
router.put("/",authMiddleware,async(req,res)=>{
        const userBody=req.body;
        const {success}=updateSchema.safeParse(userBody);
        if(!success){
            res.status(411).json({
                msg:"wrong input credentials"
            })
        }
        await User.updateOne({id:req.userId},{
            userBody
        })
        res.json({
            msg:"update Successfully"
        })


});


 

//exporting the router module
module.exports=router;