import { types } from '../types/types';

const loadUsers = users => {
  return {
    type: types.ChatLoadUsers,
    payload: {
      users: [...users],
    },
  };
};

const selectChat = uid => {
  return {
    type: types.ChatSelect,
    payload: {
      activeChat: uid,
      msgs: [],
    },
  };
};

const loadNewMsg = msg => {
  return {
    type: types.ChatLoadNewMsg,
    payload: {
      ...msg,
    },
  };
};

const loadChatHistory = msgs => {
  return {
    type: types.ChatLoadHistory,
    payload: {
      msgs,
    },
  };
};

const clearSession = () => {
  return {
    type: types.ChatClearSession,
  };
};

const ChatActions = {
  loadUsers,
  selectChat,
  loadNewMsg,
  loadChatHistory,
  clearSession,
};

export default ChatActions;
