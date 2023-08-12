const express = require('express');
const router = express.Router();
const { isAdmin, authMiddleware } = require('../middleware/authHandler');
const { createBrand, updateBrand, deleteBrand, getAllBrand, getBrand } = require('../controller/brandController');

router.post('/',authMiddleware,isAdmin,createBrand);
router.put('/:id',authMiddleware,isAdmin,updateBrand);
router.delete('/:id',authMiddleware,isAdmin,deleteBrand);
router.get('/',getAllBrand);
router.get('/:id',getBrand)



module.exports = router;