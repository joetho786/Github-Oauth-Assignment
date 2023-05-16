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
import { getRepos, createRepo, addFilestoRepo } from './apis';
import { readFileSync } from 'fs';

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
    const file = readFileSync('./src/templates/README.md');
    const content = Buffer.from(file).toString('base64');
    console.log(content);
    const created = await createRepo(body.sessionid, body);
    try{
      if (created) {
        var user = await this.authService.getUserDetails(body.sessionid);
        var added = await addFilestoRepo(body.sessionid,body.name, user.username, content);
        console.log(added);
        return { message: 'Repo created successfully', success: true };
      } else {
        return { message: 'Repo creation failed', success: false };
      }
    }
    catch(err){
      return { message: `Repo creation failed | ${err}`, success: false };
    }
   
  }
}
