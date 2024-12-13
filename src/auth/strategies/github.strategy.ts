import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';
import githubOauthConfig from '../config/github-oauth.config';
import { AuthService } from '../auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(githubOauthConfig.KEY)
    private readonly githubConfig: ConfigType<typeof githubOauthConfig>,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: githubConfig.clientID,
      clientSecret: githubConfig.clientSecret,
      callbackURL: githubConfig.callbackURL,
      scope: ['public_profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: any,
  ) {
    // TODO
    // 崩溃 ~ 这比墙 根本无法认证~
    console.log(profile.emails);
    done(null, profile);
    // const user = await this.authService.validateGithubUser({
    //   email: profile.emails[0].value,
    //   name: profile.displayName,
    //   password: '',
    // });

    // done(null, user);
  }
}
