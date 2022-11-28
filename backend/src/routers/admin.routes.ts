import express from 'express'
import { AdminController } from '../controllers/admin.controller'

const adminRouter = express.Router()

adminRouter.route('/login').post(
    (req, res) => new AdminController().login(req, res)
)

adminRouter.route('/registerNewUser').post(
    (req, res) => new AdminController().registerNewUser(req, res)
)

adminRouter.route('/changePassword').post(
    (req, res) => new AdminController().changePassword(req, res)
)

adminRouter.route('/registerNewCompany').post(
    (req, res) => new AdminController().registerNewCompany(req, res)
)

adminRouter.route('/getRegisterRequests').get(
    (req, res) => new AdminController().getRegisterRequests(req, res)
)

adminRouter.route('/updateRegisterRequest').post(
    (req, res) => new AdminController().updateRegisterRequest(req, res)
)

adminRouter.route('/getAllCompanies').get(
    (req, res) => new AdminController().getAllCompanies(req, res)
)

adminRouter.route('/deactivateCompany').post(
    (req, res) => new AdminController().deactivateCompany(req, res)
)





export default adminRouter