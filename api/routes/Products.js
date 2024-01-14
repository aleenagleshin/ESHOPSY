const product = require("../models/product");
const { 
    verifyToken,
    verifyTokenAndAuthorization,
     verifyTokenAndAdmin
     } = require("./verifyToken");
const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin,async (req,res)=>{
const newProduct = new product(req.body);

try{
const savedProduct = await newProduct.save();
res.status(200).json(savedProduct);

}catch(err){

res.status(500).json(err);
}

});

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString();
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
await product.findByIdAndDelete(req.params.id)
res.status(200).json("Product has been deleted...")
    }catch(err){
        res.status(500).json(err)
    }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
    try {
        const product1 = await product.findById(req.params.id); // Change the variable name to 'product'
        res.status(200).json(product1);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL Products

router.get("/",async(req,res)=>{
    const qNew=req.query.new;
    const qCategory= req.query.Category;
    try{
        let products;
         if(qNew){
            products=await product.find().sort({createdAt: -1}).limit(1)
         }else if(qCategory){
            products=await product.find({
                categories:{
            $in: [qCategory],
            },
        });
         }else{
            products= await product.find();
         }
    res.status(200).json(products);
    }catch(err){
        res.status(500).json(err)
    }
});


module.exports=router;