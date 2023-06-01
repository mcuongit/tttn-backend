import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { ExtractJwt } from 'passport-jwt';
// import fromAuthHeaderWithScheme = ExtractJwt.fromAuthHeaderWithScheme;
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginService } from 'src/login/login.service';
import { CreateLoginDto } from 'src/login/dto/create-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly loginService: LoginService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto) {
    const user = await this.userService.create(userDto);
    const token = await this._createToken(user);
    return {
      email: user.newUser.email,
      ...token,
    };
  }

  async login(loginUserDto: CreateLoginDto) {
    const user = await this.loginService.findLogin(loginUserDto);
    const token = await this._createToken(user);
    return {
      email: user.email,
      ...token,
    };
  }

  async handleVerifyToken(token: any) {
    try {
      const payload = this.jwtService.verify(token); // this.configService.get('SECRETKEY')
      return payload['email'];
    } catch (e) {
      throw new HttpException(
        {
          key: '',
          data: {},
          statusCode: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async validateUser(email: any) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  //   async getAccess2FA(user) {
  //     return this._createToken(user, true);
  //   }

  //   private async _createToken(
  //     { email },
  //     isSecondFactorAuthenticated = false,
  //     refresh = true,
  //   ) {
  //     const accessToken = this.jwtService.sign({
  //       email,
  //       isSecondFactorAuthenticated,
  //     });
  //     if (refresh) {
  //       const refreshToken = this.jwtService.sign(
  //         { email },
  //         {
  //           secret: process.env.SECRETKEY_REFRESH,
  //           expiresIn: process.env.EXPIRESIN_REFRESH,
  //         },
  //       );
  //       await this.userService.update(
  //         { email: email },
  //         {
  //           refreshToken: refreshToken,
  //         },
  //       );
  //       return {
  //         expiresIn: process.env.EXPIRESIN,
  //         accessToken,
  //         refreshToken,
  //         expiresInRefresh: process.env.EXPIRESIN_REFRESH,
  //       };
  //     } else {
  //       return {
  //         expiresIn: process.env.EXPIRESIN,
  //         accessToken,
  //       };
  //     }
  //   }

  private async _createToken({ email }: any) {
    const accessToken = this.jwtService.sign({
      email,
    });
    return {
      expiresIn: process.env.EXPIRESIN,
      accessToken,
    };
  }

  //   async refresh(refresh_token) {
  //     try {
  //       const payload = await this.jwtService.verify(refresh_token, {
  //         secret: process.env.SECRETKEY_REFRESH,
  //       });
  //       const user = await this.userService.getUserByRefresh(
  //         refresh_token,
  //         payload.email,
  //       );
  //       const token = await this._createToken(user, true, false);
  //       return {
  //         email: user.email,
  //         ...token,
  //       };
  //     } catch (e) {
  //       throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
  //     }
  //   }

  //   async logout(user: User) {
  //     await this.userService.update(
  //       { email: user.email },
  //       { refreshToken: null },
  //     );
  //   }
}
