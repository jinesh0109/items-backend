const db = require("../util/database");
const Items = require('../models/items');
const itemController = require('../controllers/items');
const lunr = require('lunr');
const errorMsg = require("../util/errorMsg");
const logger = require('../Logging/index');
let ind;
// const itemDetail = []
let itemCacheData = new Map();
class LunrServiceIndex{
    static async prepareLunrIndex (){        
        try {
            logger.info(`fetching item details`)
            const [itemDetail] = await Items.fetchAll();
            logger.info(`fetched ${itemDetail.length} item details`)
            let start = new Date();
            logger.info(`preparing lunr index`)
            ind = lunr(function(){
                this.ref('item_id');
                this.field('name',{ boost: 100});
                this.field('item_id');
                this.pipeline.remove(lunr.stemmer);
                itemDetail.forEach(element => {
                    itemCacheData.set(element.itemId,element);
                    this.add({'item_id': element.itemId,
                        'name':element.name})
                });
            })  
            logger.info(`prepared lunr index`)
            let end = new Date();
            logger.info(`Time taken to prepare index: ${end-start} ms`);
        } catch (error) {
            throw Error(`Preparing lunr index failed: ${error}`,500);
        }
    }
    static async prepareUpdatedLunrIndex(updatedData)
    {
        try {       
            let start = new Date();
            logger.info(`preparing updated lunr index`)     
            updatedData.forEach((ele) => {
                if(itemCacheData.has(ele.itemId))
                {
                    ind.remove({
                        ref:ele.itemId
                    })
                }
                ind.add({'item_id': ele.itemId,
                    'name':ele.name})
            });        
            logger.info(`updated index prepared`)  
            let end = new Date();
            logger.info(`Time taken to prepare updated index: ${end-start} ms`);
        } catch (error) {
            return errorMsg(error,500);
        }
    }
    static searchPerform(term){
            let data = [];
            if(term.length < 3)
                return data;
            let itemList =  ind.search(term)
            let itemSuggestionList = []
            
            itemList.forEach((result)=>{
                if(itemCacheData.has(result.ref))
                {
                    itemSuggestionList.push({'itemId': itemCacheData.get(result.ref).itemId,
                    'name': itemCacheData.get(result.ref).name})
                }
            })
            let reorderedSuggestionList = []
            itemSuggestionList.forEach(item=>{
                let name = item.name.toLowerCase();
                if(name.startsWith(term.toLowerCase()))
                {
                    reorderedSuggestionList.push(item);
                }
            })
            if(reorderedSuggestionList.length > 0){
                itemSuggestionList.forEach(itm => {
                    let index = reorderedSuggestionList.findIndex(item => (item.itemId == itm.itemId));
                    if (index == -1) {
                        reorderedSuggestionList.push(itm);
                    }
                });
                itemSuggestionList = reorderedSuggestionList
            }
            itemSuggestionList.forEach(item => {
            let dataFromCache = itemCacheData.get(item.itemId); 
            data.push(dataFromCache); 
            });
            return data
    }
    static async updateCacheItemData(updatedData){
        try {
            updatedData.forEach((ele)=>{ 
                itemCacheData.set(ele.itemId,ele);
            })
            await this.prepareUpdatedLunrIndex(updatedData);
            return "updated cache succesfully"
        } catch (error) {
            return errorMsg(error,500);           
        }
    }
}
module.exports = LunrServiceIndex