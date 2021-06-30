import { useCallback, useEffect, useState } from 'react';
import io from 'socket.io-client';

const useSocket = serverPath => {
  const [socket, setSocket] = useState(null);
  const [isOnline, setIsOnline] = useState(false);

  const connectSocket = useCallback(() => {
    const token = localStorage.getItem('token');

    const socketTemp = io.connect(serverPath, {
      transports: ['websocket'],
      autoConnect: true,
      forceNew: true,
      query: {
        'x-token': token,
      },
    });

    setSocket(socketTemp);
  }, [serverPath]);

  const disconnectSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  useEffect(() => {
    setIsOnline(socket?.connected);
  }, [socket]);

  useEffect(() => {
    socket?.on('connect', () => setIsOnline(true));
  }, [socket]);

  useEffect(() => {
    socket?.on('disconnect', () => setIsOnline(false));
  }, [socket]);

  return { socket, isOnline, connectSocket, disconnectSocket };
};

export default useSocket;
