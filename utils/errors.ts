import config from "../config";
import { ValidationError } from "express-validator";
import { langField } from "../locales/langEnum";
import { Request } from "express";

export abstract class ErrorAbstract extends Error {
  public statusCode: number;

  constructor(message: string) {
    super(message);
  }

  abstract errorMessages(): { message: string; field?: string }[];
}

export class AuthorizationError extends ErrorAbstract {
  statusCode = 401;

  constructor(public message: string) {
    super("Not authorized to access this route");
  }

  errorMessages() {
    return [{ message: this.message, field: "Auth" }];
  }
}

export class NotFoundError extends ErrorAbstract {
  statusCode = 404;

  constructor(public message: string) {
    super(message);
  }

  errorMessages() {
    return [{ message: this.message, field: "Exist" }];
  }
}

export class PermissionError extends ErrorAbstract {
  statusCode = 403;

  constructor(public message: string) {
    super("Not authorized to access this route");
  }

  errorMessages() {
    return [{ message: this.message, field: "Permission" }];
  }
}

export class RequestError extends ErrorAbstract {
  statusCode = 400;

  constructor(public message: string) {
    super(message);
  }

  errorMessages() {
    return [{ message: this.message, field: "Request" }];
  }
}

export class ServerError extends ErrorAbstract {
  statusCode = 500;

  constructor(public message: string) {
    super(message);
  }

  errorMessages() {
    return [{ message: this.message, field: "Request" }];
  }
}

export class RequestValidationError extends ErrorAbstract {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super("Invalid request input");
  }

  errorMessages() {
    return this.errors.map((err) => {
      const fieldError = err as { msg: string; param?: string };
      return { message: fieldError.msg, field: fieldError.param };
    });
  }
}

export const invalidError = (error: langField) => {
  return (_value: any, { req }: { req: Request }) => {
    return config.langs[req.local][error];
  };
};
