const express = require("express");
const app = express();

const port = 8080;

const path = require("path");

const { v4: uuidv4 } = require('uuid');//to gerate a unique id

const methodOverride = require("method-override");//for convert http request

app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id:uuidv4(),
        username:"apna College",
        content : "I love coding",
    },
    {
        id:uuidv4(),
        username:"Shreya",
        content:"Hard work is important to achieve success",
    },
    {
        id:uuidv4(),
        username:"Raghav",
        content : "I got selected in neet",
    },
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

//to create a new post
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req,res)=>{
    let{username,content}=req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts")
});

//to open specific post
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p) =>id === p.id);
    //to print the single post detail
    res.render("show.ejs",{post});
 });

 //to update the post
 app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id == p.id);
    res.render("edit.ejs",{post});
 })
 app.patch("/posts/:id",(req,res)=>{
    let {id} =req.params;
    let newContent = req.body.content;
    post.content = newContent;
    res.redirect("/posts");
 });

 app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>id !== p.id);
    res.redirect("/posts");
 })

app.listen(port ,()=>{
    console.log("listening to port : 8080");
})