import React, { createContext, useContext, useState, ReactNode } from 'react';

type ToggleContextType = {
  isContactListVisible: boolean;
  toggleContactList: () => void;
};

const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

export const ToggleProvider = ({ children }: { children: ReactNode }) => {
  const [isContactListVisible, setIsContactListVisible] = useState(true);

  const toggleContactList = () => {
    setIsContactListVisible((prevState) => !prevState);
  };

  return (
    <ToggleContext.Provider value={{ isContactListVisible, toggleContactList }}>
      {children}
    </ToggleContext.Provider>
  );
};

export const useToggle = () => {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error('useToggle must be used within a ToggleProvider');
  }
  return context;
};
