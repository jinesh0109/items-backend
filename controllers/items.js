const Items = require('../models/items');

exports.getAllItems = async (req, res, next) => {
    try {
    const [allItems] = await Items.fetchAll();
    
    res.status(200).json(allItems);
    }
    catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.postItems = async (req, res, next) => {
    try {
    const postResponse = await Items.post({...req.body, data: new Date()});
    console.log(postResponse, "Hello");
    res.status(201).json(postResponse);
    }
    catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.putItems = async (req, res, next) => {
    try {
    const putResponse = await Items.update(req.body);
    
    res.status(200).json(putResponse);
    }
    catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.deleteItems = async (req, res, next) => {
    try {
    const deleteResponse = await Items.delete(req.params.id);
    
    res.status(200).json(deleteResponse);
    }
    catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}