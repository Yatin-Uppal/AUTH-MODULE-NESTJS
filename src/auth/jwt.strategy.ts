import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "../auth/schemas/user.schema";
import { Project } from '../project/schemas/project.schema';
import {Model} from "mongoose";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectModel(User.name)
        private userModel : Model<User>,
        //private projectModel : Model<Project>
    ){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : process.env.JWT_SECRET
        })
    }

    async validate(payload){
        const {id} = payload;
        const user = await this.userModel.findById(id);

        if(!user){
            throw new UnauthorizedException('login first to have access');
        }
        return user;
    }
}
