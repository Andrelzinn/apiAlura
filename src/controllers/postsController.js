import { getAllPosts, createNewUserPost, updatePost } from "../models/postsModel.js";
import generateDescription from "../services/gemniService.js";
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
        description: "",
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


export async function updateNewPost(req, res) {
    const id = req.params.id;
    const imgUrl = `http://localhost:300/${id}.png`

    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`)
        const description = await generateDescription(imageBuffer)

        const post = {
            imageUrl: imgUrl,
            description: description,
            alt: req.body.alt
        }

        const createdPost = await updatePost(id, post);
        res.status(200).json(createdPost);
        console.log('Sucess')
    } catch (error) {
        console.error(error.message);
        res.status(500).json({"Error":"Requisition Failure"});
    }
}
