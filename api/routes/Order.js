const order = require("../models/order");
const { 
    verifyToken,
    verifyTokenAndAuthorization,
     verifyTokenAndAdmin
     } = require("./verifyToken");
const router=require("express").Router();

//CREATE

router.post("/", verifyToken,async (req,res)=>{
    const neworder = new order(req.body)
    
    try{
    const savedorder = await neworder.save();
    res.status(200).json(savedorder);
    
    }catch(err){
    
    res.status(500).json(err);
    }
    
    });

    //UPDATE 

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
          
    try {
        const updatedorder = await order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );

        res.status(200).json(updatedorder);
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
await order.findByIdAndDelete(req.params.id)
res.status(200).json("order has been deleted...")
    }catch(err){
        res.status(500).json(err)
    }
});

//GET USER ORDERS
router.get("/find/:userId",verifyTokenAndAuthorization,async(req,res)=>{
    try{
const orders = await order.find({userId: req.params.userId});

    res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
});

//GET ALL 

router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try{
const orderss=await order.find()
res.status(200).json(orders)
    }catch(err){
        res.status(500).json(err)
    }
});

// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await order.aggregate([
            {
                $match: { createdAt: { $gte: previousMonth } }
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount"
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }
            }
        ]);

        res.status(200).json(income);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
