import { Test, TestingModule } from '@nestjs/testing';
import { timeout } from 'rxjs/operators';
import { ConfigModule } from '@nestjs/config';
import { TimeOutInterceptor } from '../../../../src/share/domain/config/timeout.interceptors';
import config from '../../../../src/share/domain/resources/env.config';

jest.mock('rxjs/operators');

describe('TimeOutInterceptor', () => {
  let interceptor: TimeOutInterceptor;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [TimeOutInterceptor],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
        }),
      ]
    }).compile();
    interceptor = moduleRef.get<TimeOutInterceptor>(TimeOutInterceptor);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });
  describe('#intercept', () => {
    const callHandler = {
      handle: jest.fn(),
    };

    it('timeout', async () => {
      callHandler.handle.mockImplementation(() => ({
        pipe: jest.fn(),
      }));
      await interceptor.intercept(undefined, callHandler);
      expect(timeout).toBeCalledWith(30000);
    });
  });
});
