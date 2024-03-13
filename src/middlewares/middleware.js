const authentication = (req,res,next) =>{
    console.log("middle ware called");
    next();
    
}
module.exports = {authentication};