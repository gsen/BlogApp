const express = require('express');
const app = express();
const Post = require('./api/models/post');
const postsData = new Post();
const multer = require('multer')
const slash = require('slash');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${getExtension(file.mimetype)}`)
    }
})

var upload = multer({ storage: storage });

getExtension = (mimeType) => {
    switch (mimeType) {
        case "image/png":
            return ".png";
        case "image/jpg":
            return ".jpg";
    }
}

app.use(express.json()); // to ensure that server understands json data in the req body

app.use((req, resp, next) => {
    resp.setHeader('Access-Control-Allow-Origin', '*');
    resp.setHeader('Access-Control-Allow-Methods', ['POST', 'GET', 'OPTIONS', 'PUT']);
    next();
}); // middleware to set the response header

app.use('/uploads', express.static('uploads')); // to serve static assets such as images, files


app.get('/', (req, resp) => resp.status(200).send("Hello world"));
app.get('/api/posts', (req, res) => {
    res.status(200).send(postsData.get())
});
app.get('/api/posts/:postId', (req, res) => {
    const foundPost = postsData.getIndividualBlog(req.params['postId']);
    if (foundPost) {

        res.status(200).send(foundPost);
    } else {
        res.status(404).send('Not found');
    }
});
app.post('/api/posts', upload.single('post-image'), (req, res) => {

    console.log(req.body);
    console.log(req.file);
    let newPost = {
        id: `${Date.now()}`,
        title: req.body.title,
        content: req.body.content,
        post_image: slash(req.file.path),
        added_date: `${Date.now()}`
    }
    console.log(newPost);
    postsData.addPost(newPost);
    res.status(201).send(newPost);
})

// app.put('/api/posts', upload.single('post-image'), (req, res) => {
//     console.log('put method');
//     console.log(req.body);
//     console.log(req.file);
//     let updatedPost = {
//         id: req.body.id,
//         title: req.body.title,
//         content: req.body.content,
//         post_image: slash(req.file.path),
//         added_date: `${Date.now()}`
//     }
//     console.log(updatedPost);
//     postsData.updatePost(updatedPost);
//     res.status(201).send(updatedPost);
// })
app.listen(2000, () => console.log('listening on http://localhost:2000'));