import { ActionReducer, Action } from '@ngrx/store';
import { merge } from 'lodash-es';

function setSavedState(state: any, key: string) {
  localStorage.setItem(key, JSON.stringify(state));
}
function getSavedState(key: string): any {
  return JSON.parse(localStorage.getItem(key));
}

const localStorageKey = '__storage__';

export function storageMetaReducer<S, A extends Action = Action>(reducer: ActionReducer<S, A>) {
  let onInit = true;
  return (state: S, action: A): S => {
    const nextState = reducer(state, action);
    if (onInit) {
      onInit = false;
      const savedState = getSavedState(localStorageKey);
      return merge(nextState, savedState);  
    }
    setSavedState(nextState, localStorageKey);
    return nextState;
  };
}
