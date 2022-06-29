import { AuthService } from './../auth.service';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-jwt'
import { JwtPayload } from '../models/jwt-payload.model';
import { User } from 'src/users/models/users.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService) {
            super({
                jwtFromRequest: AuthService.returnJwtExtractor(),
                ignorExpiration: false,
                secretOrKey: process.env.JWT_SECRET,
            });
    }

    async validade(jwtPayload: JwtPayload): Promise<User> {
        const user = await this.authService.validateUser(jwtPayload);
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}