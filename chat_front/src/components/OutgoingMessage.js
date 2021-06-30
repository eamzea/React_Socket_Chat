import React from 'react';
import { translateDate } from '../helpers/date';

const OutgoingMessage = ({ msg }) => {
  return (
    <div className="outgoing_msg">
      <div className="sent_msg">
        <p>{msg.msg}</p>
        <span className="time_date">{translateDate(msg.createdAt)}</span>
      </div>
    </div>
  );
};

export default OutgoingMessage;
