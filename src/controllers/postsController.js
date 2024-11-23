import { getAllPosts, createNewUserPost } from "../models/postsModel.js";
import fs from "fs";

export async function listPost (req, res){
    const posts = await getAllPosts();

    res.status(200).json(posts);
}

export async function userNewPost(req, res) {
    const newPost = req.body;
    try {
        const createdPost = await createNewUserPost(newPost);
        res.status(200).json(createdPost);
        console.log('Sucess')
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Error":"Requisition Failure"});
    }
}

export async function imageUpload(req, res) {
    const newImage = {
        descricao: "",
        imageUrl: req.file.originalname,
        alt: ""
    };

    try {
        const createdImage = await createNewUserPost(newImage);
        const updatedImage = `uploads/${createdImage.insertedId}.png`
        fs.renameSync(req.file.path, updatedImage)
        res.status(200).json(createdImage);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Error":"Requisition Failure"});
    }
}

