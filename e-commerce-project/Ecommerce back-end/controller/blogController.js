const Blog = require('../models/blogModel');
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

const createBlog = asyncHandler(
    async(req,res)=>{
        try {
            const newBlog = await Blog.create(req.body)
            res.json(newBlog)
        } catch (error) {
            throw new Error(error)
        }
    }
)

const updateBlog = asyncHandler(
    async(req,res)=>{
        try {
            const {id} = req.params;
            const updateBlog = await Blog.findByIdAndUpdate(id,req.body,{new:true});
            res.json(updateBlog)
        } catch (error) {
            throw new Error(error)
        }
    }
)

const getBlog = asyncHandler(
    async(req,res)=>{
        try {
            const {id} = req.params;
            const updateBlog = await Blog.findById(id);
            await Blog.findByIdAndUpdate(id,
                {
                    $inc:{totalViews:1}
                },
                {
                    new:true
                })
            res.json(updateBlog)
        } catch (error) {
            throw new Error(error)
        }
    }
)

const getAllBlogs = asyncHandler(
    async(req,res)=>{
        try {
            const blogs = await Blog.find();
            res.json(blogs)
        } catch (error) {
            throw new Error(error)
        }
    }
)

const deleteBlog = asyncHandler(
    async(req,res)=>{
        try {
            const {id} = req.params;
            const deletedBlog = await Blog.findByIdAndDelete(id);
            res.json(deletedBlog)
        } catch (error) {
            throw new Error(error)
        }
    }
)

module.exports = {createBlog,updateBlog,getBlog,getAllBlogs,deleteBlog}