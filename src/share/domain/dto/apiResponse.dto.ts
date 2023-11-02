import { ApiProperty } from '@nestjs/swagger';

/**
 *  @description Clase servicio responsable recibir el parametro y realizar la logica de negocio.
 *
 *  @author Celula Azure
 *
 */
export class ApiResponseDto {
  @ApiProperty()
  responseCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  data: any;
  constructor(responseCode: number, message: string, data: any) {
    this.responseCode = responseCode;
    this.message = message;
    this.data = data;
  }
}
