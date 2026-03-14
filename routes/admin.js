const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/login', adminController.loginForm);
router.post('/login', adminController.login);

// Protected routes
router.use(authMiddleware.isAuthenticated);

router.get('/dashboard', adminController.dashboard);
router.get('/messages', adminController.messages);
router.post('/messages/:id/delete', adminController.deleteMessage);
router.get('/blog', adminController.blogList);
router.get('/blog/create', adminController.blogCreateForm);
router.post('/blog/create', upload.single('featured_image'), adminController.blogCreate);
router.get('/blog/edit/:id', adminController.blogEditForm);
router.post('/blog/edit/:id', upload.single('featured_image'), adminController.blogUpdate);
router.post('/blog/delete/:id', adminController.blogDelete);
router.get('/logout', adminController.logout);
router.get('/bookings', adminController.bookings);
router.post('/bookings/:id/update-status', adminController.updateBookingStatus);
router.post('/bookings/:id/delete', adminController.deleteBooking);
module.exports = router;