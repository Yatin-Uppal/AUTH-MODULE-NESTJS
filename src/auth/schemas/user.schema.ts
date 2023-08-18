import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";


@Schema({
    timestamps : true,
})
export class User{

    timestamp : true

    @Prop()
    id : string;

    @Prop()
    name : string;

    @Prop({unique:[true, 'duplicate email entered']})
    email : string;

    @Prop()
    password : string;

}

export const userSchema = SchemaFactory.createForClass(User);

