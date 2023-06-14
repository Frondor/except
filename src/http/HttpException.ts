import Exception, { ExceptionOptions } from "../Exception";

export interface HttpExceptionOptions<TData = any>
  extends ExceptionOptions<TData> {
  statusCode?: number;
}

export default class HttpException<TData = any> extends Exception<TData> {
  statusCode = 400;

  constructor(msg: string, options?: HttpExceptionOptions<TData>) {
    super(msg, options);

    this.statusCode = options?.statusCode ?? this.statusCode;
  }

  toResponse() {
    return {
      error: this.name,
      code: this.code || this.statusCode,
      data: this.data,
    };
  }
}
