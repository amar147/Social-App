import {EventEmitter} from 'node:events';
import { sendEmail } from './send.email';


export const emailEvent= new EventEmitter();
emailEvent.on('sendEmail',async ({recipients, subject, html})=>{
    await sendEmail({
        ...recipients,
        subject,
        html,
    })
})