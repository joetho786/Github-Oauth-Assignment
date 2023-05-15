import {
  Controller,
  Get,
  Render,
  Query,
  Res,
  Body,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/service/auth.service';
import { getRepos, createRepo } from './apis';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get('index')
  @Render('index')
  root() {
    return { message: this.appService.getHello() };
  }

  @Get()
  @Render('home')
  async home(@Query('sessionid') sessionid: string, @Res() res) {
    const verify = await this.authService.checkIsAuthenticated(sessionid);
    // console.log(verify);
    if (verify) {
      const repos = await getRepos(sessionid);
      // console.log(repos);
      return { repos: repos, username: verify.username };
    } else {
      res.redirect('/index');
    }
  }

  @Post('createRepo')
  async createRepo(@Body() body) {
    // console.log(body);
    if (body.private == 'true') {
      body.private = true;
    } else {
      body.private = false;
    }
    // console.log(body);
    const created = await createRepo(body.sessionid, body);
    if (created) {
      return { message: 'Repo created successfully', success: true };
    } else {
      return { message: 'Repo creation failed', success: false };
    }
  }
}
