import React, { useContext } from 'react';
import { ChatContext } from '../contexts/ChatContext';
import { fetchWtoken } from '../helpers/fetch';
import { scrollToBottom } from '../helpers/scroll';

const SideBarChatItem = ({ user }) => {
  const {
    ChatState: { activeChat },
    ChatDispatch,
    ChatActions,
  } = useContext(ChatContext);

  const selectChat = async () => {
    ChatDispatch(ChatActions.selectChat(user.uid));

    const { messages } = await fetchWtoken(`messages/${user.uid}`);
    ChatDispatch(ChatActions.loadChatHistory(messages));
    scrollToBottom('msgs');
  };

  return (
    <div
      className={`chat_list ${activeChat === user.uid ? 'active_chat' : ''}`}
      onClick={selectChat}
    >
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://ptetutorials.com/images/user-profile.png"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5>{user?.name}</h5>
          {user?.online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBarChatItem;
