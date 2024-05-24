export function baseurl(req,res,next){
    const myurl=req.protocol+"://"+req.get('host')
    
    req.myurl=myurl
    next()
}