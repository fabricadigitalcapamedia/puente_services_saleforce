/**
 *  @description El objeto de transferencia de datos es un objeto que define cómo se enviarán los
 *  datos a través de la red, adicional se pueden usar decoradores de class validator para la definicion
 *  de datos obligatorios o metodos de swagger.
 *
 *  @author Celula Azure
 *
 */
export class NewContractResponse {
  OUTCOD_RES: string;
  OUTDESC_RES: string;
  OUTCO_ID: string;
  constructor(OUTCOD_RES: string, OUTDESC_RES: string, OUTCO_ID: string) {
    this.OUTCOD_RES = OUTCOD_RES;
    this.OUTDESC_RES = OUTDESC_RES;
    this.OUTCO_ID = OUTCO_ID;
  }
}
