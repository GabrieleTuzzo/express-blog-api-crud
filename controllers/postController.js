const postsArray = require('../data/posts.js');
const utilityFunctions = require('../utilities/functions.js');

function index(req, res) {
    let tag = req.query.tag;
    let responseObj = postsArray;
    if (tag) {
        let tagFormatted = utilityFunctions.capitalizeString(tag);
        // console.log(tagFormatted);
        responseObj = postsArray.filter((post) =>
            post.tags.includes(tagFormatted)
        );
    }

    res.json(responseObj);
}

function show(req, res) {
    let slug = req.params.slug;
    console.log('post con slug = ' + slug);
    let responseObj;

    // console.log('isNaN true');
    slug = slug.toLowerCase();
    responseObj = postsArray.find(
        (post) => post.slug === slug || post.id === parseInt(slug)
    );

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
    let receivedObj = req.body;
    let isDataValid = true;

    for (const key in receivedObj) {
        if (!receivedObj[key]) {
            res.status(422);
            receivedObj = {
                error: 'Bad data received',
                message: 'Bad data received',
            };
            isDataValid = false;
        }
        break;
    }

    if (isDataValid) {
        const newSlug = utilityFunctions.getSlug(receivedObj.title);
        receivedObj.slag = newSlug;

        postsArray.push(receivedObj);

        console.log('Nuovo post creato');
    }

    res.status(201).json(receivedObj);
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
    let slug = req.params.slug;
    let postIndex;

    slug = slug.toLowerCase();
    postIndex = postsArray.findIndex(
        (post) => post.slug === slug || post.id === parseInt(slug)
    );

    if (postIndex === -1) {
        return res.status(404).json({
            error: 'No Posts found',
            message: 'Nessun Post trovato :(',
        });
    }
    postsArray.splice(postIndex, 1);
    console.log(postsArray);
    res.sendStatus(204);
}

module.exports = { index, show, store, update, modify, destroy };
