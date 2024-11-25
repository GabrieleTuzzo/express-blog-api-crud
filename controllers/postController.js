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
    let responseObj = res.responseObj.element;

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
        res.status(201);
    }

    res.json(receivedObj);
}

function update(req, res) {
    let newDataObj = req.body;
    let responseObj = res.responseObj.element;
    const newSlug = utilityFunctions.getSlug(newDataObj.title);

    newDataObj.slug = newSlug;

    for (const key in newDataObj) {
        if (!newDataObj[key]) {
            return res.status(422).json({
                error: 'Bad data received',
                message: 'Bad data received',
            });
        }
    }

    newDataObj.id = responseObj.id;

    for (const key in responseObj) {
        responseObj[key] = newDataObj[key];
    }

    console.log('Post aggiornato');
    res.json(responseObj);
}

function modify(req, res) {
    let newDataObj = req.body;
    let responseObj = res.responseObj.element;

    if (req.body && typeof req.body === 'object') {
        for (const key in responseObj) {
            if (newDataObj[key]) {
                responseObj[key] = newDataObj[key];
            }
        }

        responseObj.slug = utilityFunctions.getSlug(responseObj.title);

        console.log('Post modificato');
    }
    res.json(responseObj);
}

function destroy(req, res) {
    let postIndex = res.responseObj.index;
    postsArray.splice(postIndex, 1);
    console.log(postsArray);
    res.sendStatus(204);
}

module.exports = { index, show, store, update, modify, destroy };
