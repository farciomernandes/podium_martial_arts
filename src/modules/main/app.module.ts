import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from '@modules/health/health.module';
import { MainModule } from '@modules/main/main.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from '@infra/typeorm/datasource.config';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { StudentModule } from '@modules/student/student.module';
import { PaymentModule } from '@modules/payment/payment.module';
import { CheckinModule } from '@modules/student/checkin.module';
import { ModalityModule } from '@modules/modality/modality.module';
import { ModalityScheduleModule } from '@modules/modality/modality-schedule.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 60, // default,
      max: 100, // número máximo de itens em cache
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000000000000, //miliseconds
        limit: 10000000, // requests
      },
    ]),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({}),
      dataSourceFactory: async () => {
        await dataSource.initialize();
        return dataSource;
      },
    }),
    HealthModule,
    MainModule,
    StudentModule,
    PaymentModule,
    CheckinModule,
    ModalityModule,
    ModalityScheduleModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
