const postsArray = require('../data/posts.js');

function index(req, res) {
    let tag = req.query.tag;
    let responseObj = postsArray;
    if (tag) {
        let tagFormatted = tag.toLowerCase();
        tagFormatted = tagFormatted[0].toUpperCase() + tagFormatted.slice(1);
        // console.log(tagFormatted);
        responseObj = postsArray.filter((post) =>
            post.tags.includes(tagFormatted)
        );
    }

    if (responseObj.length === 0) {
        res.status(404);
        responseObj = {
            error: 'No Posts found',
            message: 'Nessun Post trovato :(',
        };
    }

    res.json(responseObj);
}

function show(req, res) {
    const slug = req.params.slug;
    console.log('post con slug = ' + slug);
    let responseObj = postsArray.find((el) => el.slug === slug);
    if (!responseObj) {
        res.status(404);
        responseObj = {
            error: 'No Posts found',
            message: 'Nessun Post trovato :(',
        };
    }
    console.log(responseObj);
    res.json(responseObj);
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
    if (postIndex === -1) {
        return res.status(404).json({
            error: 'No Posts found',
            message: 'Nessun Post trovato :(',
        });
    }
    postsArray.splice(postIndex, 1);
    console.log(postsArray);
    res.status(204).send();
}

module.exports = { index, show, store, update, modify, destroy };
