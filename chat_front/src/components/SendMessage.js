import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ChatContext } from '../contexts/ChatContext';
import { SocketContext } from '../contexts/SocketContext';
import useForm from '../hooks/useForm';

const SendMessage = () => {
  const { socket } = useContext(SocketContext);
  const {
    AuthState: { uid },
  } = useContext(AuthContext);
  const {
    ChatState: { activeChat },
  } = useContext(ChatContext);
  const [formState, setForm, , resetForm] = useForm({
    msg: '',
  });

  const handleSubmit = ev => {
    ev.preventDefault();

    if (formState.msg === '') {
      return;
    }
    resetForm();

    socket.emit('individual_msg', {
      from: uid,
      to: activeChat,
      msg: formState.msg,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input
            type="text"
            className="write_msg"
            placeholder="Mensaje..."
            name="msg"
            value={formState.msg}
            onChange={setForm}
          />
        </div>
        <div className="col-sm-3 text-center">
          <button
            className="msg_send_btn mt-3"
            type="submit"
            disabled={formState.msg === ''}
          >
            enviar
          </button>
        </div>
      </div>
    </form>
  );
};

export default SendMessage;
