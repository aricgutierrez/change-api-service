import nodemailer from "nodemailer";
import path from 'path';
import fs from 'node:fs/promises';
import { TemplateUtilitiesService } from "../utilities/template.utilities.service";

export class Sendservice {

  private static path() {
    let _configMailer = {
        service: "gmail",
        auth: { 
            user: process.env["AUTH_EMAIL_USER"], 
            pass: process.env["AUTH_EMAIL_PWD"] 
        },
      };
    return nodemailer.createTransport(_configMailer);
  }

  public static async run( to: string, email : { subject: string , body : { [key: string]: boolean | number | string; } }, template: string): Promise<any> {
    const fileEnviroment = path.join(__dirname, "./../../templates/" , template);
    const data = await fs.readFile( fileEnviroment, { encoding: 'utf8' });
    const mailOptions = {
      from: process.env["AUTH_EMAIL_USER"],
      to,
      subject: email.subject,
      html: TemplateUtilitiesService.replaceParams(data , email.body)
    };
    return new Promise((success, fail) => {
      Sendservice.path().sendMail(mailOptions, function (error, info: any) {
        if (error) {
          fail(error);
        } else {
          success({id: info.messageId, status: info.response, reject: info.rejected, time: info.messageTime });
        }
      });
    });
  }
}
