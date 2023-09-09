const Items = require('../models/items');
const LunrServiceIndex = require('../service/items');
const errorMsg  = require('../util/errorMsg');

exports.getData = async (req, res, next) => {
    try {
        let itemArray = [] 
        if(req.body==undefined || req.body.name==undefined)
            return next(new errorMsg("NULL Pointer Exception: ",500));
        itemArray = LunrServiceIndex.searchPerform(req.body.name);
        return res.status(200).json(itemArray);
    }
    catch(err) {
        // return next(new errorMsg(err,500));
        return next(err)
    }
}
exports.getUpdatedItemCache = async (req, res , next) =>{
    try {
        if(req.body==undefined || req.body.name==undefined)
            return next(new errorMsg("NULL Pointer Exception: ",500));
        const updateRes = LunrServiceIndex.updateCacheItemData(req.body);
        res.status(200).json(updateRes);
    } catch (err) {
        return next(err);
    }
}