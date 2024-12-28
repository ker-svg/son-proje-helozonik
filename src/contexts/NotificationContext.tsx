import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { MOCK_NEWS } from '../constants/mockNews';
import type { Notification } from '../types/settings';

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  clearNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const newsNotifications = MOCK_NEWS.map(news => ({
      id: uuidv4(),
      title: news.title,
      message: news.description,
      type: 'info' as const,
      read: false,
      createdAt: news.publishedAt,
    }));
    setNotifications(newsNotifications);
  }, []);

  const addNotification = (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => {
    setNotifications(prev => [
      {
        ...notification,
        id: uuidv4(),
        read: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAsRead, clearNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}