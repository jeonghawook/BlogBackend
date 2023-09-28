import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';


@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy,'kakao') {
  constructor() {
    super({
      clientID: '51f39f3e4994f41f3dd78b0a4d174a86',
      clientSecret: '',
      callbackURL: 'http://localhost:3000/users/kakao/callback',
    });
  }

  async validate(accessToken: string, refreshToken: string, data: any) {
    const response = data._json.kakao_account;
    const fullName = response.profile.nickname
    const email = response.email
    const user = {
      fullName,
      email
    }
    return  user ;
  }
}
