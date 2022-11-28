import express from 'express'
import AdminModel from '../models/admin'
import UserModel from '../models/user'
import CompanyModel from '../models/company'
import RegisterRequestModel from '../models/registerRequest'
import { isDataView } from 'util/types'


export class AdminController{
    login(req: express.Request, res: express.Response): void{
        AdminModel.findOne({username: req.body.username, password: req.body.password}, (err, admin) => {
            if(err){
                console.log(err)
                return res.json({status: -1})
            }
            else{
                if(admin){
                    console.log(`Admin: ${req.body.username} logged in`)
                    res.json({status: 0, admin: admin})
                }
                else{
                    res.json({status: 1})
                }
            }
        })
    }

    registerNewUser(req: express.Request, res: express.Response){
        let usr = req.body.username
        let idNum = req.body.idNumber

        UserModel.findOne({$or: [{username: usr}, {idNumber: idNum}]}, (err, doc) => {
            if(err){
                console.log(err);
                res.json({status: -1})
            }
            else{
                if(doc != null){
                    console.log(`User: ${usr} or IdNumber: ${idNum} already exist`)
                    res.json({status: 1})
                }
                else{
                    let newUser = new UserModel({
                        username: req.body.username,
                        password: req.body.password,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        phone: req.body.phone,
                        idNumber: req.body.idNumber
                    })
                    newUser.save((err, user) => {
                        if(err){
                            console.log(err)
                            res.json({status: -1})
                        }
                        else{
                            console.log(user)
                            res.json({status: 0})
                        }
                    })
                }
            }
        })  
    }

    changePassword(req: express.Request, res: express.Response){
        AdminModel.updateOne({username: req.body.username}, {$set: {password: req.body.newPassword}}, (err) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log(`Admin: ${req.body.username} changed password to: ${req.body.newPassword}`)
                res.json({status: 0})
            }
        })
    }

    registerNewCompany(req: express.Request, res: express.Response){
       /* console.log(req.body.company.firstname)
        console.log(req.body.company.lastname)
        console.log(req.body.company.username)
        console.log(req.body.company.email)
        console.log(req.body.company.phone)
        console.log(req.body.company.password)
        console.log(req.body.company.address)
        console.log(req.body.company.companyName)
        console.log(req.body.company.category)
        console.log(req.body.company.activityCodes)
        console.log(req.body.company.PDVsystem)
        for(let acc of req.body.company.bankAccounts){
            console.log(acc.accountNumber)
            console.log(acc.bank)
        }
        for(let unit of req.body.company.storageUnits){
            console.log(unit.id)
            console.log(unit.name)
        }
        for(let reg of req.body.company.cashRegisters){
            console.log(reg.type)
            console.log(reg.address)
        }
        res.json({message: 'ok'})
        */
        CompanyModel.findOne({$or: [{companyID: req.body.company.companyID}, {username: req.body.company.username}, {email: req.body.company.email}, {pib: req.body.company.pib}, {companyName: req.body.company.companyName}]}, (err, company) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                if(company != null){
                    console.log("Company with same ID or name or username or pib or email exists")
                    res.json({status: 1})
                }
                else{
                    let newCompany = new CompanyModel({
                        active: true,
                        firstLogin: req.body.company.firstLogin,
                        firstname: req.body.company.firstname,
                        lastname: req.body.company.lastname,
                        username: req.body.company.username,
                        password: req.body.company.password,
                        phone: req.body.company.phone,
                        email: req.body.company.email,
                        companyName: req.body.company.companyName,
                        companyID: req.body.company.companyID,
                        pib: req.body.company.pib,
                        category: req.body.company.category,
                        activityCodes: req.body.company.activityCodes,
                        PDVsystem: req.body.company.PDVsystem,
                        address: req.body.company.address,
                        bankAccounts: req.body.company.bankAccounts,
                        storageUnits: req.body.company.storageUnits,
                        cashRegisters: req.body.company.cashRegisters,
                        imageSrc: req.body.company.imageSrc,
                        items: new Array(),
                        orderers: new Array(),
                        itemCategories: new Array()
                    })
            
                    newCompany.save((err, company) => {
                        if(err){
                            console.log(err)
                            res.json({status: -1})
                        }
                        else{
                            console.log(company)
                            res.json({status: 0})
                        }
                    })
                }
            }
        })
    }

    getRegisterRequests(req: express.Request, res: express.Response){
        RegisterRequestModel.find({status: 0}, (err, requests) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log('getting requests')
                res.json({status: 0, requests: requests})
            }
        })
    }

    updateRegisterRequest(req: express.Request, res: express.Response){
        RegisterRequestModel.updateOne({companyID: req.body.request.companyID, companyName: req.body.request.companyName}, {$set: {status: req.body.newStatus}}, (err) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log('Status updated')
                res.json({status: 0})
            }
        })
    }

    getAllCompanies(req: express.Request, res: express.Response){
        CompanyModel.find({active: true}, (err, companies) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log(companies)
                res.json({status: 0, companies: companies})
            }
        })
    }

    deactivateCompany(req: express.Request, res: express.Response){
        let companyID = req.body.companyID
        let pib = req.body.pib
        let companyName = req.body.companyName

        CompanyModel.findOneAndUpdate({companyID: companyID, pib: pib, companyName: companyName}, {$set: {active: false}}, (err) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                res.json({status: 0})
            }
        })
    }
}