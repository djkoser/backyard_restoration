export type ReduxConverter<Store> = {
  [K in keyof Store as K extends string ? `${K}Redux` : never]: Store[K];
};
