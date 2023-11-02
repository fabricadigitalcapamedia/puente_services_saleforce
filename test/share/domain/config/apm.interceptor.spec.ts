import { ApmInterceptor } from '../../../../src/share/domain/config/apm.interceptor';
import { Test, TestingModule } from '@nestjs/testing';
import { throwError } from 'rxjs';
import { ApmService } from '../../../../src/share/domain/config/apm.service';

jest.mock('../../../../src/share/domain/config/apm.service');

describe('ApmInterceptor', () => {
  let service: ApmService;
  let interceptor: ApmInterceptor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApmService, ApmInterceptor],
    }).compile();

    service = module.get<ApmService>(ApmService);

    interceptor = module.get<ApmInterceptor>(ApmInterceptor);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  describe('#intercept', () => {
    const executionContext: any = {
      getArgs: jest.fn().mockReturnThis(),
    };

    it('apm capture error', (done) => {
      const callHandler: any = {
        handle: () => throwError(() => 'test error'),
      };
      (executionContext.getArgs as jest.Mock<any, any>).mockReturnValueOnce([
        {
          method: 'method',
          url: 'url',
        },
      ]);

      interceptor.intercept(executionContext, callHandler).subscribe({
        error: () => done(),
      });
      expect(service.captureError).toHaveBeenCalled();
    });
  });
});
