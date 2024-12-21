import express from "express";
import {CommentWithoutId} from "../types";
import mySqlDb from "../mySqlDb";
import {ResultSetHeader} from "mysql2";


const commentsRouter = express.Router();

// commentsRouter.get('/', async (req, res, next) => {
//     try {
//         const connection = await mySqlDb.getConnection();
//         const [result] = await connection.query('SELECT id, title, image, date FROM news_items');
//         const items = result as News[];
//         res.send(items);
//     }
//     catch (e){
//         next(e);
//     }
// });
//
// commentsRouter.get('/:id', async (req, res,next) => {
//     const id = req.params.id;
//     if (!req.params.id) {
//         res.status(404).send({error:"Not found"});
//     }
//     try {
//         const connection = await mySqlDb.getConnection();
//         const [result]= await connection.query('SELECT * FROM items WHERE id = ?', [id]);
//         const item = result as Items[];
//         if (item.length === 0 ){
//             res.status(400).send({error:"Item not found"});
//         } else {
//             res.send(item[0]);
//         }
//     }
//     catch (e){
//         next(e);
//     }
//
// });


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