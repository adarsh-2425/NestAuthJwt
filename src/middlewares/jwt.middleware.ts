import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class JwtMiddleware extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secret', 
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUserById(payload.sub);
    console.log(payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}