'use client'
import { getAccessToken } from '@/features/auth/authUtils';
import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const initializeSocket = () => {
      const token = getAccessToken();
      if (!token) return;

      // Initialize socket connection
      const socket = io(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001', {
        auth: { token },
        transports: ['websocket'],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      // Connection event handlers
      socket.on('connect', () => {
        console.log('✅ Socket connected');
        setIsConnected(true);
      });

      socket.on('disconnect', () => {
        console.log('❌ Socket disconnected');
        setIsConnected(false);
      });

      socket.on('connect_error', (error:any) => {
        console.error('Socket connection error:', error);
        toast.error('Failed to connect to notification service');
      });

      // Notification event handlers
      socket.on('new-notification', (notification:any) => {
        handleNewNotification(notification);
      });

      socket.on('institution-notification', (notification:any) => {
        handleInstitutionNotification(notification);
      });

      socketRef.current = socket;

      return () => {
        socket.disconnect();
      };
    };

    initializeSocket();
  }, []);

  const handleNewNotification = (notification: any) => {
    // Handle individual user notifications
    toast.info(notification.actionTitle, {
      description: notification.message,
      duration: 5000,
    });
    
    console.log(notification)
  };

  const handleInstitutionNotification = (notification: any) => {
    // Handle institution-wide notifications
    toast.info(notification.message, {
      description: notification.description,
      duration: 5000,
    });
  };

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook for sending notifications
export const useNotificationSender = () => {
  const { socket } = useSocket();

  const sendNotification = useCallback(
    (userId: string, notification: any) => {
      if (!socket?.connected) {
        toast.error('Notification service is not connected');
        return;
      }

      socket.emit('send-notification', { userId, notification });
    },
    [socket],
  );

  const sendInstitutionNotification = useCallback(
    (institutionId: string, notification: any) => {
      if (!socket?.connected) {
        toast.error('Notification service is not connected');
        return;
      }

      socket.emit('send-institution-notification', { institutionId, notification });
    },
    [socket],
  );

  return {
    sendNotification,
    sendInstitutionNotification,
  };
};
