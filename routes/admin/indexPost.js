const express = require('express');
const passport = require('passport');
const router = express.Router();
const {
    authenticationMiddleWare,
    isGrantedPrivilledged,
    isRole,
    isBlockAccess
} = require("./../../middleware/isAuthenticated");
const adminController = require('./../../controllers/admin/post.controllers.js');

/* LOGOUT */
router.get('/logout', [authenticationMiddleWare], adminController.Logout);

// Update Profile
router.post('/profile', [authenticationMiddleWare, isGrantedPrivilledged, isBlockAccess], adminController.updateProfile);

// Users Account Add
router.post('/add/user', [authenticationMiddleWare, isGrantedPrivilledged, isBlockAccess], adminController.addUser);

// Users Account Edit
router.post('/edit/user/:userID', [authenticationMiddleWare, isGrantedPrivilledged, isBlockAccess, isRole], adminController.updateUser);

// Delete Users
router.get('/delete/user/:userID', [authenticationMiddleWare, isGrantedPrivilledged, isBlockAccess, isRole], adminController.deleteUser);

// Device Audit
router.get('/device/:deviceUniqueID/:status', [authenticationMiddleWare, isGrantedPrivilledged, isBlockAccess], adminController.blockOrAllowDevice);

// Encryption
router.post('/file-encryption', [authenticationMiddleWare, isGrantedPrivilledged, isBlockAccess], adminController.addEncryption);

// Add User to Encryption
router.post('/add/user/file-encryption/:textUniqueID', [authenticationMiddleWare, isGrantedPrivilledged, isBlockAccess], adminController.grantUserFileAccess);

// Delete User from Encryption
router.get('/delete/user/:userID/file-encryption/:textUniqueID', [authenticationMiddleWare, isGrantedPrivilledged, isBlockAccess], adminController.denyUserFileAccess);

// Delete Encryption Data
router.get('/delete/file-encryption/:textUniqueID', [authenticationMiddleWare, isGrantedPrivilledged, isBlockAccess], adminController.deleteEncryption);


// PASSPORT
passport.serializeUser(function (admin_id, done) {
    done(null, admin_id);
});

passport.deserializeUser(function (admin_id, done) {
    done(null, admin_id);
});

module.exports = router;
