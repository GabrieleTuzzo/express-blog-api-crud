const express = require('express');
const postsArray = require('../data/posts.js');
const router = express.Router();

// Index
router.get('/', function (req, res) {
    console.log('Lista dei post');
    res.json(postsArray);
});

// Show
router.get('/:slug', function (req, res) {
    const slug = req.params.slug;
    console.log('post con slug = ' + slug);
    const post = postsArray.find((el) => el.slug === slug);
    console.log(post);
    res.send(post);
});

// Store
router.post('/', function (req, res) {
    console.log('Nuovo post creato');
});

// Update
router.put('/:slug', function (req, res) {
    console.log('Post modificato');
});

// Modify
router.patch('/:slug', function (req, res) {
    console.log('Post modificato parzialmente');
});

// Destroy
router.delete('/:slug', function (req, res) {
    console.log('Post eliminato');
});

module.exports = router;
