import React, { createContext, useEffect, useContext, useReducer } from "react";

export const Context = createContext();

const StorageKey = "@bank/context";
const originalState = {
   user: null,
}

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_USER": {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        }
      }
    }
    case "SET_USER": {
      return {
        ...state,
        user: action.payload
      }
    }
    case "RESET":
    case "CLEAR": {
      return originalState;
    }
    default: {
      return state;
    }
  }
}

export function ContextProvider(props) {
  const cachedState = JSON.parse(localStorage.getItem(StorageKey));
  const defaultState = Object.keys({ ...cachedState }).length > 0 ? cachedState : originalState;

  const [ state, dispatch ] = useReducer(reducer, defaultState);

  useEffect(() => {
    localStorage.setItem(StorageKey, JSON.stringify(state));
  }, [ state ]);

  return (
    <Context.Provider { ...props } value={{ state, dispatch }} />
  )
}

export function useSelector(callback) {
  const { state } = useContext(Context);

  return callback(state);
}

export function useDispatch() {
  const { dispatch } = useContext(Context);

  return dispatch;
}
