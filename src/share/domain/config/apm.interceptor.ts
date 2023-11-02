import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApmService } from './apm.service';
/**
 *  @description Clase que intercepta las peticiones Http con el fin de enviar detalle de los errores a APM
 *
 *  @author Fabrica Microservicios
 *  @date Julio 2022
 *
 */
@Injectable()
export class ApmInterceptor implements NestInterceptor {
  constructor(private readonly apmService: ApmService) {}

  intercept(
    _context: ExecutionContext,
    next: CallHandler<Observable<any>>,
  ): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        this.apmService.captureError(error);
        throw error;
      }),
    );
  }
}
