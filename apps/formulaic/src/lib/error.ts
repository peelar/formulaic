import ModernError from "modern-errors";

type CustomErrorProps = {
  httpCode: number;
};

export const BaseError = ModernError.subclass("BaseError", {
  props: { httpCode: 500 } as CustomErrorProps,
});

export const BadRequestError = BaseError.subclass("BadRequestError", {
  props: { httpCode: 400 } as CustomErrorProps,
});
export const NotFoundError = BaseError.subclass("NotFoundError", {
  props: { httpCode: 404 } as CustomErrorProps,
});
export const InternalServerError = BaseError.subclass("InternalServerError", {
  props: { httpCode: 500 } as CustomErrorProps,
});
export const NotAllowedError = BaseError.subclass("NotAllowedError", {
  props: { httpCode: 403 } as CustomErrorProps,
});
