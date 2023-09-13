import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { DashboardController } from './dashboard/dashboard.controller';
import config from './config/keys'

@Module({
  imports: [
    UsersModule, 
    AuthModule, 
    MongooseModule.forRoot(config.MONGO_URI)
  ],
  controllers: [AppController, DashboardController],
  providers: [AppService],
})
export class AppModule {}
