/** importing dependencies */
import express from 'express'
import passport from 'passport'

/** importing controllers */
import {createUser, readUser} from '../controllers/api.controller.js'

const route = express.Router()

route.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}))
route.get('/google/create-user', passport.authenticate('google', 
{
    failureRedirect: '/error',
}), readUser, createUser)

export default route

