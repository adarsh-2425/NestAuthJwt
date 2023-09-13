import { Module } from '@nestjs/common';
import { UserSchema } from 'src/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose'
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtMiddleware } from 'src/middlewares/jwt.middleware';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
  providers: [AuthService, JwtMiddleware],
  controllers: [AuthController]
})
export class AuthModule {}
