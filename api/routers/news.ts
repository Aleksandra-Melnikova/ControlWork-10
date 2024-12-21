import express from "express";
import {New, NewWithoutId} from "../types";
import mySqlDb from "../mySqlDb";
import {ResultSetHeader} from "mysql2";
import {imagesUpload} from "../multer";

const newsRouter = express.Router();

newsRouter.get('/', async (req, res, next) => {
    try {
        const connection = await mySqlDb.getConnection();
        const [result] = await connection.query('SELECT id, title, image, date FROM news_items');
        const news = result as New[];
        res.send(news);
    }
    catch (e){
        next(e);
    }
});

newsRouter.get('/:id', async (req, res,next) => {
  const id = req.params.id;
  if (!req.params.id) {
      res.status(404).send({error:"Not found"});
  }
  try {
      const connection = await mySqlDb.getConnection();
      const [result]= await connection.query('SELECT * FROM news_items WHERE id = ?', [id]);
      const news = result as New[];
      if (news.length === 0 ){
          res.status(400).send({error:"News not found"});
      } else {
          res.send(news[0]);
      }
  }
  catch (e){
      next(e);
  }
});

newsRouter.post('/',imagesUpload.single('image'), async (req, res,next) => {
    if(!req.body.title || ! req.body.description) {
        res.status(400).send({error:"Please send title, description"});
        return
    }
    const item: NewWithoutId = {
        title: req.body.title,
        description: req.body.description,
        image:req.file ?'images' + req.file.filename : null,
    };
    try {
        const connection = await mySqlDb.getConnection();
        const [result]= await connection.query('INSERT INTO news_items (title,description,image) VALUES (?, ?, ?)',
            [item.title,item.description, item.image]);
        const resultHeader = result as ResultSetHeader;
        const [resultOneNew]= await connection.query('SELECT * FROM news_items WHERE id = ?', [resultHeader.insertId]);
        const oneNew = resultOneNew as New[];
        if (oneNew.length === 0 ){
            res.status(400).send({error:"Item not found"});
        } else {
            res.send(oneNew[0]);
        }
    }
    catch (e){
        next(e);
    }
});
newsRouter.delete('/:id', async (req, res,next) => {
    const id = req.params.id;
    if (!req.params.id) {
        res.status(404).send({error:"Not found"});
    }
    try {
        const connection = await mySqlDb.getConnection();
        const [resultOneNew]= await connection.query('SELECT * FROM news_items WHERE id = ?', [id]);
        const oneNew = resultOneNew as New[];
        if (oneNew.length === 0 ){
            res.status(404).send({error:"Not found"});
        } else{
            await connection.query('DELETE FROM news_items WHERE id = ?', [id]);
            res.send({message: 'New deleted successfully.'});
        }
    }
    catch (e){
        next(e);
    }
});


export default newsRouter ;
