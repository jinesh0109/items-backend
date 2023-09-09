const express = require('express');
const util=require('util')
const bodyParser = require('body-parser');
const itemsRoutes = require('./routes/items');
const errorHandler = require('./middleware/errorHandler');
const LunrServiceIndex = require('./service/items');
const logger = require('./Logging/index');
const errorMsg = require("./util/errorMsg");
const cors = require('cors');


const app = express();
const ports = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
// app.use(express.urlencoded({extended:true}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, uid');
    next();
});
const logRequest = (req,res,next)=>{
    logger.info(`--Request from [${req.headers.uid}] [${req.method}] Path:[${req.url}] Query:${util.inspect(req.query)} Body:${util.inspect(req.body)}`)
    next();
}
const logResponse = (req, res, next)=>{
    if(res.statusCode==200)
    {
        const start = new Date();
        res.on('finish', () => {
        const duration = new Date() - start;
        logger.info(`--Response: ${req.method} ${req.url} - ${res.statusCode} Time taken: [${duration}ms]`);
        });
        next();
    }
}
app.use(logRequest);
app.use(logResponse);
app.use('/items', itemsRoutes);
app.all('*', (req, res,next)=> {
    res.status(400);
    next(new errorMsg("Bad request ",400))
})

app.use(errorHandler)
app.listen(ports, 
    async () => {
        try {
            logger.info(`Server started, listening on port ${ports}`)
            await LunrServiceIndex.prepareLunrIndex();
        } catch (error) {
            logger.error('An error occurred while starting the server or preparing lunr index:');
            throw error;     
        }
    });