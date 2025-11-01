// core/AppError.ts
export class AppError extends Error {
    statusCode: number;
    code: string;
    details?: any;
  
    constructor({
      code,
      message,
      statusCode = 500,
      details,
    }: {
      code: string;
      message: string;
      statusCode?: number;
      details?: any;
    }) {
      super(message);
      this.code = code;
      this.statusCode = statusCode;
      this.details = details;
    }
}