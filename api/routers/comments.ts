import express from "express";
import {CommentWithoutId} from "../types";
import mySqlDb from "../mySqlDb";
import {ResultSetHeader} from "mysql2";


const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
    try {
    const idQuery = req.query.news_id as string;
    console.log(idQuery);
    if(idQuery){
        const connection = await mySqlDb.getConnection();
        const [result] = await connection.query('SELECT * FROM comments WHERE news_id = ?', [idQuery]);
        const comment = result as Comment[];
        if(comment.length === 0){
            res.status(404).send({error:"Not found"});
        }
        else{
            res.send(comment);
        }}
     else{
         const connection = await mySqlDb.getConnection();
         const [result] = await connection.query('SELECT * FROM comments');
         const comments = result as Comment[];
         res.send(comments);
        }}
        catch (e){
            next(e);
        }
});

commentsRouter.post('/', async (req, res,next) => {
    if(!req.body.text || ! req.body.news_id) {
        res.status(400).send({error:"Please send text and news_id"});
        return
    }
    const comment: CommentWithoutId = {
        news_id: req.body.news_id,
        text: req.body.text,
        author: req.body.author ? req.body.author : "Anonymous",
    };

    try {
        const connection = await mySqlDb.getConnection();
        const [result]= await connection.query('INSERT INTO comments (news_id,text,author) VALUES (?, ?, ?)',
            [comment.news_id, comment.text, comment.author]);
        const resultHeader = result as ResultSetHeader;
        const [resultOneComment]= await connection.query('SELECT * FROM comments WHERE id = ?', [resultHeader.insertId]);
        const oneComment = resultOneComment as Comment[];
        if (oneComment.length === 0 ){
            res.status(400).send({error:"Comment not found"});
        } else {
            res.send(oneComment[0]);
        }
    }
    catch (e){
        next(e);
    }
});

commentsRouter.delete('/:id', async (req, res,next) => {
    const id = req.params.id;
    if (!req.params.id) {
        res.status(404).send({error:"Not found"});
    }
    try {
        const connection = await mySqlDb.getConnection();
        const [resultOneComment]= await connection.query('SELECT * FROM comments WHERE id = ?', [id]);
        const OneComment = resultOneComment as Comment[];
        if (OneComment .length === 0 ){
            res.status(404).send({error:"Not found"});
        } else{
            await connection.query('DELETE FROM comments WHERE id = ?', [id]);
            res.send({message: 'Comment deleted successfully.'});
        }
    }
    catch (e){
        next(e);
    }

});


export default commentsRouter;