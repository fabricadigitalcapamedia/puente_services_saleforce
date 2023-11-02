import { Test, TestingModule } from '@nestjs/testing';
import { OracleService } from '../../../../src/share/infrastructure/oracle/oracle.service';
import { ConfigModule } from '@nestjs/config';
import config from '../../../../src/share/domain/resources/env.config';
import { ApmService } from '../../../../src/share/domain/config/apm.service';
import { ProcessTimeService } from '../../../../src/share/domain/config/processTime.service';
import * as oracledb from 'oracledb';
import {
  ConexionFakeParam,
  connectionFake,
  prcName,
  prcReq,
} from '../../../stubs/dummy.data';

jest.mock('oracledb');
jest.mock('../../../../src/share/domain/config/apm.service');
describe('Activation Record Controller', () => {
  let oracleService: OracleService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
        }),
      ],
      providers: [
        OracleService,
        ApmService,
        ProcessTimeService,
        {
          provide: 'TransactionId',
          useValue: '98#$vfk/Hd$36G',
        },
      ],
    }).compile();

    oracleService = moduleRef.get<OracleService>(OracleService);
  });

  describe('Activation Record Controller', () => {
    it('Initialize - Success', async () => {
      expect(oracleService).toBeDefined();
    });
    it('Test getConnection', async () => {
      jest
        .spyOn(oracledb, 'getConnection')
        .mockImplementation(async () => connectionFake);
      expect(oracleService.getConnection()).toBeDefined();
    });
    it('Test closeConnection', async () => {
      jest
        .spyOn(oracledb, 'getConnection')
        .mockImplementation(async () => connectionFake);
      jest
        .spyOn(ConexionFakeParam, 'close')
        .mockImplementation(async () => 'CERRADO');
      expect(oracleService.closeConnection(ConexionFakeParam)).toBeDefined();
    });
    it('Test execute', async () => {
      jest
        .spyOn(oracledb, 'getConnection')
        .mockImplementation(async () => connectionFake);
      jest
        .spyOn(ConexionFakeParam, 'execute')
        .mockImplementation(async () => 'EJECUTADO');
      expect(
        oracleService.execute(ConexionFakeParam, prcName, prcReq),
      ).toBeDefined();
    });
  });
});
