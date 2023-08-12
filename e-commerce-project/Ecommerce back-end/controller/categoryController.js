const Category = require('../models/categoryModel');
const asyncHandler = require('express-async-handler');
const validateMongodbId = require("../utils/validateMongoDb");

const createCategory = asyncHandler(
    async(req,res)=>{
        try {
            const newCategory = await Category.create(req.body)
            res.json(newCategory)
        } catch (error) {
            throw new Error(error)
        }
        
    }
)

const updateCategory = asyncHandler(
    async(req,res)=>{
        try {
            const {id} = req.params;
            validateMongodbId(id);
            const updatedCat = await Category.findByIdAndUpdate(id,req.body,{
                new:true
            })
            res.json(updatedCat)
        } catch (error) {
            throw new Error(error)
        }
        
    }
)

const deleteCategory = asyncHandler(
    async(req,res)=>{
        try {
            const {id} = req.params;
            validateMongodbId(id);
            const deletedCat = await Category.findByIdAndDelete(id)
            res.json(deletedCat)
        } catch (error) {
            throw new Error(error)
        }
        
    }
)

const getCategory = asyncHandler(
    async(req,res)=>{
        try {
            const {id} = req.params;
            validateMongodbId(id);
            const category = await Category.findById(id)
            res.json(category)
        } catch (error) {
            throw new Error(error)
        }
        
    }
)

const getAllCategory = asyncHandler(
    async(req,res)=>{
        try {
            const categories = await Category.find();
            res.json(categories)
        } catch (error) {
            throw new Error(error)
        }   
    }
)

module.exports = {createCategory,updateCategory,deleteCategory,getCategory,getAllCategory}