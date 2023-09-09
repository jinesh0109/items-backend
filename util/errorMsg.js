class errorMsg extends Error{
    constructor(message,statusCode){
        // super(message);
        super(message);
        // this.message = message
        this.statusCode = statusCode
    }
}
module.exports = errorMsg