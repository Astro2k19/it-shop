import nodemailer, {Transporter} from 'nodemailer'
import SMTPTransport from "nodemailer/lib/smtp-transport";

interface SendEmailOptions {
  to: string
  subject: string
  message: string
}

class MailService {
  private transporter: Transporter<SMTPTransport.SentMessageInfo>

    constructor() {
        this.transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          secure: false, // Use `true` for port 465, `false` for all other ports
          auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASS,
          },
          tls: {
            rejectUnauthorized: false
          }
        })
    }

    async sendEmail(options: SendEmailOptions) {
      const message = {
        from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.to,
        subject: options.subject,
        html: options.message,
      }

      await this.transporter.sendMail(message)
    }

}

export default new MailService()
