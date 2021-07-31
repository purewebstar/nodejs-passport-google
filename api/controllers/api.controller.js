/** importing dependencies */

/** importing models | site files */
import {userAccount} from '../models/user.model.js'
import jwt from 'jsonwebtoken'


/** Creating user account */
export const createUser = async (req, res) =>{

   const registerUser = new userAccount({
       userId: req.user.id,
       email: req.user.emails[0].value,
       displayName: req.user.displayName,
       givenName: req.user.name.givenName,
       familyName: req.user.name.familyName,
       pictureUri: req.user._json['picture']
   })

   const payload = {
    userId: req.user.id,
    email: req.user.emails[0].value
   }
   // try to register new user
   try{

     await registerUser.save()
     // generate access token
     const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, {expiresIn: '5m'})
     // generate refresh token
     const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_TOKEN, {expiresIn: '3h'})

     // setting access token on header
     res.header('Authorization', 'Bearer ' + accessToken)
     // setting refresh token on cookie
     res.cookie('jwtToken',  refreshToken, {maxAge: 3*60*60*1000, httpOnly: true})
     //----------
     res.redirect('/dashboard')

   }catch(err){
     return res.json({message: err.message})
   }

}

/** reading user account */
export const readUser = async (req, res, next) =>{

     const email = req.user.emails[0].value
     let isExist = await userAccount.findOne({email})
     const payload = {
       userId: req.user.id,
       email: req.user.emails[0].value
     }
     if(!isExist) next()
     else{

        // generate access token
        const accessToken = jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, {expiresIn: '5m'})
        // generate refresh token
        const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_TOKEN, {expiresIn: '3h'})

        // setting access token on header
        res.header('Authorization', `Bearer ${accessToken}`)
        // setting refresh token on cookie
        res.cookie('jwtToken',  refreshToken, {maxAge: 3*60*60*1000, httpOnly: true})
        //----------
        res.redirect('/dashboard')
     }
}
