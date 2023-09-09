const moment = require("moment");
const db = require("../util/database");

class Items {
  static async fetchAll() {
      return db.execute("SELECT ITEM_ID as itemId, NAME as name,TYPE_CODE as typeCode,DESCRIPTION as description,LONG_DESCRIPTION as longDescription,PAGE_NAME as pageName,DOSAGE as dosage,GENERIC_NAME as genericName,PAGE_TYPE as pageType,PACK_SIZE as packSize,UNIT_SALE_FLAG as uniSaleFlag,INFANT_FOOD_FLAG as infantFoodFlag,VENDOR_NON_REFUNDABLE_FLAG as vendorNonReturnableFlag,COLD_STORAGE_FLAG as coldStorageFlag,RETAIL_NAME as retailName,SALE_CHANNEL_MODE as saleChannelMode,DRUG_TYPE as drugType,DRUG_SUB_TYPE_CODE as drugSubTypeCode,DPCO_STATUS as dpcoStatus,B2B_PTR_PERCENT_TYPE as b2bPtrPercentType,B2B_ACTIVE_FLAG as b2bActiveFlag,B2B_MIN_MARGIN as b2bMinMargin,B2B_MARGIN_PERCENT as b2bMarginPercent,B2B_PTR_PERCENT as b2bPtrPercent,HSN as hsn,SRNO as srno,COMPANY_NAME_FOR_DISPATCH as companyNameForDispatch,COMPANY_NAME_FOR_SITE as companyNameForSite,SCHEDULE as schedule,AVAILABLE_STATUS_CODE as availableStatusCode,MIN_SALE_QTY as minSaleQty,PROD_WEIGHT as prodWeight,CURRENT_SALE_UNIT_RETAIL_PRICE_AMOUNT as currentSaleUnitRetailPriceAmount,POS_DEPARTMENT_ID as posDepartmentId,PRICE_LINE_ID as priceLineId,COST_REVENUE_CENTER as costRevenueCenter,UOM_CODE as uomCode,RCP_LAST_CHANGE_DATE as rcpLastChangeDate,RCP_CREATE_DATE as rcpCreateDate,CREATED_DATE as createdDate,CREATED_USER as createdUser,LAST_UPDATE_DATE as lastUpdateDate,LAST_UPDATE_USER as lastUpdateUser,SAP_ARTICLE_NUMBER as sapArticleNumber,DPCO_CEILING_PRICE as dpcoCeilingPrice,OTX_FLAG as otxFlag from rwitem");
  }
  static async fetchItemDetailForId(id){
    return db.execute(`select * from rwitem where rwitem.item_id=${id}`)
  }
};

module.exports = Items;