import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

let blogPosts = [];
let id_number = 1;

// Constructor for Blog Posts
function blogPost(title, author, text) {
    this.title  = title;
    this.author = author;
    this.text = text;
    this.creationDate = new Date();
    this.blogID = id_number++;

};

// Function to add a new blog post
function addBlogPost(title, author, text) {
    const newPost = new blogPost(title, author, text);
    blogPosts.push(newPost);
}

// MIDDLEWARES
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.get("/", (req, res) => {
    res.render("home.ejs", {
        blogPosts: blogPosts
    });
});

app.get("/post/:postID", (req, res) => {
    const blogID = req.params.postID;
    const post = blogPosts.find((post) => post.blogID == blogID);
    console.log(post);
    if (post) {
        res.render("blogOverview.ejs", {
            blogPost: post
        });
    } else {
        res.status(404).send("Post not found");
    }
});

app.get("/create-post", (req, res) => {
    res.render("blogCreation.ejs");
});

app.post("/create-post", (req, res) => {
    addBlogPost(req.body.title, req.body.author, req.body.text);
    console.log(blogPosts);
    res.render("home.ejs", {
        blogPosts: blogPosts
    });
});

app.put("/post/:postId", (req, res) => {
    // TODO: UPDATE POST
    res.render("blogCreation.ejs");
});

app.delete("/post/:postID", (req, res) => {
    // TODO: DELETE POST
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});