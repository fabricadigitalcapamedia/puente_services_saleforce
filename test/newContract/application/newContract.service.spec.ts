import { Test, TestingModule } from '@nestjs/testing';
import { NewContractService } from '../../../src/newContract/application/newContract.service';
import { NewContractController } from '../../../src/newContract/interfaces/controller/newContract.controller';
import { NewContractResponse } from '../../../src/newContract/domain/dto/newContractResponse.dto';
import { DatabaseService } from '../../../src/newContract/infrastructure/oracle/database.service';
import { ConfigModule } from '@nestjs/config';
import config from '../../../src/share/domain/resources/env.config';
import { NewContractRequest } from '../../../src/newContract/domain/dto/newContractRequest.dto';
import { ProcessTimeService } from '../../../src/share/domain/config/processTime.service';
import { ApmService } from '../../../src/share/domain/config/apm.service';

jest.mock('../../../src/newContract/infrastructure/oracle/database.service');
describe('New Contract Controller', () => {
  let service: NewContractService;
  let databaseService: DatabaseService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseService,
        NewContractService,
        {
          provide: 'TransactionId',
          useValue: '98#$vfk/Hd$36G',
        },
        ProcessTimeService,
        ApmService,
      ],
      controllers: [NewContractController],
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [config],
        }),
      ],
    }).compile();

    service = moduleRef.get<NewContractService>(NewContractService);
    databaseService = moduleRef.get<DatabaseService>(DatabaseService);
  });

  describe('New Contract Service', () => {
    it('consumption towards the procedure', async () => {
      expect(service).toBeDefined();
    });

    it('Must response procedimientoActivacion', async () => {
      const payloadNewContract: NewContractRequest = {
        INACT: 'string',
        INCALLDUR: 'string',
        INDN_NUM: 'string',
        INESNICCID: 'string',
        INIMEI: 'string',
        INCEDULA: 'string',
        INDEALERID: 'string',
        INSPCODE: 'string',
        INTMCODE: 'string',
        INHLCODE: 'string',
        INCODDIST: 'string',
        INCODDEALERNEG: 'string',
        INANI7DIGIT: 'string',
      };
      jest
        .spyOn(databaseService, 'prActivacionIvr229')
        .mockResolvedValue(
          new NewContractResponse('OUTCOD_RES', 'OUTCO_ID', 'OUTDESC_RES'),
        );
      await service.procedimientoActivacion(payloadNewContract);
      expect(databaseService.prActivacionIvr229).toBeCalled();
    });
    it('Must response procedimientoActivacion catch', async () => {
      jest
        .spyOn(databaseService, 'prActivacionIvr229')
        .mockImplementation(() => {
          throw new Error('There was an error');
        });
      expect(await service.procedimientoActivacion(null)).toEqual({
        data: {
          OUTCOD_RES: '-99',
          OUTCO_ID: '',
          OUTDESC_RES: 'Error al consumir el procedimiento',
        },
        message: 'Service Unavailable',
        responseCode: 503,
      });
    });
  });
});
