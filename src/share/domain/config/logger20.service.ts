import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import { SERVICE_NAME } from '../resources/constants';

/**
 * @description Custom logger implementation for logs 2.0  with winston package
 *
 * @autor Fábrica Microservicios
 *
 * @date Julio 2022
 */

export class Logger20Service implements LoggerService {
  loggerWinston: winston.Logger;

  constructor() {
    this.loggerWinston = winston.createLogger({
      format: winston.format.json(),
      defaultMeta: { applicationName: `${process.env.SERVICE_NAME}` },
      transports: [new winston.transports.Console()],
    });
  }

  private winLog(level: string, message: string, meta: any, context?: string) {
    const metadata = typeof meta === 'object' ? meta : undefined;
    this.loggerWinston.log(level, message, {
      ...metadata,
      timestamp: new Date().toISOString(),
      methodName: context,
    });
  }

  /**
   * Write a 'info' level log.
   */
  log(message: string, meta: any, context?: string) {
    this.winLog('info', message, meta, context);
  }

  /**
   * Write a 'error' level log.
   */
  error(message: string, meta: any, context?: string) {
    this.winLog('error', message, meta, context);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: string, meta: any, context?: string) {
    this.winLog('warn', message, meta, context);
  }
}
