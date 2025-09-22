import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { AxiosError } from 'axios';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    if (this.isAxiosError(exception)) {
      const err = exception as AxiosError<any>;
      const status = err.response?.status ?? HttpStatus.BAD_GATEWAY;
      const message = err.response?.data ?? err.message;
      return res.status(status).json({ error: 'UpstreamError', message, status });
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      return res.status(status).json(exception.getResponse());
    }

    return res.status(500).json({ error: 'InternalError' });
  }

  private isAxiosError(e: any): e is AxiosError {
    return !!e?.isAxiosError;
  }
}
