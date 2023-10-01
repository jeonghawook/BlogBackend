import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';


@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy,'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_ID,
      clientSecret: '',
      callbackURL: process.env.KAKAO_CALLBACK_URL,
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
