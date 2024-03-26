import express from 'express';
import {
     registerUser ,
     authUser ,
     getUserById,
     createUserAccount, 
     logoutUser,
     updateUserProfile,
     addAccount,
     search
} from '../controllers/userControllers.js';

import {
    protect,
    checkUser,
    userExists
} from '../middleware/protect.js';

const router = express.Router();

router.post('/signup', userExists, registerUser);
router.post('./login', authUser);
router.post('./createProfile', createUserAccount);
router.post('./add', addAccount);
router.post('./logout',logoutUser);
router.put('./update', updateUserProfile);
router.get('/:id',protect, checkUser, getUserById);
router.get('', search );