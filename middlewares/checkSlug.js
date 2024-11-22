const postsArray = require('../data/posts.js');

function checkSlug(req, res, next, slug) {
    slug = slug.toLowerCase();
    res.responseObj = findByIdOrSlug(postsArray, slug);

    if (res.responseObj.element && res.responseObj.index !== -1) {
        next();
    }

    res.status(404);
    responseObj = {
        error: 'No Posts found',
        message: 'Nessun Post trovato :(',
    };
}

function findByIdOrSlug(array, slug) {
    const element = array.find(
        (post) => post.slug === slug || post.id === parseInt(slug)
    );

    const index = array.findIndex(
        (post) => post.slug === slug || post.id === parseInt(slug)
    );

    const returnObj = { element, index };
    return returnObj;
}

module.exports = checkSlug;
