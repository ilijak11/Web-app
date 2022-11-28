import express from 'express'
import { BillController } from '../controllers/bill.controller'

const billRouter = express.Router()

billRouter.route('/addNewBill').post(
    (req, res) => new BillController().addNewBill(req, res)
)

billRouter.route('/getAllCompanyBills').post(
    (req, res) => new BillController().getAllCompanyBills(req, res)
)

billRouter.route('/getAllBills').get(
    (req, res) => new BillController().getAllBills(req, res)
)

billRouter.route('/getUserBills').post(
    (req, res) => new BillController().getUserBills(req, res)
)



export default billRouter