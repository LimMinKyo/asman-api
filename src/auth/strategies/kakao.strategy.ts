import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly usersService: UsersService) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
      scope: ['account_email', 'profile_nickname'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const name = profile.displayName;
    const email = profile._json.kakao_account.email;
    const provider = profile.provider;
    // const profileImage = profile._json.properties.profile_image;

    const user = await this.usersService.findOneByEmailOrSave(
      email,
      name,
      provider,
    );

    return user;
  }
}
