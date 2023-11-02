import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as APM from 'elastic-apm-node';
import { ApmService } from '../../../../src/share/domain/config/apm.service';
import configuration from '../../../../src/share/domain/resources/env.config';

jest.mock('elastic-apm-node');

describe('ApmService', () => {
  let service: ApmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
        }),
      ],
      providers: [ApmService],
    }).compile();

    service = module.get<ApmService>(ApmService);
  });

  it('apmService should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Apm Methods', () => {
    it('should call isStarted', () => {
      service.isStarted();
      expect(APM.isStarted).toHaveBeenCalled();
    });

    it('should call captureError', () => {
      service.captureError({});
      expect(APM.captureError).toHaveBeenCalled();
    });

    it('should call startTransaction', () => {
      service.startTransaction('name');
      expect(APM.isStarted).toBeDefined();
    });

    it('should call setTransactionName', () => {
      service.setTransactionName('name');
      expect(APM.setTransactionName).toHaveBeenCalled();
    });

    it('should call endTransaction', () => {
      service.endTransaction();
      expect(APM.endTransaction).toHaveBeenCalled();
    });

    it('should call startSpan', () => {
      service.startSpan('name', 'type', 'subtype', 'action');
      expect(APM.startSpan).toHaveBeenCalled();
    });
  });
});
