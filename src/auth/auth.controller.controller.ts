import { Controller, HttpException } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { Get, Query, Redirect } from '@nestjs/common';
import { DOMAIN, GITHUB_OAUTH_URL } from 'src/config';

@Controller('auth')
export class AuthControllerController {
  constructor(private readonly authService: AuthService) {}

  @Get('callback')
  @Redirect(DOMAIN, 302)
  async callback(@Query('code') code: string) {
    const res = await this.authService.verifyCode(code);
    // console.log(res);
    if (res) {
      return { url: `${DOMAIN}?sessionid=${res}` };
    } else {
      throw new HttpException('Unauthorized', 401);
    }
  }

  @Get('login')
  @Redirect(GITHUB_OAUTH_URL, 302)
  redirect() {
    return;
  }
}
