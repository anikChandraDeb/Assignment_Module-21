export default (req,res,next)=>{
    console.log("I am auth Middleware");
    next();
}