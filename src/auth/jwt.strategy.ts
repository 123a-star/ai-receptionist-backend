import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'my_super_secret_jwt_key_2026',
    });
  }

  // Jab token sahi nikalta hai, toh ye function usme se clientId nikal leta hai
  async validate(payload: any) {
    return { clientId: payload.clientId, email: payload.email };
  }
}