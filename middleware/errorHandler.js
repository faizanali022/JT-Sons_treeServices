exports.notFound = (req, res, next) => {
    res.status(404).render('error/404', {
        title: 'Page Not Found',
        description: 'The page you are looking for does not exist.',
        layout: 'layouts/main'
    });
};