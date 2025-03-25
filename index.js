import express from 'express';
import morgan from 'morgan';

const app = express();
const port = 3000;

let blogPosts = [];

// Constructor for Blog Posts
function blogPost(title, author, text) {
    this.title  = title;
    this.author = author;
    this.text = text;
    this.creationDate = new Date();
};

// MIDDLEWARES
app.use(express.static("public"));
app.use(morgan("dev"));

// ROUTES
app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.get("/post/:postID", (req, res) => {
    // TODO: GET POST OVERVIEW PAGE
    res.render("blogOverview.ejs");
});

app.post("/post", (req, res) => {
    // TODO: CREATE POST
    res.render("blogCreation.ejs");
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