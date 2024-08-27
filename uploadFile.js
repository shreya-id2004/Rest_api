const path = require("path");
const express = require("express");
const multer = require("multer");

const app = express();

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended : true}));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })


app.get("/",(req,res)=>{
    res.render("home.ejs");
});

app.post("/upload",upload.single('name'),(req,res)=>{
    console.log(req.body);
    console.log(req.file);

    return res.redirect("/");
})
app.listen(8080,()=>{
    console.log("server is running");
})