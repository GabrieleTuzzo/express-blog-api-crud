const postsArray = require('../data/posts.js');

function index(req, res) {
    console.log('Lista dei post');
    res.json(postsArray);
}

function show(req, res) {
    const slug = req.params.slug;
    console.log('post con slug = ' + slug);
    const post = postsArray.find((el) => el.slug === slug);
    console.log(post);
    res.json(post);
}

function store(req, res) {
    console.log('Nuovo post creato');
    res.send('Post creato');
}

function update(req, res) {
    console.log('Post aggiornato');
    res.send('Post aggiornato');
}

function modify(req, res) {
    console.log('Post modificato');
    res.send('Post modificato');
}

function destroy(req, res) {
    const slug = req.params.slug;
    const postIndex = postsArray.findIndex((post) => post.slug === slug);
    postsArray.splice(postIndex, 1);
    console.log(postsArray);
    res.status(204).send();
}

module.exports = { index, show, store, update, modify, destroy };
