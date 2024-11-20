const postsArray = require('../data/posts.js');

function index(req, res) {
    let tag = req.query.tag;
    let resArray = postsArray;
    if (tag) {
        let tagFormatted = tag.toLowerCase();
        tagFormatted = tagFormatted[0].toUpperCase() + tagFormatted.slice(1);
        // console.log(tagFormatted);
        resArray = postsArray.filter((post) =>
            post.tags.includes(tagFormatted)
        );
    }
    console.log('Lista dei post');
    res.json(resArray);
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
