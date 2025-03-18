import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExerciseController } from './exercise/exercise.controller';
import { Exercise } from './exercise/exercise.entity';
import { ExerciseService } from './exercise/exercise.service';
import { MeasureController } from './measure/measure.controller';
import { Measure } from './measure/measure.entity';
import { MeasureService } from './measure/measure.service';
import { UserController } from './user/user.controller';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "mssql",
      host: process.env.DB_HOST,
      port: 1433,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      options: {
        trustServerCertificate: true,
      },
      database: process.env.DB_NAME,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      Exercise,
      Measure,
      User,
    ]),
  ],
  controllers: [AppController, ExerciseController, MeasureController, UserController],
  providers: [AppService, ExerciseService, MeasureService, UserService],
})
export class AppModule {}
