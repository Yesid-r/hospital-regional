import jwt from 'jsonwebtoken' 

const verifyToken = (req,res,next)=>{

    const token = req.cookies.accesToken
    if(!token){
        return res.status(401).json({success:false, message:"You're not authorize"})
    }

    // if token is exist
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, trabajador)=>{
        if(err){
            return res.status(401).json({success:false, message:"token is invalid"})
        }
        req.trabajador = trabajador
        next() //
    })
}

export const verifyUser =(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.trabajador.id === req.params.id || req.trabajador.role === 'admin'){
            next()
        }else{
           return res.status(401).json({success:false, message:"you are not authenticated"})
        }
    })
}


export const verifAdmin =(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.trabajador.role === 'admin'){
            next()
        }else{
            return res.status(401).json({success:false, message:"you are not authorized"})
        }
    })
}