import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ChatContext } from '../contexts/ChatContext';

const SearchBox = () => {
  const {
    AuthState: { name },
    AuthDispatch,
    AuthActions,
  } = useContext(AuthContext);
  const { ChatDispatch, ChatActions } = useContext(ChatContext);

  const handleLogout = () => {
    AuthDispatch(AuthActions.logout());
    ChatDispatch(ChatActions.clearSession());
  };

  return (
    <div className="headind_srch">
      <div className="recent_heading mt-2">
        <h4>{name}</h4>
      </div>
      <div className="srch_bar">
        <div className="stylish-input-group">
          <button className="btn text-danger" onClick={handleLogout}>
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
