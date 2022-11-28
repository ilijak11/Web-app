import express from 'express'
import RegisterRequestModel from '../models/registerRequest'
import CompanyModel from '../models/company'
import e from 'express'


export class CompanyController{
    
    makeRegisterRequest(req: express.Request, res: express.Response){
        console.log('Register new company request')
        CompanyModel.findOne({$or: [{companyID: req.body.companyRequest.companyID}, {email: req.body.companyRequest.email}, {username: req.body.companyRequest.username}, {pib: req.body.companyRequest.pib},  {companyName: req.body.companyRequest.companyName}]}, (err, company) => {
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
                    let newRequest = new RegisterRequestModel({
                        firstname: req.body.companyRequest.firstname,
                        lastname: req.body.companyRequest.lastname,
                        username: req.body.companyRequest.username,
                        password: req.body.companyRequest.password,
                        phone: req.body.companyRequest.phone,
                        email: req.body.companyRequest.email,
                        companyName: req.body.companyRequest.companyName,
                        companyID: req.body.companyRequest.companyID,
                        pib: req.body.companyRequest.pib,
                        address: req.body.companyRequest.address,
                        imageSrc: req.body.companyRequest.imageSrc,
                        status: 0
                       })
                
                       newRequest.save((err, request) => {
                        if(err){
                            console.log(err)
                            res.json({status: -1})
                        }
                        else{
                            console.log(request)
                            res.json({status: 0})
                        }
                       })
                }
            }
        })
    }

    login(req: express.Request, res: express.Response){
        CompanyModel.findOne({username: req.body.username, password: req.body.password}, (err, company) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                if(company != null){
                    if(company.active == false){
                        res.json({status: 2})
                    }
                    else{
                        console.log(`Company: ${req.body.username} logged in`)
                        res.json({status: 0, company: company})
                    }
                }
                else{
                    res.json({status: 1})
                }
            }
        })
    }

    changePassword(req: express.Request, res: express.Response){
        CompanyModel.updateOne({companyID: req.body.companyID, username: req.body.username, companyName: req.body.companyName},
            {$set: {password: req.body.newPass}}, (err) => {
                if(err){
                    console.log(err)
                    res.json({status: -1})
                }
                else{
                    console.log(`Company: ${req.body.companyName} changed password to: ${req.body.newPass}`) //obrisi
                    res.json({status: 0})
                }
            })
    }

    firstLoginInfoUpdate(req: express.Request, res: express.Response){
        CompanyModel.findOneAndUpdate({companyID: req.body.companyID, companyName: req.body.companyName},
            {$set: {category: req.body.category,
                    activityCodes: req.body.activityCodes,
                    PDVsystem: req.body.PDVsystem,
                    bankAccounts: req.body.bankAccounts,
                    storageUnits: req.body.storageUnits,
                    cashRegisters: req.body.cashRegisters,
                    items: new Array(),
                    orderers: new Array(),
                    itemCategories: new Array(),
                    firstLogin: false}}, {new: true}, (err, company) => {

            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log(company)
                res.json({status: 0, company: company})
            }
        })


    }

    updateInfo(req: express.Request, res: express.Response){
        let updateType = req.body.updateType
        let companyID = req.body.companyID
        let update = req.body.update
        console.log(companyID)
        console.log(updateType)
        console.log(update)
        switch(updateType){
            case 1: {
                CompanyModel.findOneAndUpdate({companyID: companyID}, {$set: {companyName: update}}, {new: true}, (err, company) => {
                    if(err){
                        console.log(err)
                        res.json({status: -1})
                    }
                    else{
                        console.log(company)
                        res.json({status: 0, company: company})
                    }
                })
                break;
            }
            case 2: {
                CompanyModel.findOneAndUpdate({companyID: companyID}, {$set: {category: update}}, {new: true}, (err, company) => {
                    if(err){
                        console.log(err)
                        res.json({status: -1})
                    }
                    else{
                        console.log(company)
                        res.json({status: 0, company: company})
                    }
                })
                break;
            }
            case 3: {
                CompanyModel.findOneAndUpdate({companyID: companyID}, {$set: {activityCodes: update}}, {new: true}, (err, company) => {
                    if(err){
                        console.log(err)
                        res.json({status: -1})
                    }
                    else{
                        console.log(company)
                        res.json({status: 0, company: company})
                    }
                })
                break;
            }
            case 4: {
                CompanyModel.findOneAndUpdate({companyID: companyID}, {$set: {PDVsystem: update}}, {new: true}, (err, company) => {
                    if(err){
                        console.log(err)
                        res.json({status: -1})
                    }
                    else{
                        console.log(company)
                        res.json({status: 0, company: company})
                    }
                })
                break;
            }
            case 5:{
                CompanyModel.findOneAndUpdate({companyID: companyID}, {$set: {'address.country': update}}, {new: true}, (err, company) => {
                    if(err){
                        console.log(err)
                        res.json({status: -1})
                    }
                    else{
                        console.log(company)
                        res.json({status: 0, company: company})
                    }
                })
                break;
            }
            case 6:{
                CompanyModel.findOneAndUpdate({companyID: companyID}, {$set: {'address.city': update}}, {new: true}, (err, company) => {
                    if(err){
                        console.log(err)
                        res.json({status: -1})
                    }
                    else{
                        console.log(company)
                        res.json({status: 0, company: company})
                    }
                })
                break;
            }
            case 7:{
                CompanyModel.findOneAndUpdate({companyID: companyID}, {$set: {'address.postCode': update}}, {new: true}, (err, company) => {
                    if(err){
                        console.log(err)
                        res.json({status: -1})
                    }
                    else{
                        console.log(company)
                        res.json({status: 0, company: company})
                    }
                })
                break;
            }
            case 8:{
                CompanyModel.findOneAndUpdate({companyID: companyID}, {$set: {'address.street': update}}, {new: true}, (err, company) => {
                    if(err){
                        console.log(err)
                        res.json({status: -1})
                    }
                    else{
                        console.log(company)
                        res.json({status: 0, company: company})
                    }
                })
                break;
            }
            case 9:{
                CompanyModel.findOneAndUpdate({companyID: companyID}, {$set: {'address.streetNumber': update}}, {new: true}, (err, company) => {
                    if(err){
                        console.log(err)
                        res.json({status: -1})
                    }
                    else{
                        console.log(company)
                        res.json({status: 0, company: company})
                    }
                })
                break;
            }
            case 10:{
                CompanyModel.findOneAndUpdate({companyID: companyID}, {$set: {firstname: update}}, {new: true}, (err, company) => {
                    if(err){
                        console.log(err)
                        res.json({status: -1})
                    }
                    else{
                        console.log(company)
                        res.json({status: 0, company: company})
                    }
                })
                break;
            }
            case 11:{
                CompanyModel.findOneAndUpdate({companyID: companyID}, {$set: {lastname: update}}, {new: true}, (err, company) => {
                    if(err){
                        console.log(err)
                        res.json({status: -1})
                    }
                    else{
                        console.log(company)
                        res.json({status: 0, company: company})
                    }
                })
                break;
            }
            case 12:{
                CompanyModel.findOneAndUpdate({companyID: companyID}, {$set: {username: update}}, {new: true}, (err, company) => {
                    if(err){
                        console.log(err)
                        res.json({status: -1})
                    }
                    else{
                        console.log(company)
                        res.json({status: 0, company: company})
                    }
                })
                break;
            }
            case 13:{
                CompanyModel.findOneAndUpdate({companyID: companyID}, {$set: {phone: update}}, {new: true}, (err, company) => {
                    if(err){
                        console.log(err)
                        res.json({status: -1})
                    }
                    else{
                        console.log(company)
                        res.json({status: 0, company: company})
                    }
                })
                break;
            }
            case 14:{
                CompanyModel.findOneAndUpdate({companyID: companyID}, {$set: {email: update}}, {new: true}, (err, company) => {
                    if(err){
                        console.log(err)
                        res.json({status: -1})
                    }
                    else{
                        console.log(company)
                        res.json({status: 0, company: company})
                    }
                })
                break;
            }
            case 15:{
                CompanyModel.findOneAndUpdate({companyID: companyID}, {$set: {imageSrc: update}}, {new: true}, (err, company) => {
                    if(err){
                        console.log(err)
                        res.json({status: -1})
                    }
                    else{
                        console.log(company)
                        res.json({status: 0, company: company})
                    }
                })
                break;
            }
        }
    }

    registerNewBankAccount(req: express.Request, res: express.Response){
        let companyID = req.body.companyID
        let bankAccount = req.body.bankAccount

        CompanyModel.findOneAndUpdate({companyID: companyID}, {$push: {bankAccounts: bankAccount}}, {new: true}, (err, company) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log(company)
                res.json({status: 0, company: company})
            }
        })
    }

    deleteAccount(req: express.Request, res: express.Response){
        let companyID = req.body.companyID
        let bankAccount = req.body.bankAccount

        CompanyModel.findOneAndUpdate({companyID: companyID}, {$pull: {bankAccounts: bankAccount}}, {new: true}, (err, company) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log(company)
                res.json({status: 0, company: company})
            }
        })
    }

    deleteStorageUnit(req: express.Request, res: express.Response){
        let companyID = req.body.companyID
        let unit = req.body.storageUnit

        CompanyModel.findOneAndUpdate({companyID: companyID}, {$pull: {storageUnits: unit}}, {new: true}, (err, company) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log(company)
                res.json({status: 0, company: company})
            }
        })
    }

    registerNewStorageUnit(req: express.Request, res: express.Response){
        let companyID = req.body.companyID
        let unit = req.body.storageUnit

        CompanyModel.findOneAndUpdate({companyID: companyID}, {$push: {storageUnits: unit}}, {new: true}, (err, company) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log(company)
                res.json({status: 0, company: company})
            }
        })
    }

    deleteCashRegister(req: express.Request, res: express.Response){
        let companyID = req.body.companyID
        let cashRegister = req.body.cashRegister

        CompanyModel.findOneAndUpdate({companyID: companyID}, {$pull: {cashRegisters: cashRegister}}, {new: true}, (err, company) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log(company)
                res.json({status: 0, company: company})
            }
        })
    }

    registerNewCashRegister(req: express.Request, res: express.Response){
        let companyID = req.body.companyID
        let cashRegister = req.body.cashRegister

        CompanyModel.findOneAndUpdate({companyID: companyID}, {$push: {cashRegisters: cashRegister}}, {new: true}, (err, company) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log(company)
                res.json({status: 0, company: company})
            }
        })
    }

    addNewProduct(req: express.Request, res: express.Response){
        let companyID = req.body.companyID
        let item = req.body.item

        CompanyModel.findOne({companyID: companyID, 'items.id': item.id}, (err, itemDB) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                if(!itemDB){
                    CompanyModel.findOneAndUpdate({companyID: companyID}, {$push: {items: item}}, {new: true}, (err, company) => {
                        if(err){
                            console.log(err)
                            res.json({status: -1})
                        }
                        else{
                            console.log(company)
                            res.json({status: 0, company: company})
                        }
                    })
                }
                else{
                    res.json({status: 1})
                }
            }
        })
    }

    getAllItems(req: express.Request, res: express.Response){
        CompanyModel.findOne({companyID: req.body.companyID}, (err, company) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                if(company){
                    console.log(`Company: ${company.companyName}-${company.companyID} requested all items`)
                    res.json({stauts: 0, items: company.items})
                }
                else{
                    res.json({status: 1})
                }
            }
        })
    }

    deleteItem(req: express.Request, res: express.Response){
        let companyID = req.body.companyID
        let item = req.body.item

        CompanyModel.findOneAndUpdate({companyID: companyID}, {$pull: {items: item}}, {new: true}, (err, company) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log(company)
                res.json({status: 0, items: company.items})
            }
        })
    }

    updateItem(req: express.Request, res: express.Response){
        let companyID = req.body.companyID
        let oldItem = req.body.oldItem
        let updatedItem = req.body.updatedItem

        CompanyModel.findOne({companyID: companyID, 'items.id': updatedItem.id}, (err, itemDB) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                if(!itemDB){
                    CompanyModel.findOneAndUpdate({companyID: companyID, 'items.id': oldItem.id}, {$set: {'items.$': updatedItem}}, (err, company) => {
                        if(err){
                            console.log(err)
                            res.json({status: -1})
                        }
                        else{
                            res.json({status: 0})
                        }
                    })
                }
                else{
                    if(oldItem.id != updatedItem.id){
                        res.json({status: 1})
                    }
                    else{
                        CompanyModel.findOneAndUpdate({companyID: companyID, 'items.id': oldItem.id}, {$set: {'items.$': updatedItem}}, (err, company) => {
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
            }
        })
    }

    getAllCompanies(req: express.Request, res: express.Response){
        CompanyModel.find({}, {firstname: true,
                                lastname: true,
                                username: true, 
                                phone: true, 
                                email: true, 
                                companyName: true, 
                                companyID: true,
                                pib: true,
                                address: true }, (err, companies) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log('getting all companies')
                res.json({status: 0, companies: companies})
            }
        })
    }

    addNewOrderer(req: express.Request, res: express.Response){
        let companyID = req.body.companyID
        let orderer = req.body.orderer

        CompanyModel.findOneAndUpdate({companyID: companyID}, {$push: {orderers: orderer}}, {new: true}, (err, company) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log(company)
                res.json({status: 0, company: company})
            }
        })
    }

    deleteOrderer(req: express.Request, res: express.Response){
        let companyID = req.body.companyID
        let orderer = req.body.orderer

        CompanyModel.findOneAndUpdate({companyID: companyID}, {$pull: {orderers: orderer}}, {new: true}, (err, company) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log('Company deleted orderer')
                console.log(company)
                res.json({status: 0, company: company})
            }
        })
    }

    addNewItemCategory(req: express.Request, res: express.Response){
        let companyID = req.body.companyID
        let itemCategory = req.body.itemCategory

        CompanyModel.findOneAndUpdate({companyID: companyID}, {$push: {itemCategories: itemCategory}}, {new: true}, (err, company) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log('Company added new category')
                console.log(company)
                res.json({status: 0, company: company})
            }
        })
    }

    addNewItemSubCategory(req: express.Request, res: express.Response){
        let companyID = req.body.companyID
        let itemCategory = req.body.itemCategory
        let subCategory = req.body.subCategory


        CompanyModel.findOneAndUpdate({companyID: companyID, 'itemCategories.category': itemCategory.category}, {$push: {'itemCategories.$.subCategories': subCategory}}, {new: true}, (err, company) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log('Company added new subcategory')
                console.log(company)
                res.json({status: 0, company: company})
            }
        })
    }

    assignCategoryToProduct(req: express.Request, res: express.Response){
        let companyID = req.body.companyID
        let itemID = req.body.itemID
        let category = req.body.category

        CompanyModel.findOneAndUpdate({companyID: companyID, 'items.id': itemID}, {$set: {'items.$.category': category}}, {new: true}, (err, company) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log('Updated item category')
                console.log(company)
                res.json({status: 0, company: company})
            }
        })
    }

    assignSubCategoryToProduct(req: express.Request, res: express.Response){
        let companyID = req.body.companyID
        let itemID = req.body.itemID
        let category = req.body.category
        let subCategory = req.body.subCategory

        CompanyModel.findOneAndUpdate({companyID: companyID, 'items.id': itemID}, {$set: {'items.$.category': category, 'items.$.subCategory': subCategory}}, {new: true}, (err, company) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log('Updated item category')
                console.log(company)
                res.json({status: 0, company: company})
            }
        })
    }

    addNewSection(req: express.Request, res: express.Response){
        let companyID = req.body.companyID
        let objectID = req.body.objectID
        let section = req.body.section

        CompanyModel.findOneAndUpdate({companyID: companyID, 'cashRegisters.id': objectID}, {$push: {'cashRegisters.$.sections': section}}, {new: true}, (err, company) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log('Added new section to object')
                console.log(company)
                res.json({status: 0, company: company})
            }
        })
    }

    deleteSection(req: express.Request, res: express.Response){
        let companyID = req.body.companyID
        let objectID = req.body.objectID
        let section = req.body.section

        CompanyModel.findOneAndUpdate({companyID: companyID, 'cashRegisters.id': objectID}, {$pull: {'cashRegisters.$.sections': section}}, {new: true}, (err, company) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log('Deleted section')
                console.log(company)
                res.json({status: 0, company: company})
            }
        })
    }

    addNewTable(req: express.Request, res: express.Response){
        let companyID = req.body.companyID
        let objectID = req.body.objectID
        let sectionName = req.body.sectionName
        let table = req.body.table

        CompanyModel.findOneAndUpdate({companyID: companyID, 'cashRegisters.id': objectID, 'cashRegisters.$.sections.name': sectionName}, {$push: {'cashRegisters.$.sections.$[i].tables': table}}, {arrayFilters: [{'i.name': sectionName}]}, (err, company) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log('Added new table to section')
                CompanyModel.findOne({companyID: companyID}, (err, company) => {
                    if(err){
                        console.log(err)
                        res.json({status: -1})
                    }
                    else{
                        res.json({status: 0, company: company})
                    }
                })
            }
        })
    }

    deleteTable(req: express.Request, res: express.Response){
        let companyID = req.body.companyID
        let objectID = req.body.objectID
        let sectionName = req.body.sectionName
        let table = req.body.table

        CompanyModel.findOneAndUpdate({companyID: companyID, 'cashRegisters.id': objectID, 'cashRegisters.$.sections.name': sectionName}, {$pull: {'cashRegisters.$.sections.$[i].tables': table}}, {arrayFilters: [{'i.name': sectionName}]}, (err, company) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log('Table deleted')
                CompanyModel.findOne({companyID: companyID}, (err, company) => {
                    if(err){
                        console.log(err)
                        res.json({status: -1})
                    }
                    else{
                        console.log(company)
                        res.json({status: 0, company: company})
                    }
                })
            }
        })
    }

    moveTable(req: express.Request, res: express.Response){
        let companyID = req.body.companyID
        let objectID = req.body.objectID
        let sectionName = req.body.sectionName
        let table = req.body.table

        console.log(table)

        CompanyModel.findOneAndUpdate({companyID: companyID, 'cashRegisters.id': objectID, 'cashRegisters.$.sections.name': sectionName}, {$set: {'cashRegisters.$.sections.$[i].tables.$[j].x': table.x, 'cashRegisters.$.sections.$[i].tables.$[j].y': table.y}}, {arrayFilters: [{'i.name': sectionName}, {'j.id': table.id}]}, (err, company) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log('Table deleted')
                CompanyModel.findOne({companyID: companyID}, (err, company) => {
                    if(err){
                        console.log(err)
                        res.json({status: -1})
                    }
                    else{
                        console.log(company)
                        res.json({status: 0, company: company})
                    }
                })
            }
        })
    }

    updateStorageStock(req: express.Request, res: express.Response){
        let companyID = req.body.companyID
        let itemID = req.body.itemID
        let storageID = req.body.storageID
        let storageName = req.body.storageName
        let quantity = req.body.quantity

        CompanyModel.findOneAndUpdate({companyID: companyID, 'items.id': itemID}, {$inc: {'items.$.storage.$[i].currentStock': quantity}}, {arrayFilters: [{'i.id': storageID, 'i.name': storageName}]}, (err) => {
            if(err){
                console.log(err)
                res.json({status: -1})
            }
            else{
                console.log(`Company: ${companyID} - updated stock for item: ${itemID} storage: ${storageID}, ${storageName}, quantity: -${quantity}`)
                res.json({status: 0})
            }
        })
    }
}