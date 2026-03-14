const Admin = require('../models/Admin');
const Contact = require('../models/Contact');
const BlogPost = require('../models/BlogPost');
const Booking = require('../models/Booking');

// ========== AUTH ==========

exports.loginForm = (req, res) => {
    if (req.session.user) {
        return res.redirect('/admin/dashboard');
    }
    res.render('admin/login', { title: 'Admin Login', layout: false });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin) {
            return res.render('admin/login', { error: 'Invalid credentials', layout: false });
        }
        const valid = await Admin.verifyPassword(password, admin.passwordHash);
        if (!valid) {
            return res.render('admin/login', { error: 'Invalid credentials', layout: false });
        }
        req.session.user = { id: admin._id, username: admin.username };
        res.redirect('/admin/dashboard');
    } catch (err) {
        console.error(err);
        res.render('admin/login', { error: 'An error occurred', layout: false });
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
};

// ========== DASHBOARD ==========

exports.dashboard = async (req, res) => {
    try {
        const messageCount = await Contact.countDocuments();
        const blogCount = await BlogPost.countDocuments({ published: true });
        const bookingCount = await Booking.countDocuments();
        
        const recentMessages = await Contact.find().sort({ createdAt: -1 }).limit(5);
        const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5);

        res.render('admin/dashboard', {
            title: 'Dashboard',
            messageCount,
            blogCount,
            bookingCount,
            recentMessages,
            recentBookings,
            layout: 'layouts/admin'
        });
    } catch (err) {
        console.error(err);
        res.send('Error loading dashboard');
    }
};

// ========== MESSAGES ==========

exports.messages = async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.render('admin/messages', {
            title: 'Contact Messages',
            messages,
            layout: 'layouts/admin'
        });
    } catch (err) {
        console.error(err);
        res.send('Error loading messages');
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.redirect('/admin/messages');
    } catch (err) {
        console.error(err);
        res.send('Error deleting message');
    }
};

// ========== BLOG ==========

exports.blogList = async (req, res) => {
    try {
        const posts = await BlogPost.find().sort({ createdAt: -1 });
        res.render('admin/blog/index', {
            title: 'Manage Blog Posts',
            posts,
            layout: 'layouts/admin'
        });
    } catch (err) {
        console.error(err);
        res.send('Error loading blog posts');
    }
};

exports.blogCreateForm = (req, res) => {
    res.render('admin/blog/create', {
        title: 'Create Blog Post',
        layout: 'layouts/admin'
    });
};

exports.blogCreate = async (req, res) => {
    try {
        const { title, content, excerpt, author, published } = req.body;
        
        // Get uploaded file if present
        let featuredImage = '/uploads/blog/default.jpg'; // Fallback default image
        if (req.file) {
            // Convert Windows path to URL path
            featuredImage = '/uploads/blog/' + req.file.filename;
        }
        
        const newPost = new BlogPost({
            title,
            content,
            excerpt,
            featuredImage: featuredImage,
            author: author || 'JT & Sons',
            published: published === 'on'
        });
        
        await newPost.save();
        res.redirect('/admin/blog');
    } catch (err) {
        console.error(err);
        if (err.code === 11000) {
            return res.render('admin/blog/create', {
                title: 'Create Blog Post',
                error: 'A post with this title already exists.',
                layout: 'layouts/admin'
            });
        }
        res.render('admin/blog/create', {
            title: 'Create Blog Post',
            error: err.message || 'Error creating post.',
            layout: 'layouts/admin'
        });
    }
};

exports.blogEditForm = async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        if (!post) return res.redirect('/admin/blog');
        res.render('admin/blog/edit', {
            title: 'Edit Blog Post',
            post,
            layout: 'layouts/admin'
        });
    } catch (err) {
        console.error(err);
        res.redirect('/admin/blog');
    }
};

exports.blogUpdate = async (req, res) => {
    try {
        const { title, content, excerpt, author, published } = req.body;
        
        // ✅ findById + save() taaki pre('save') hook chale
        const post = await BlogPost.findById(req.params.id);
        if (!post) return res.redirect('/admin/blog');
        
        post.title = title;
        post.content = content;
        post.excerpt = excerpt;
        
        // Update image only if new file uploaded
        if (req.file) {
            post.featuredImage = '/uploads/blog/' + req.file.filename;
        }
        // Otherwise keep existing image
        
        post.author = author || 'JT & Sons';
        post.published = published === 'on';
        
        await post.save();
        
        res.redirect('/admin/blog');
    } catch (err) {
        console.error(err);
        if (err.code === 11000) {
            const post = await BlogPost.findById(req.params.id);
            return res.render('admin/blog/edit', {
                title: 'Edit Blog Post',
                post,
                error: 'This title conflicts with another post.',
                layout: 'layouts/admin'
            });
        }
        const post = await BlogPost.findById(req.params.id);
        res.render('admin/blog/edit', {
            title: 'Edit Blog Post',
            post,
            error: err.message || 'Error updating post',
            layout: 'layouts/admin'
        });
    }
};

exports.blogDelete = async (req, res) => {
    try {
        await BlogPost.findByIdAndDelete(req.params.id);
        res.redirect('/admin/blog');
    } catch (err) {
        console.error(err);
        res.redirect('/admin/blog');
    }
};

// ========== BOOKINGS ==========

exports.bookings = async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.render('admin/bookings', {
            title: 'Booking Requests',
            bookings,
            layout: 'layouts/admin'
        });
    } catch (err) {
        console.error(err);
        res.send('Error loading bookings');
    }
};

exports.updateBookingStatus = async (req, res) => {
    try {
        await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status });
        res.redirect('/admin/bookings');
    } catch (err) {
        console.error(err);
        res.redirect('/admin/bookings');
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.redirect('/admin/bookings');
    } catch (err) {
        console.error(err);
        res.redirect('/admin/bookings');
    }
};