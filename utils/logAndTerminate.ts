import { Server } from 'http';
import { logger } from '../services/common/logger';

export const logAndTerminate = (server: Server, options = { coredump: false, timeout: 500  }) => {
  // Exit function
  const exit = (code: number) => {
    options.coredump ? process.abort() : process.exit(code);
  };

  return (code: number, reason: string ) => (err: Error, _promise: any) => {
    if (err && err instanceof Error) {
      logger.error(
        `Server is down with code : ${code} and for this reason : ${reason}.error name : ${err.name} . error message : ${err.message} . error stack : ${err.stack}`
      );
      logger.info("server okkkkkk");
    }

    // Attempt a graceful shutdown
    server.close(() => {
      console.log('Process terminated');
    });
    setTimeout(exit, options.timeout);

    // timeout.unref();
  };
};
