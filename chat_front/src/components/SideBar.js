import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ChatContext } from '../contexts/ChatContext';
import SideBarChatItem from './SideBarChatItem';

const SideBar = () => {
  const {
    ChatState: { users },
  } = useContext(ChatContext);
  const {
    AuthState: { uid },
  } = useContext(AuthContext);

  return (
    <div className="inbox_chat">
      {users
        .filter(user => user.uid !== uid)
        .sort((a, b) => a.online < b.online)
        .map(user => (
          <SideBarChatItem key={user.uid} user={user} />
        ))}
      <div className="extra_space"></div>
    </div>
  );
};

export default SideBar;
