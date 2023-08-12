const express = require('express');
const { createBlog, updateBlog, getAllBlogs, getBlog, deleteBlog } = require('../controller/blogController');
const { authMiddleware, isAdmin } = require('../middleware/authHandler');
const router = express.Router();

router.post('/',authMiddleware,isAdmin,createBlog);
router.get('/',getAllBlogs);
router.get('/:id',getBlog);
router.put('/:id',authMiddleware,isAdmin,updateBlog);
router.delete('/:id',authMiddleware,isAdmin,deleteBlog);

module.exports= router