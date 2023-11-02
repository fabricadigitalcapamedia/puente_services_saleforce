import oracledb, {
  AdvancedQueue,
  DBObjectClass,
  Lob,
  QueryStream,
  Result,
  Results,
  SodaDatabase,
  StatementInfo,
  Subscription,
} from 'oracledb';

export const connectionFake = {
  _events: [],
  _eventsCount: 0,
  _maxListeners: undefined,
  _dbObjectClasses: {},
  _requestQueue: [],
  _inProgress: false,
  execute: function () {
    return {
      outBinds: {
        CDCDC: 'XCXCXCXC',
        FGFGFG: '0',
        FGFGFGF: 'La consulta fue exitosa.',
      },
    };
  },
  close: function () {
    //
  },
};

export const ConexionFakeParam: oracledb.Connection = {
  oracleServerVersion: 0,
  oracleServerVersionString: '',
  stmtCacheSize: 0,
  break: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  changePassword: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  close: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  commit: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  createLob: function (): Promise<Lob> {
    throw new Error('Function not implemented.');
  },
  execute: function <T>(): Promise<Result<T>> {
    throw new Error('Function not implemented.');
  },
  executeMany: function <T>(): Promise<Results<T>> {
    throw new Error('Function not implemented.');
  },
  getDbObjectClass: function <T>(): Promise<DBObjectClass<T>> {
    throw new Error('Function not implemented.');
  },
  getQueue: function <T>(): Promise<AdvancedQueue<T>> {
    throw new Error('Function not implemented.');
  },
  getSodaDatabase: function (): SodaDatabase {
    throw new Error('Function not implemented.');
  },
  // eslint-disable-next-line @typescript-eslint/ban-types
  getStatementInfo: function (): Promise<StatementInfo<{}>> {
    throw new Error('Function not implemented.');
  },
  ping: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  queryStream: function <T>(): QueryStream<T> {
    throw new Error('Function not implemented.');
  },
  release: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  rollback: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  shutdown: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  startup: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
  subscribe: function (): Promise<Subscription> {
    throw new Error('Function not implemented.');
  },
  unsubscribe: function (): Promise<void> {
    throw new Error('Function not implemented.');
  },
};

export const prcName = 'SYSADM.PKG_CONSULTA_REPOPREPO.PROCONSULTATIPOPLAN ';

export const prcReq = {
  VCCODMIN: '3228273895',
  VCSALIDATIPOPLAN: { type: 2001, dir: 3003 },
  VCCODSALIDA: { type: 2001, dir: 3003 },
  VCDESSALIDA: { type: 2001, dir: 3003 },
};
