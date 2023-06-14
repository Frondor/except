import { objToLogMessage } from "./utils";

export interface ExceptionOptions<TData = any> {
  code?: string;
  name?: string;
  cause?: Exception | Error | unknown;
  data?: TData;
}

class Exception<TData = any> extends Error {
  code?: string;
  data?: TData;
  root?: Error;

  constructor(message: string, options?: ExceptionOptions<TData>) {
    super(message, { cause: options?.cause });

    this.name = options?.name || this.constructor.name;
    this.cause = options?.cause;
    this.code = options?.code;
    this.setData(options?.data);

    this.root = this.cause as Error;
    while (this.root?.cause instanceof Error) this.root = this.root.cause;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    Object.setPrototypeOf(this, this.constructor.prototype);
  }

  setData(data: any): this {
    return Object.defineProperty(this, "data", {
      enumerable: false,
      configurable: true,
      writable: true,
      value: data,
    });
  }

  static is<T>(err: unknown): err is T {
    return err instanceof this.constructor;
  }

  toString() {
    let str = `${this.name}: ${this.message}`;
    if (this.data) str += ` (${objToLogMessage(this.data)})`;
    if (this.cause) str += `\nCause: ${this.toString.apply(this.cause)}`;
    str += `\nStack: ${this.stack}`;
    return str;
  }
}

export default Exception;
