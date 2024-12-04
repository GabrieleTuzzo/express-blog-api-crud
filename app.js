const express = require('express');
const cors = require('cors');
const postsRouter = require('./routers/posts.js');
const notFound = require('./middlewares/notFound.js');
const errorsHandler = require('./middlewares/errorHandler.js');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.use('/posts', postsRouter);
app.use(notFound);
app.use(errorsHandler);

app.listen(port, function () {
    console.log('Server started...');
});
