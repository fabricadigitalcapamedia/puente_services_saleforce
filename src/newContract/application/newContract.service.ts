import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import {
  ERROR_CONSUMO_PRC,
  OK,
  OUTCODRES,
  SERVICE_UNAVAILABLE,
} from '../../share/domain/resources/constants';
import config from '../../share/domain/resources/env.config';
import { ApiResponseDto } from '../../share/domain/dto/apiResponse.dto';
import { NewContractRequest } from '../domain/dto/newContractRequest.dto';
import { NewContractResponse } from '../domain/dto/newContractResponse.dto';
import axios from 'axios';

/**
 *  @description Clase servicio responsable recibir el parametro y realizar la logica de negocio.
 *
 *  @author Celula Azure
 *
 */
@Injectable()
export class NewContractService {
  private readonly logger = new Logger(NewContractService.name);
  @Inject('TransactionId') private readonly transactionId: string;

  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  public async procedimientoActivacion(
    newContractRequest: NewContractRequest,
  ): Promise<ApiResponseDto> {
    try {
      this.logger.log('procedimientoActivacion request', {
        request: newContractRequest,
        transactionId: this.transactionId,
      });
      const prcRes = await this.consultaCurl(
        newContractRequest.curl,
      );
      return new ApiResponseDto(HttpStatus.OK, OK, prcRes);
    } catch (error) {
      this.logger.error(error.message, {
        transactionId: this.transactionId,
        stack: error.stack,
      });
      if (error.response && error.status) {
        throw new HttpException({ response: error.response }, error.status);
      }
      return new ApiResponseDto(
        HttpStatus.SERVICE_UNAVAILABLE,
        SERVICE_UNAVAILABLE,
        new NewContractResponse(OUTCODRES, ERROR_CONSUMO_PRC, ''),
      );
    }
  }

  public async consultaCurl(curlText: string){
    const lines = curlText.split('\n');

    const curlData = {
      url: '',
      method: '',
      headers: {},
      body: ''
    };

    lines.forEach(line => {
      line = line.trim();

      if (line.startsWith('curl')) {
        const urlMatch = line.match(/'(.*?)'/);
        if (urlMatch) {
          curlData.url = urlMatch[1];
          console.log(curlData.url);
        }
        const methodMatch = line.match(/--data-raw/);
        if (methodMatch) {
          curlData.method = "POST";
        }else {
          curlData.method = "GET";
        }
        console.log(curlData.method);
      } 
      if (line.startsWith('--header')) {
        const headerMatch = line.match(/'([^:]+): (.+)'/);
        if (headerMatch) {
          const headerName = headerMatch[1];
          const headerValue = headerMatch[2];
          //curlData.headers[headerName] = headerValue;
        }
      } 
      if (line.match('--data-raw')) {
        const bodyMatch = line.match(/--data-raw.+?({.+?})/);
        if (bodyMatch) {
          curlData.body = bodyMatch[1].replace("\\\"", "\"");
        }
      }
    });

    let res = this.sendHttpRequest(curlData);

    return res;
  }

  async sendHttpRequest(curlData: any) {
    //const headers = new HttpHeaders(curlData.headers);
    let responseOp;
    console.log("LLEGA "+ curlData);
    if(curlData.method == "GET"){
      responseOp = axios.get(curlData.url, {responseType: 'json',}).then((response) => {
        console.log(response.status);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
    }else {
      
      const jsonObject = JSON.parse(curlData.body);
      responseOp = axios.post(curlData.url, jsonObject, {responseType: 'json',}).then((response) => {
        console.log(response.status);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      })
    }
    
  }
}
