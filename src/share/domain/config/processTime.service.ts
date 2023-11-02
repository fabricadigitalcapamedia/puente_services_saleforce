import { Injectable } from '@nestjs/common';

/**
 *  @description Metodo que calcula el processTime
 *
 *  @author María Andrea Perico
 *  @date Julio de 2022
 *
 */
@Injectable()
export class ProcessTimeService {
  start() {
    const startTime = process.hrtime();

    return {
      end: () => {
        const endTime = process.hrtime(startTime);
        const msTime = endTime[0] * 1000 + endTime[1] / 1000000; // milliseconds
        return `${msTime}ms`;
      },
    };
  }
}
