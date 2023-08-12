const express = require('express');
const router = express.Router();
const { isAdmin, authMiddleware } = require('../middleware/authHandler');
const { createCategory, updateCategory, deleteCategory, getAllCategory, getCategory } = require('../controller/categoryController');

router.post('/',authMiddleware,isAdmin,createCategory);
router.put('/:id',authMiddleware,isAdmin,updateCategory);
router.delete('/:id',authMiddleware,isAdmin,deleteCategory);
router.get('/',getAllCategory);
router.get('/:id',getCategory)



module.exports = router;