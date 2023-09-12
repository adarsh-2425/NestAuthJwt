import { Module } from '@nestjs/common';
import { UserSchema } from 'src/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose'
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}