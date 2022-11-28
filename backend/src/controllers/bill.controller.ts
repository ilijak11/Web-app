import e from 'express'
import express from 'express'
import BillModel from '../models/bill'

export class BillController{

    addNewBill(req: express.Request, res: express.Response){
        let bill = req.body.bill

        let billDB = new BillModel({
            paymentMethod: bill.paymentMethod,
            userFirstname: bill.userFirstname,
            userLastname: bill.userLastname,
            userPaid: bill.userPaid,
            userChange: bill.userChange,
            billNumber: bill.billNumber,
            userID: bill.userID,
            companyID: bill.companyID,
            companyName: bill.companyName,
            pib: bill.pib,
            objectName: bill.objectName,
            virmanCompanyID: bill.virmanCompanyID,
            discount: bill.discount,
            paymentDeadline: bill.paymentDeadline,
            date: bill.date,
            price: bill.price,
            basePrice: bill.basePrice,
            items: bill.items
        })

        billDB.save((err) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log('adding new bill')
                res.json({status: 0})
            }
        })
    }

    getAllCompanyBills(req: express.Request, res: express.Response){
        let companyID = req.body.companyID

        BillModel.find({companyID: companyID}, (err, bills) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log(`Company: ${companyID} requested all bills`)
                res.json({status: 0, bills: bills})
            }
        })
    }

    getAllBills(req: express.Request, res: express.Response){
        BillModel.find({}, (err, bills) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log("Requesting all bills")
                res.json({status: 0, bills: bills})
            }
        })
    }

    getUserBills(req: express.Request, res: express.Response){
        let userID = req.body.userID

        BillModel.find({userID: userID}, (err, bills) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log(`User: ${userID} requested all bills`)
                res.json({status: 0, bills: bills})
            }
        })
    }
}