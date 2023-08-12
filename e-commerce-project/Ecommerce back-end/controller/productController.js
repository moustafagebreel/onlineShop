const Product = require('../models/productModel')
const User = require('../models/userModel')
const asyncHandler = require("express-async-handler");
const slugify = require('slugify');
const validateMongodbId = require("../utils/validateMongoDb");
 
const createProduct = asyncHandler(async(req,res)=>{
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        const newProduct = await Product.create(req.body)
        res.json(newProduct)
    } catch (error) {
        throw new Error(error)
    }
});

const updateProduct = asyncHandler(async(req,res)=>{
    try {
        console.log(req.params)
        const {id} = req.params;
        validateMongodbId(id);
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        const newProduct = await Product.findByIdAndUpdate(id,req.body)
        
        res.json(newProduct)
    } catch (error) {
        throw new Error(error)
    }
});

const deleteProduct = asyncHandler(async(req,res)=>{
    const { id } = req.params;
  
    try {
      await Product.deleteOne({ _id: id });
      res.json({ message: `Deleted Product with id: ${id}` });
    } catch (error) {
      throw new Error(error);
    }
});


const getProduct = asyncHandler(async(req,res)=>{
    const {id}= req.params
    
    try {
        const product = await Product.findById(id)
        res.json(product)
    } catch (error) {
        throw new Error(error)
    }
});


const getAllProducts = asyncHandler(
    async(req,res)=>{
        try {

            //filtering 

            const queryObject = {...req.query};
            const removeFields = ['page','sort','limit','fields'];
            removeFields.forEach((el)=>delete queryObject[el]);
            let queryString = JSON.stringify(queryObject);
            queryString=queryString.replace(/\b(gt|gte|lt|lte)\b/g,(match)=>`$${match}`)
            let query =  Product.find(JSON.parse(queryString));
            
            //Sorting
            if(req.query.sort){
                const sortBy = req.query.sort.split(',').join(' ');
                query = query.sort(sortBy)
            }else(
                query = query.sort("createdAt")
            )

            //limiting 
            if(req.query.fields){
                const fields = req.query.fields.split(',').join(' ');
                query= query.select(fields)
            }else{
                query= query.select('-__v')
            }

            //Pagianation 
            const page = req.query.page;
            const limit = req.query.limit;
            const skip = (page-1)*limit;
            query=query.skip(skip).limit(limit);
            if(req.query.page){
                const productCount = await Product.countDocuments();
                if(skip>=productCount){
                    throw new Error("This page does not exit")
                }
            }

            const products = await query;
        res.json(products);
        } catch (error) {
            throw new Error(error)
        }
        
    }
);

const addToWishlist = asyncHandler(
    async (req,res)=>{
        const {_id} = req.user;
        const {productId} = req.body
        try {
            const user = await User.findById(_id)
            const alreadyAdded = user.wishlist.find((id)=>id.toString()===productId)
            if(alreadyAdded){
                let user =await User.findByIdAndUpdate(_id,{
                    $pull:{wishlist: productId}
                },
                {
                    new:true
                })
                res.json(user)
            }else{
                let user =await User.findByIdAndUpdate(_id,{
                    $push:{wishlist: productId}
                },
                {
                    new:true
                })
                res.json(user)
              }   
        } catch (error) {
            throw new Error(error)
        }
    }
)

const rating = asyncHandler(
    async(req,res)=>{
        const {_id}= req.user;
        const{star,productId}=req.body;
        
        try {
            const product = await Product.findById(productId);
            console.log(product)
            let alreadyRated = product.rating.find((userId)=>userId.postedby.toString()===_id.toString());
            if(alreadyRated){
                const updateRating = await Product.updateOne(
                {
                    rating:{$elemMatch:alreadyRated}
                },
                {
                    $set:{"rating.$.star":star}
                },
                {
                    new:true
                });
            
            }else{
                const rateProduct =await Product.findByIdAndUpdate(productId,
                    {$push:{
                        rating:{
                            star:star,
                            postedby:_id
                        }
                    }})

                  

            }

            const getAllratings = await Product.findById(productId);
            const totalRatingNo = getAllratings.rating.length;
            let ratingSum = getAllratings.rating.map((item)=>item.star).reduce((prev,curr)=>prev+curr,0);
            let actualRating = Math.round((ratingSum/totalRatingNo)*2)/2;
            const finalProduct=await Product.findByIdAndUpdate(productId,
                {
                    totalRating:actualRating
                },
                {new:true}
                )
                res.json(finalProduct)
        } catch (error) {
            throw new Error(error)
        }
    }
)


module.exports = {createProduct,getProduct,getAllProducts,updateProduct,deleteProduct,addToWishlist,rating}