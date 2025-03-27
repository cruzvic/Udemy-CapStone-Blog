import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

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
};

// Function to update blog post if changes were made
function updateBlogPost(blogID, title, author, text) {
    const post = blogPosts.find((post) => post.blogID == blogID);
    if (!post) {
        throw new Error("Blog post not found");
    }
    if (title.length > 0) {
        post.title = title;
    }
    if (author.length > 0){
        post.author = author;
    } 

    if (text.length > 0) {
        post.text = text;
    }
}

// MIDDLEWARES
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

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

app.get("/edit-post/:postID", (req, res) => {
    const postID = req.params.postID;
    const post = blogPosts.find((post) => post.blogID == postID);
    if (post) {
        res.render("blogEdit.ejs", {
            blogPost: post
        })
    } else {
        res.status(404).send("Post not found")
    }
});

app.put("/edit-post/:postID", (req, res) => {
    const postID = req.params.postID;
    updateBlogPost(postID, req.body.title, req.body.author, req.body.text);
    const post = blogPosts.find((post) => post.blogID == postID);
    res.render("blogOverview.ejs", {
        blogPost: post
    });
});

app.delete("/post/:postID", (req, res) => {
    // TODO: DELETE POST
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});