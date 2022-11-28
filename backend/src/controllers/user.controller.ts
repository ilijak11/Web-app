import express from 'express'
import UserModel from '../models/user'
import CompanyModel from '../models/company'

export class UserController{
    login(req: express.Request, res: express.Response){
        UserModel.findOne({username: req.body.username, password: req.body.password}, (err, user) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                if(user){
                    console.log(`User: ${req.body.username} logged in`)
                    res.json({status: 0, user: user})
                }
                else{
                    res.json({status: 1})
                }
            }
        })
    }

    changePassword(req: express.Request, res: express.Response){
        UserModel.updateOne({username: req.body.username}, {$set: {password: req.body.newPassword}}, (err) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log(`User: ${req.body.username} changed password to: ${req.body.newPassword}`)
                res.json({status: 0})
            }
        })
    }

    getAllProductsAndCompanies(req: express.Request, res: express.Response){
        CompanyModel.find({firstLogin: false}, {phone: true,
                                email: true,
                                companyName: true,
                                companyID: true,
                                pib: true,
                                category: true,
                                items: true}, (err, data) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log('User requested all companies and items')
                res.json({status: 0, data: data})
            }
        })
    }
}