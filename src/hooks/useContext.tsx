import { AdminModel } from '@/models/User';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Định nghĩa kiểu dữ liệu cho context
interface AppContextType {
  admin: AdminModel;
  setAdmin: (admin: AdminModel) => void;
}

const defaultAdmin: AdminModel = {
  jwt: '',
};

// Tạo context với giá trị mặc định
const AppContext = createContext<AppContextType | undefined>(undefined);

// Tạo Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [admin, setAdmin] = useState<AdminModel>(defaultAdmin);

  return (
    <AppContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook để sử dụng context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
