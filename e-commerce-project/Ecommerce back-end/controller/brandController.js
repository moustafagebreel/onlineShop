const Brand = require('../models/brandModel');
const asyncHandler = require('express-async-handler');
const validateMongodbId = require("../utils/validateMongoDb");

const createBrand = asyncHandler(
    async(req,res)=>{
        try {
            const newBrand = await Brand.create(req.body)
            res.json(newBrand)
        } catch (error) {
            throw new Error(error)
        }
        
    }
)

const updateBrand = asyncHandler(
    async(req,res)=>{
        try {
            const {id} = req.params;
            validateMongodbId(id);
            const updatedCat = await Brand.findByIdAndUpdate(id,req.body,{
                new:true
            })
            res.json(updatedCat)
        } catch (error) {
            throw new Error(error)
        }
        
    }
)

const deleteBrand = asyncHandler(
    async(req,res)=>{
        try {
            const {id} = req.params;
            validateMongodbId(id);
            const deletedCat = await Brand.findByIdAndDelete(id)
            res.json(deletedCat)
        } catch (error) {
            throw new Error(error)
        }
        
    }
)

const getBrand = asyncHandler(
    async(req,res)=>{
        try {
            const {id} = req.params;
            validateMongodbId(id);
            const Brand = await Brand.findById(id)
            res.json(Brand)
        } catch (error) {
            throw new Error(error)
        }
        
    }
)

const getAllBrand = asyncHandler(
    async(req,res)=>{
        try {
            const categories = await Brand.find();
            res.json(categories)
        } catch (error) {
            throw new Error(error)
        }   
    }
)

module.exports = {createBrand,updateBrand,deleteBrand,getBrand,getAllBrand}