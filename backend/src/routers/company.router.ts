import express from 'express'
import { CompanyController } from '../controllers/company.controller'

const companyRouter = express.Router()

companyRouter.route('/makeRegisterRequest').post(
    (req, res) => new CompanyController().makeRegisterRequest(req, res)
)

companyRouter.route('/login').post(
    (req, res) => new CompanyController().login(req, res)
)

companyRouter.route('/changePassword').post(
    (req, res) => new CompanyController().changePassword(req, res)
)

companyRouter.route('/firstLoginInfoUpdate').post(
    (req, res) => new CompanyController().firstLoginInfoUpdate(req, res)
)

companyRouter.route('/updateInfo').post(
    (req, res) => new CompanyController().updateInfo(req, res)
)

companyRouter.route('/registerNewBankAccount').post(
    (req, res) => new CompanyController().registerNewBankAccount(req, res)
)

companyRouter.route('/deleteAccount').post(
    (req, res) => new CompanyController().deleteAccount(req, res)
)

companyRouter.route('/deleteStorageUnit').post(
    (req, res) => new CompanyController().deleteStorageUnit(req, res)
)

companyRouter.route('/registerNewStorageUnit').post(
    (req, res) => new CompanyController().registerNewStorageUnit(req, res)
)

companyRouter.route('/registerNewCashRegister').post(
    (req, res) => new CompanyController().registerNewCashRegister(req, res)
)

companyRouter.route('/deleteCashRegister').post(
    (req, res) => new CompanyController().deleteCashRegister(req, res)
)

companyRouter.route('/addNewProduct').post(
    (req, res) => new CompanyController().addNewProduct(req, res)
)

companyRouter.route('/getAllItems').post(
    (req, res) => new CompanyController().getAllItems(req, res)
)

companyRouter.route('/deleteItem').post(
    (req, res) => new CompanyController().deleteItem(req, res)
)

companyRouter.route('/updateItem').post(
    (req, res) => new CompanyController().updateItem(req, res)
)

companyRouter.route('/getAllCompanies').get(
    (req, res) => new CompanyController().getAllCompanies(req, res)
)

companyRouter.route('/addNewOrderer').post(
    (req, res) => new CompanyController().addNewOrderer(req, res)
)

companyRouter.route('/addNewItemCategory').post(
    (req, res) => new CompanyController().addNewItemCategory(req, res)
)

companyRouter.route('/addNewItemSubCategory').post(
    (req, res) => new CompanyController().addNewItemSubCategory(req, res)
)

companyRouter.route('/assignCategoryToProduct').post(
    (req, res) => new CompanyController().assignCategoryToProduct(req, res)
)

companyRouter.route('/assignSubCategoryToProduct').post(
    (req, res) => new CompanyController().assignSubCategoryToProduct(req, res)
)

companyRouter.route('/addNewSection').post(
    (req, res) => new CompanyController().addNewSection(req, res)
)

companyRouter.route('/deleteSection').post(
    (req, res) => new CompanyController().deleteSection(req, res)
)

companyRouter.route('/addNewTable').post(
    (req, res) => new CompanyController().addNewTable(req, res)
)

companyRouter.route('/deleteTable').post(
    (req, res) => new CompanyController().deleteTable(req, res)
)

companyRouter.route('/moveTable').post(
    (req, res) => new CompanyController().moveTable(req, res)
)

companyRouter.route('/updateStorageStock').post(
    (req, res) => new CompanyController().updateStorageStock(req, res)
)


export default companyRouter