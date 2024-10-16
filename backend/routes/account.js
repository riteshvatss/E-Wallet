const express=require("express");
const router=express.Router();
const {User,Account} =require("../db/index");
const {authMiddleware}=require("../middleware/randomm");
 
    //for getting the balance of account
    router.get("/balance",authMiddleware,async(req,res)=>{
        const username=req.body.username;
        const currUser=await User.findOne({username});
        const userId=currUser._id;
    
        const currAcc=await Account.findById({userId});
        res.json({Your_Balance:currAcc.balance})
    
    
        });
    
        //transferring the fund from one acc to other
        router.post("/transfer",authMiddleware,async(req,res)=>{
            

         //session in mongoose helps you if their is any error in between or bcs of any reason process doesnt completed
         //so the so all in between process that is completed will come back to earlier state
         //its like if the amout if subtracted from the account and doesnt add in the other account
         //so becs of session their will be no changes   
         const session=await mongoose.startSession();
         const {amount,to}=req.body;
         const account=await Account.findOne({userId:req,userId}).session(session);
    
         if(!account||account.balance<amount){
            return res.status(400).json({
                msg:"Insufficient Balance"
            });
         }
    
         const toAccount=await Account.findOne({userId:to}).session(session);
         
         if(!toAccount){
            await session.abortTransaction();
            return res.status(400).json({
                msg:"Inva;id Account"
            });
         }
         await Account.updateOne({userId:req.userId},{
            $inc:{balance:-amount}
         }).session(session);
         await Account.updateOne({userId:to},{
            $inc:{balance:amount}
         }).session(session)
         await session.committransaction();
         res.json({
            msg:"Succesfully transferred"
         });
    
    
    
        });

        module.exports=router;