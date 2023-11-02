import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NewContractService } from '../../application/newContract.service';
import configuration from '../../../share/domain/resources/env.config';
import { NewContractController } from '../controller/newContract.controller';

/**
 *  @description clase anotada con un decorador @Module(). El decorador @Module() proporciona
 *  metadatos que Nest utiliza para organizar la estructura de la aplicación.
 *
 *  @author Fabrica Digital
 *
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [NewContractController],
  providers: [NewContractService],
})
export class NewContractModule {}
