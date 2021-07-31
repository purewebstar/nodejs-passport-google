'use strict'
/** Importing dependencies */
import jwt from 'jsonwebtoken'

/** authenticating user token */
export const Authenticate = (req, res, next) => {

    // getting refresh token from cookie
    const refreshToken = req.cookies.jwtToken   
    //
    if(refreshToken == null) return res.sendStatus(401)
    /**
     *   Verifying Refresh Token
     */
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, payload) =>{

        if(err) res.sendStatus(403)
        // getting access token from header[Authorization: Bearer <access_token>]
        const authHeader = req.headers['authorization']
        const bearer = authHeader.split(' ')
        const accessToken = bearer[1]
        // check if access token is null ( then send Unauthorized client status response code )
        if(accessToken == null ) return res.sendStatus(401)
        /**
         *   Verifying Access Token
         */
        jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, payload) =>{
            // if error send forbidden client error status response code
            if(err) return res.sendStatus(403)
            req.payload = payload
            next()
        })
    })


}
