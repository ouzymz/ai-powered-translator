import { Module } from '@nestjs/common';
import { GoogleApiService } from './google-apr.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [],
  providers: [GoogleApiService],
  exports: [],
})
export class TranslatorGoogleApiModule {}
