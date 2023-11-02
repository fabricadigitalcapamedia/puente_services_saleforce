import { Injectable } from '@nestjs/common';
import * as apm from 'elastic-apm-node';
import { SERVICE_NAME } from '../resources/constants';

/**
 *  @description The Elastic APM Node.js Agent sends performance metrics and errors to the APM Server.
 *
 *  @param ELASTIC_APM_SERVER_URL variable de entorno que define la URL del servidor de APM
 *  @param ELASTIC_APM_ENVIRONMENT variable de entorno que define el Nombre del ambiente y el proyecto
 *  @param ELASTIC_APM_ACTIVE variable de entorno para activar o desartivar las metricas
 *
 *  @author Fabrica Microservicios
 *  @date Julio 2022
 *
 */
@Injectable()
export class ApmService {
  constructor() {
    if (!apm.isStarted()) {
      apm.start({
        //#NOMBRE DE LA APP, CON ESTE NOMBRE TAMBIEN SE VA GUARDE EL INDICE DE APM
        serviceName: SERVICE_NAME,

        // The HTTP body of incoming HTTP requests
        captureBody: 'all',

        // Use if APM Server requires a token
        secretToken: '',

        // Monitor for aborted TCP connections with un-ended HTTP requests
        errorOnAbortedRequests: false,

        // Any finite integer value will be used as the maximum number of frames to collect
        stackTraceLimit: 500,
      });
    }
  }

  /**
   *  @description Metodo para validar si apm esta iniciado.
   *
   *  @author Fabrica Microservicios
   *  @date Julio 2022
   *
   */
  isStarted() {
    return apm.isStarted();
  }

  /**
   *  @description Metodo implementado para capturar los errores que se puedan generar
   *  unicamente si estan estos capturadores o definidos en los try catch.
   *
   *  @author Sanatiago Vargas Acevedo
   *  @date Julio-20 del 2021
   *
   */
  captureError(data: any) {
    apm.captureError(data);
  }

  /**
   *  @description Metodo implementado para que al momento de  iniciar nuestro micro servicio
   *  comience a interceptar (capturar) las transacciones realizadas por un cliente.
   *
   *  @author Fabrica Microservicios
   *  @date Julio 2022
   *
   */
  startTransaction(name: string): any {
    return apm.startTransaction(name);
  }

  /**
   *  @description Metodo para establecer el nombre de nuestras transacciones
   *  al momento de  iniciar nuestro micro servicio.
   *
   *  @author Sanatiago Vargas Acevedo
   *  @date Julio-20 del 2021
   *
   */
  setTransactionName(name: string) {
    return apm.setTransactionName(name);
  }

  /**
   *  @description Metodo para finalizar la transaccion que se encuentre activa.
   *
   *  @author Fabrica Microservicios
   *  @date Julio 2022
   *
   */
  endTransaction(): void {
    apm.endTransaction();
  }

  /**
   *  @description Metodo para iniciar un span personalizado
   *
   *  @author Fabrica Microservicios
   *  @date Julio 2022
   *
   */
  startSpan(
    name: string,
    type: string,
    subtype: string,
    action: string,
  ): apm.Span {
    return apm.startSpan(name, type, subtype, action);
  }
}
