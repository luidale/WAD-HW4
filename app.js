const express = require('express');
const pool = require('./database');
//const cors = require('cors');

const app = express();

// register the ejs view engine
app.set('view engine', 'ejs');

//without this middleware, we cannot use data submitted by forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(express.static(__dirname + '/public'));
//app.use(express.static('public'));

//const path = require('path')
//app.use("/static", express.static(path.join(__dirname, 'public')))
app.use('/', express.static(__dirname + '/public'));
app.use('/posts', express.static(__dirname + '/public'));
// listen for requests on port 3000
app.listen(3000);

/* app.get() is used to respond to Get requests, and it takes two arguments:
1- arg1: represents what path/url you want to listen to (e.g., '/' listens to index path)
2- arg2: represents a function that takes in request and response objects */

//app.get('/posts', (req, res) => {
    /* res.sendFile() is a method that can be used to send files as its name indicates. However, it takes the absolute
    not the relative path to the file. Therefore, you need to specify the root directory of the file.
    To avoid this confusion, you can use "__dirname", which you have access to after installing "lodash" */
    /*res.sendFile('./views/index.html', { root: __dirname });*/
/*    let posts = [
        {title: "Post1", body: "Content1" },
        {title: "Post2", body: "Content2" },
        ];

    res.render('posts', { posts: posts, title: "Index2"});
    
    //res.render('index');
});
*/

app.get('/posts', async(req, res) => {
    try {
        console.log("get posts request has arrived");
        const posts = await pool.query(
            "SELECT * FROM posts"
        );
        //res.json(posts.rows); // for testing with Postman
        
        // To convert createion date to more human readable form
        posts.rows.forEach(function(element){
            element.created_at = convertDate(element.created_at);
        })

        res.render('posts', {posts: posts.rows});
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/posts/:id', async(req, res) => {
    try {
        const { id } = req.params;
        console.log("get a post request has arrived");
        const posts = await pool.query(
            "SELECT * FROM posts WHERE id = $1", [id]
        );
        // To convert createion date to more human readable form
        posts.rows.forEach(function(element){
            element.created_at = convertDate(element.created_at);
        })
        //res.json(posts.rows[0]);
        res.render('singlepost', { post: posts.rows[0] });
        
    } catch (err) {
    console.error(err.message);
    }
   });

app.post('/posts', async(req, res) => {
    try {
    console.log("a post request has arrived");
    const post = req.body;
    const newpost = await pool.query(
    "INSERT INTO posts(title, body, imageurl) values ($1, $2, $3) RETURNING*", [post.title, post.body, post.imageurl]
    );
    res.json( newpost );
    } catch (err) {
    console.error(err.message);
    }
   });

app.put('/posts/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const { likes }= req.body;
        console.log("update request has arrived");
        const updatepost = await pool.query(
            "UPDATE posts SET likes = $2 WHERE id =$1", [id, likes]
        );
        //res.json(post);
        res.redirect('posts');
    } catch (err) {
        console.error(err.message);
    }
   });

app.delete('/posts/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const post = req.body;
        console.log("delete a post request has arrived");
        const deletepost = await pool.query("DELETE FROM posts WHERE id = $1", [id]
        );
        //res.json(post);
        res.redirect('posts');
    } catch (err) {
        console.error(err.message);
    }
   });

app.get('/singlepost2', (req, res) => {
    /*res.sendFile('./views/posts.html', { root: __dirname });*/
    res.render('singlepost2');
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


function convertDate(dateString) {

    let monthNames = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
    date = new Date(dateString);

    var month = date.getMonth();
    var day = date.getDate();
    // add "strings" to date
    if (day % 10 == 1) {
        day = day + "st";
    } else if (day % 10 == 2) {
        day = day + "nd";
    } else if (day % 10 == 3) {
        day = day + "rd";
    } else {
        day = day + "th";
    }
    var year = date.getYear();

    return  monthNames[month] + " " + day + " " + (1900 + year);

}


