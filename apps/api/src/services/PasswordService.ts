import nodemailer, {Transporter} from 'nodemailer'
import SMTPTransport from "nodemailer/lib/smtp-transport";
import crypto from "crypto";
import ms from "ms";
import bgcryp from "bcrypt";



class PasswordService {
  static SALT_OR_ROUNDS = 10


  getResetPasswordToken () {
    const resetToken = crypto.randomBytes(20).toString('hex')
    const hashedRestToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    const resetPasswordExpire = Date.now() + ms('15m')

    return {
      resetToken: hashedRestToken,
      resetPasswordExpire
    }
  }

  async hashPassword(password: string) {
    return await bgcryp.hash(password, PasswordService.SALT_OR_ROUNDS)
  }

}

export default new PasswordService()
