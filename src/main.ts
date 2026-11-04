import express from 'express';
import {authController} from './modules'
import { globalErrorHandle } from './middleware';
import { connectDB } from './DB/db.connecttion';
import { PORT } from './config';
import { sendEmail } from './common/utils/email';
const app: express.Application = express();
app.use(express.json())

connectDB(app,PORT)
app.all('/',async (req: express.Request, res: express.Response):Promise<express.Response> => {
    return res.status(200).json("Welcome In BackEnd API")
});
app.use('/auth',authController)
app.use(globalErrorHandle)


// sendEmail({
//     to: "zxcamarmohamed147@gmail.com",
//     subject: "Test Email",
//     html: "<h1>Test Email</h1><p>This is a test email sent from the backend.</p>"
// })