const express = require('express');
const router = express.Router();
const {createUser, userLogin, getAllUsers, getUser, deleteUser, updatedUser, blockUser, unblockUser, handleRefreshToken, userLogout, adminLogin, getWishlist, saveAddress} =require('../controller/userController');
const { authMiddleware, isAdmin } = require('../middleware/authHandler');

router.post('/register',createUser)
router.post('/login',userLogin);
router.post('/admin-login',adminLogin);
router.get('/users',authMiddleware,isAdmin,getAllUsers)
router.get('/refresh-token',handleRefreshToken)
router.get('/logout',userLogout)
router.get('/wishlist',authMiddleware,getWishlist)

router.get('/:id',authMiddleware,isAdmin,getUser)
router.delete('/:id',deleteUser)
router.put('/edit-user',authMiddleware,updatedUser)
router.put('/save-address',authMiddleware,saveAddress)
router.put('/block-user/:id',authMiddleware,isAdmin,blockUser)
router.put('/unblock-user/:id',authMiddleware,isAdmin,unblockUser)


module.exports = router;