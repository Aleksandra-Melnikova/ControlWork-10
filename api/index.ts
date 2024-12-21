import mySqlDb from "./mySqlDb";
import newsRouter from "./routers/news";
import commentsRouter from "./routers/comments";
import express from "express";


const app = express();
const port = 8000;
app.use(express.static('public'));
app.use(express.json());
app.use('/news', newsRouter);
app.use('/comments', commentsRouter);


const run = async () => {
    await mySqlDb.init();
    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });
};

run().catch(err => console.log(err));


