import express from "express";
import multer from "multer";
import cors from "cors";
import { imageUpload, listPost, userNewPost, updateNewPost } from "../controllers/postsController.js";

const corsOptions = {
  origin: "https://localhost:8000",
  optionSuccessStatus: 200
}

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
    app.put("/upload/:id", updateNewPost)
}


export default routes;