import crypto from "crypto";
import ms from "ms";
import bgcryp from "bcrypt";

class PasswordService {
  private static readonly SALT_OR_ROUNDS = 10

  public static generateRandomToken(length: number) {
    return crypto.randomBytes(length).toString('hex')
  }

  public static hashToken(token: string) {
    return crypto.createHash('sha256').update(token).digest('hex')
  }

  public static getResetPasswordToken () {
    const resetToken = PasswordService.generateRandomToken(20)
    const hashedRestToken = PasswordService.hashToken(resetToken)
    const resetPasswordExpire = Date.now() + ms('15m')

    return {
      resetToken: hashedRestToken,
      resetPasswordExpire
    }
  }

  public static async hashPassword(password: string) {
    return await bgcryp.hash(password, PasswordService.SALT_OR_ROUNDS)
  }

}

export default PasswordService
