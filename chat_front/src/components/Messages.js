import React, { useContext } from 'react';
import SendMessage from './SendMessage';
import IncomingMessage from './IncomingMessage';
import OutgoingMessage from './OutgoingMessage';
import { ChatContext } from '../contexts/ChatContext';
import { AuthContext } from '../contexts/AuthContext';

const Messages = () => {
  const {
    ChatState: { msgs },
  } = useContext(ChatContext);
  const {
    AuthState: { uid },
  } = useContext(AuthContext);

  return (
    <div className="mesgs">
      <div className="msg_history" id="msgs">
        {msgs.map(msg =>
          msg.to === uid ? (
            <IncomingMessage key={msg._id} msg={msg} />
          ) : (
            <OutgoingMessage key={msg._id} msg={msg} />
          )
        )}
      </div>
      <SendMessage />
    </div>
  );
};

export default Messages;
