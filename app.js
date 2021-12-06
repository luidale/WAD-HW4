const express = require('express');

const app = express();

// register the ejs view engine
app.set('view engine', 'ejs');

app.use(express.static('public'));

// listen for requests on port 3000
app.listen(3000);

/* app.get() is used to respond to Get requests, and it takes two arguments:
1- arg1: represents what path/url you want to listen to (e.g., '/' listens to index path)
2- arg2: represents a function that takes in request and response objects */
app.get('/posts', (req, res) => {
    /* res.sendFile() is a method that can be used to send files as its name indicates. However, it takes the absolute
    not the relative path to the file. Therefore, you need to specify the root directory of the file.
    To avoid this confusion, you can use "__dirname", which you have access to after installing "lodash" */
    /*res.sendFile('./views/index.html', { root: __dirname });*/
    let posts = [
        {title: "Post1", body: "Content1" },
        {title: "Post2", body: "Content2" },
        ];

    res.render('posts', { posts: posts, title: "Index2"});
    
    //res.render('index');
});
app.get('/singlepost', (req, res) => {
    /*res.sendFile('./views/posts.html', { root: __dirname });*/
    res.render('singlepost');
});
app.get('/addnewpost', (req, res) => {
    /*res.sendFile('./views/posts.html', { root: __dirname });*/
    res.render('addnewpost');
});
app.get('/contactus', (req, res) => {
    /*res.sendFile('./views/contactus.html', { root: __dirname });*/
    res.render('contactus');
});
app.get('/login', (req, res) => {
    /*res.sendFile('./views/posts.html', { root: __dirname });*/
    res.render('login');
});

// We will discuss this method next week, when we speak about Middlewares
app.use((req, res) => {
    /*res.status(404).sendFile('./views/404.html', { root: __dirname });*/
    res.status(404).render('404');

});