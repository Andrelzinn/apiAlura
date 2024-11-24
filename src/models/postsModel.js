import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";


const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getAllPosts() {
    const db =  conexao.db("imersão_back");
    const colection = db.collection("posts");
    return colection.find().toArray();
}

export async function createNewUserPost(newPost) {
    const db = conexao.db("imersão_back");
    const colection = db.collection("posts");
    console.log("ate aqui foi")
    return colection.insertOne(newPost)
}

export async function updatePost(id, newPost) {
    const db = conexao.db("imersão_back");
    const colection = db.collection("posts");
    console.log("ate aqui foi")
    const objID = ObjectId.createFromHexString(id)
    return colection.updateOne({_id: new ObjectId(objID)}, {$set:newPost})
}