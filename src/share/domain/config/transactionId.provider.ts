import { Scope } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

/**
 *  @description Metodo para crear un ID de transaccion por cada petición
 *
 *  @author Maria Andrea Perico
 *  @date Julio de 2022
 *
 */
export const TransaccionIdProvider = {
  provide: 'TransactionId',
  useFactory: () => uuidv4(),
  scope: Scope.REQUEST,
};
