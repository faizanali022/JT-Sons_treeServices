require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3005;

// ========== 1. SESSION MIDDLEWARE ==========
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }
}));

// ========== 2. BODY PARSER & STATIC FILES ==========
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ========== 3. EJS SETUP ==========
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');
app.set('views', path.join(__dirname, 'views'));

// ========== 4. GLOBAL VARIABLES FOR ALL VIEWS ==========
app.locals.sitePhone = process.env.SITE_PHONE;
app.locals.siteCell = process.env.SITE_CELL;
app.locals.siteEmail = process.env.SITE_EMAIL;
app.locals.ccbLicense = process.env.CCB_LICENSE;

// ========== 5. DEFAULT DESCRIPTION MIDDLEWARE ==========
app.use((req, res, next) => {
    res.locals.description = 'Professional tree service on the Southern Oregon Coast';
    next();
});

// ========== 6. ROUTES ==========
app.use('/', require('./routes/pages'));
app.use('/services', require('./routes/services'));
app.use('/service-areas', require('./routes/serviceAreas'));
app.use('/blog', require('./routes/blog'));
app.use('/contact', require('./routes/contact'));
app.use('/admin', require('./routes/admin'));
app.use('/chatbot', require('./routes/chatbot'));
app.use('/quote', require('./routes/quote'));
app.use('/booking', require('./routes/booking'));

// ========== 7. ERROR HANDLER ==========
app.use(require('./middleware/errorHandler').notFound);

// ========== 8. DATABASE CONNECTION & SERVER START ==========
const connectDB = require('./utils/db');

console.log('⏳ Connecting to MongoDB...');

connectDB().then(() => {
    console.log('✅ MongoDB connected successfully');
    
    app.listen(PORT, '127.0.0.1', () => {
        console.log(`✅ Server running at http://127.0.0.1:${PORT}`);
    });
}).catch(err => {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
});