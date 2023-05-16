import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../user/user.entity';
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_TOKEN_URL,
} from 'src/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { getUser } from 'src/apis';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private httpService: HttpService,
  ) {}
  async verifyCode(code: string) {
    const params = {
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code: code,
    };

    // console.log(code)
    const response = await lastValueFrom(
      this.httpService.post(GITHUB_TOKEN_URL, params, {
        headers: { Accept: 'application/json' },
      }),
    );
    // console.log(response.data);
    const access_token = response.data.access_token || null;
    const refresh_token = response.data.refresh_token || null;
    // console.log(access_token);
    if (access_token) {
      const user_details = await getUser(access_token);
      user_details.refresh_token = refresh_token;
      // console.log(user_details);
      const user = await this.userRepository.findOne({
        where: { username: user_details.username },
      });
      try {
        if (user) {
          await this.userRepository.update(
            { username: user_details.username },
            user_details,
          );
        } else {
          await this.userRepository.save(user_details);
        }
      } catch (err) {
        console.log(err);
        throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      }

      return access_token;
    }

    return false;
  }

  async getUserDetails(sessionid: string) {
    const user = await this.userRepository.findOne({
        where: { access_token: sessionid },
        });
    return user;
    }
  async checkIsAuthenticated(sessionid: string) {
    // console.log("Session id",sessionid);
    if (sessionid != null && sessionid != undefined) {
      const user = await this.userRepository.findOne({
        where: { access_token: sessionid },
      });
      // console.log("Checking if authenticated");
      // console.log(user);
      if (user) {
        return user;
      } else {
        return false;
      }
    }
    return false;
  }
}
