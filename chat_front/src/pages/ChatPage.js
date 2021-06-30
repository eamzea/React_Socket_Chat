import React, { useContext } from 'react';
import '../styles/chat.css';
import InboxPeople from '../components/InboxPeople';
import Messages from '../components/Messages';
import SelectChat from '../components/SelectChat';
import { ChatContext } from '../contexts/ChatContext';

const ChatPage = () => {
  const {
    ChatState: { activeChat },
  } = useContext(ChatContext);

  return (
    <div className="messaging">
      <div className="inbox_msg">
        <InboxPeople />
        {activeChat === null ? <SelectChat /> : <Messages />}
      </div>
    </div>
  );
};

export default ChatPage;
