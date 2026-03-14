const mongoose = require('mongoose');
const slugify = require('slugify');

const blogPostSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    slug: { 
        type: String, 
        unique: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    excerpt: String,
    featuredImage: String,
    author: { 
        type: String, 
        default: 'JT & Sons' 
    },
    published: { 
        type: Boolean, 
        default: false 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Generate slug before saving
blogPostSchema.pre('save', function(next) {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('BlogPost', blogPostSchema);