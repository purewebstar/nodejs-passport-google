/** importing dependencies */
import gStrategy from 'passport-google-oauth2'
const GoogleStrategy = gStrategy.Strategy
import dotenv from 'dotenv'
dotenv.config()

const googleCredentials = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}

const initGooglePassport = (passport) => {
    passport.use(new GoogleStrategy(googleCredentials,
    // to find or create a user
      (accessToken, refreshToken, profile, done) =>{
        return done(null, profile)
      }
     ))
    
    passport.serializeUser((user, done)=>{
        done(null, user)
    })
    
    passport.deserializeUser((user, done)=>{
        done(null, user)
    })
    
}

 export default initGooglePassport