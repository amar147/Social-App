"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailEvent = void 0;
const node_events_1 = require("node:events");
const send_email_1 = require("./send.email");
exports.emailEvent = new node_events_1.EventEmitter();
exports.emailEvent.on('sendEmail', async ({ recipients, subject, html }) => {
    await (0, send_email_1.sendEmail)({
        ...recipients,
        subject,
        html,
    });
});
