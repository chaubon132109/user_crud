import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as bcrypt from 'bcrypt';
@Schema()
export class User extends Document{
    @Prop()
    id : string;
    @Prop()
    name : string;
    @Prop()
    username : string;
    @Prop()
    password : string;
}
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre<User>('save', async function(next) {
    const user = this;
    if(!user.isModified('password')){
        return next();
    }else{
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt)
        next();
    }
})