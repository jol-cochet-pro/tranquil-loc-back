import { Injectable } from '@nestjs/common';
import { Client } from 'node-mailjet';
import { TemplateName, TEMPLATES, TemplateVariables } from './template';

@Injectable()
export class MailService {
    private mailjet: Client;

    constructor() {
        const public_key = process.env.MJ_APIKEY_PUBLIC;
        const private_key = process.env.MJ_APIKEY_PRIVATE;
        if (!public_key || !private_key) {
            throw Error("Mailjet keys are not setup.");
        }
        this.mailjet = Client.apiConnect(
            public_key,
            private_key,
        );
    }

    async sendEmail<T extends TemplateName>(to: string, templateName: T, variables: TemplateVariables<T>) {
        await this.mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: {
                        Email: 'jolan.cochet.pro@gmail.com',
                        Name: 'Tranquil\'loc',
                    },
                    To: [{ Email: to }],
                    TemplateID: TEMPLATES[templateName].id,
                    Variables: variables
                }
            ]
        })
    }
}
