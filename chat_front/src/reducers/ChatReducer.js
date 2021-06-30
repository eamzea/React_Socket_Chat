import { types } from '../types/types';

export const ChatInitialState = {
  uid: '',
  activeChat: null,
  users: [],
  msgs: [],
};

export const ChatReducer = (state = ChatInitialState, action) => {
  switch (action.type) {
    case types.ChatLoadUsers:
      return {
        ...state,
        ...action.payload,
      };
    case types.ChatSelect:
      if (state.activeChat === action.payload.activeChat) return state;

      return {
        ...state,
        ...action.payload,
      };
    case types.ChatLoadNewMsg:
      if (
        state.activeChat === action.payload.from ||
        state.activeChat === action.payload.to
      ) {
        return {
          ...state,
          msgs: [...state.msgs, action.payload],
        };
      } else {
        return state;
      }
    case types.ChatLoadHistory:
      return {
        ...state,
        ...action.payload,
      };
    case types.ChatClearSession:
      return {
        uid: '',
        activeChat: null,
        users: [],
        msgs: [],
      };
    default:
      return state;
  }
};
