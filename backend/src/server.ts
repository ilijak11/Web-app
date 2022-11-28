import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import adminRouter from './routers/admin.routes';
import userRouter from './routers/user.routes';
import companyRouter from './routers/company.router';
import billRouter from './routers/bill.routes';

const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/projekat')
const connection = mongoose.connection
connection.once('open', () => {
    console.log("Connected to DB: proj")
})

const router = express.Router()

router.use('/admin', adminRouter)
router.use('/user', userRouter)
router.use('/company', companyRouter)
router.use('/bill', billRouter)
app.use('/', router)

app.listen(4000, () => console.log(`Express server running on port 4000`));