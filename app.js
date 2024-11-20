const express = require('express');
const postsRouter = require('./routers/posts.js');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.use('/posts', postsRouter);

app.listen(port, function () {
    console.log('Server started...');
});
