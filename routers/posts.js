const express = require('express');
const postController = require('../controllers/postController');
const checkSlug = require('../middlewares/checkSlug');
const router = express.Router();

// Middlewares
router.param('slug', checkSlug);

// CRUD requests
router.get('/', postController.index);

router.get('/:slug', postController.show);

router.post('/', postController.store);

router.put('/:slug', postController.update);

router.patch('/:slug', postController.modify);

router.delete('/:slug', postController.destroy);

module.exports = router;
