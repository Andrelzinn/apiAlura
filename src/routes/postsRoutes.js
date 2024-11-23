import express from "express";
import multer from "multer";
import { imageUpload, listPost, userNewPost } from "../controllers/postsController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); 
    }
  });

const upload = multer({ storage: storage });


const routes = (app) => {
    app.use(express.json());
    
    app.get("/posts", listPost);
    app.post("/posts", userNewPost);
    app.post("/upload", upload.single("image"), imageUpload);
    app.put("/upload/:id", )
}


export default routes;