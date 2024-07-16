export type PromiseThenArgument<T> = T extends PromiseLike<infer U> ? U : T;

export type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

/** @deprecated use AsyncReturnType<T> */
export type MstYield<T> = T extends (...args: any[]) => PromiseLike<infer U> ? U : T;

export type AsyncReturnType<T> = T extends (...args: any[]) => PromiseLike<infer U> ? U : T;

export type PromiseInnerType<T> = T extends PromiseLike<infer U> ? U : T;

/** @deprecated use PromiseInnerType<T> */
export type PromiseUnwrapType<T> = T extends PromiseLike<infer U> ? U : T;
