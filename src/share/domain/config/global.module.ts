import { APP_INTERCEPTOR } from '@nestjs/core';
import { Global, Module, Scope } from '@nestjs/common';

import { ApmService } from './apm.service';
import { ApmInterceptor } from './apm.interceptor';
import { ProcessTimeService } from './processTime.service';
import { TimeOutInterceptor } from './timeout.interceptors';
import { TransaccionIdProvider } from './transactionId.provider';

@Global()
@Module({
  providers: [
    TransaccionIdProvider,
    ProcessTimeService,
    ApmService,
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.DEFAULT,
      useClass: ApmInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.DEFAULT,
      useClass: TimeOutInterceptor,
    },
  ],
  exports: ['TransactionId', ApmService, ProcessTimeService],
})
export class GlobalModule {}
