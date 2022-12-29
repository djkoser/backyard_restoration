import { AnyAction } from 'redux';

export const isPendingMatcher = (
  action: AnyAction,
  sliceName: string
): boolean => {
  return action.type.includes('/pending') && action.type.includes(sliceName);
};

export const isRejectedMatcher = (
  action: AnyAction,
  sliceName: string
): boolean => {
  return action.type.includes('/rejected') && action.type.includes(sliceName);
};

export const isFulfilledMatcher = (
  action: AnyAction,
  sliceName: string
): boolean => {
  return action.type.includes('/fulfilled') && action.type.includes(sliceName);
};
