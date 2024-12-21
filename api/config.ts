import path from "path";

const rootPath = __dirname;

const config = {
    rootPath,
    publicPath: path.join(rootPath, 'public'),
    dataBase: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'news_melnikova',
    }
};

export default config;