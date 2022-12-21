type SetterCallback<LocalState> = (previousState: LocalState) => LocalState;

/** Reusable helper function for getting a simplified local state setter function */
export function getLocalStateHelper<LocalState>(
  setterFunction: (callback: SetterCallback<LocalState>) => void
) {
  return function (newState: Partial<LocalState>): void {
    setterFunction((previousState) => {
      return { ...previousState, ...newState };
    });
  };
}
