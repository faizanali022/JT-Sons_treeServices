const BlogPost = require('../models/BlogPost');

exports.index = async (req, res) => {
    try {
        const posts = await BlogPost.find({ published: true }).sort({ createdAt: -1 });
        res.render('pages/blog', { posts, title: 'Blog', description: 'Our blog' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
};

exports.show = async (req, res) => {
    try {
        const post = await BlogPost.findOne({ slug: req.params.slug, published: true });
        if (!post) {
            return res.status(404).render('error/404', { title: 'Post Not Found' });
        }
        res.render('blog/post', {
            title: post.title,
            description: post.excerpt || post.title,
            post
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error loading post');
    }
};