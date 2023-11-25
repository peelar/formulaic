export type GetResponseFromPromiseFunction<
  TFunction extends (...args: any) => any,
> = Awaited<ReturnType<TFunction>>;
