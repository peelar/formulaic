"use client";

type CustomErrorProps = {
  httpCode: number;
};

export class BaseError extends Error {
  public readonly httpCode: number;

  constructor(message, props: CustomErrorProps) {
    super(message);
    this.httpCode = props.httpCode;
  }
}

export const createError = (props: CustomErrorProps) => {
  return class extends BaseError {
    constructor(message: string) {
      super(message, props);
    }
  };
};

export const BadRequestError = createError({ httpCode: 400 });
export const NotFoundError = createError({ httpCode: 404 });
export const InternalServerError = createError({ httpCode: 500 });
export const NotAllowedError = createError({ httpCode: 403 });
