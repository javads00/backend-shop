import { onlyConsoleLog } from '../services/common/logger';

export const consoleLogger = (message: string) => {
  onlyConsoleLog.info('Console Log', {
    timestamp: new Date().toString(),
    method: '',
    url: '',
    ip:'',
    role:'',
    status: 500,
    contentLength: '',
    responseTime: '',
    show: message,
  });
};
