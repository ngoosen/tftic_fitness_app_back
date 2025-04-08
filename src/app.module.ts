import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ExerciseController } from "./exercise/exercise.controller";
import { Exercise } from "./exercise/exercise.entity";
import { ExerciseService } from "./exercise/exercise.service";
import { MeasureController } from "./measure/measure.controller";
import { Measure } from "./measure/measure.entity";
import { MeasureService } from "./measure/measure.service";
import { SeriesMeasureController } from './series-measure/series-measure.controller';
import { SeriesMeasure } from "./series-measure/series-measure.entity";
import { SeriesMeasureService } from './series-measure/series-measure.service';
import { SeriesController } from './series/series.controller';
import { Series } from "./series/series.entity";
import { SeriesService } from './series/series.service';
import { TrainingSessionExerciseController } from './training-session-exercise/training-session-exercise.controller';
import { TrainingSessionToExercise } from "./training-session-exercise/training-session-exercise.entity";
import { TrainingSessionExerciseService } from './training-session-exercise/training-session-exercise.service';
import { TrainingSessionController } from "./training-session/training-session.controller";
import { TrainingSession } from "./training-session/training-session.entity";
import { TrainingSessionService } from "./training-session/training-session.service";
import { UserController } from "./user/user.controller";
import { User } from "./user/user.entity";
import { UserService } from "./user/user.service";
import { AuthenticationService } from './user/authentication/authentication.service';

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
      TrainingSession,
      Series,
      TrainingSessionToExercise,
      SeriesMeasure,
    ]),
  ],
  controllers: [
    AppController,
    ExerciseController,
    MeasureController,
    UserController,
    TrainingSessionController,
    SeriesController,
    TrainingSessionExerciseController,
    SeriesMeasureController,
  ],
  providers: [
    AppService,
    ExerciseService,
    MeasureService,
    UserService,
    TrainingSessionService,
    SeriesService,
    TrainingSessionExerciseService,
    SeriesMeasureService,
    AuthenticationService,
  ],
})
export class AppModule {}
