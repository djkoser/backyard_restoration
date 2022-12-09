import { AnyAction } from 'redux';

export const isPending = (action: AnyAction, sliceName: string) => {
  return action.type.includes('_PENDING') && action.type.includes(sliceName);
};

export const isRejected = (action: AnyAction, sliceName: string) => {
  return action.type.includes('_REJECTED') && action.type.includes(sliceName);
};

export const isFulfilled = (action: AnyAction, sliceName: string) => {
  return action.type.includes('_FULFILLED') && action.type.includes(sliceName);
};
