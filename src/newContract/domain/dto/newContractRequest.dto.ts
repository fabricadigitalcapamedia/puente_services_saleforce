import { ApiProperty } from '@nestjs/swagger';

/**
 *  @description El objeto de transferencia de datos es un objeto que define cómo se enviarán los
 *  datos a través de la red, adicional se pueden usar decoradores de class validator para la definicion
 *  de datos obligatorios o metodos de swagger.
 *
 *  @author Celula Azure
 *
 */
export class NewContractRequest {
  @ApiProperty({ description: 'CURL' })
  curl: string;
  @ApiProperty({ description: 'TIPO' })
  tipo: string;
  @ApiProperty({ description: 'URL' })
  url: string;

}
