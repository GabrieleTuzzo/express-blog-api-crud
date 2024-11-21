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

    slug = slug.toLowerCase();
    responseObj = utilityFunctions.findByIdOrSlug(postsArray, slug);

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
        receivedObj.slug = newSlug;

        postsArray.push(receivedObj);

        console.log('Nuovo post creato');
    }

    res.status(201).json(receivedObj);
}

function update(req, res) {
    let slug = req.params.slug;
    let newDataObj = req.body;
    let responseObj;

    for (const key in newDataObj) {
        if (!newDataObj[key]) {
            return res.status(422).json({
                error: 'Bad data received',
                message: 'Bad data received',
            });
        }
    }

    slug = slug.toLowerCase();
    responseObj = utilityFunctions.findByIdOrSlug(postsArray, slug);

    if (!responseObj) {
        return res.status(404).json({
            error: 'No Posts found',
            message: 'Nessun Post trovato :(',
        });
    }

    for (const key in responseObj) {
        responseObj[key] = newDataObj[key];
    }

    console.log('Post aggiornato');
    res.json(responseObj);
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
