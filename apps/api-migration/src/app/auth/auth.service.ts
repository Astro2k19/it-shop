import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService,
              private readonly jwtService: JwtService,) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      const {password, ...result} = user
      return result
    }
    return null
  }

  login(user: any) {
    const payload = {sub: user.id}
    return {
      accessToken: this.jwtService.sign(payload)
    }
  }
}
