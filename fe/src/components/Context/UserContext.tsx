// UserContext.tsx
import React, { createContext, useContext, useState, ReactNode} from 'react';
import { IUserInfo } from '../../common/app-interface';
import { useAuth } from '../../functions/useAuth';

type UserContextType = {
    user: IUserInfo | null; 
    setUser: React.Dispatch<React.SetStateAction<IUserInfo | null>>
};

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
        children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const currentUser = useAuth().getCurrentInfoUser();
    console.log("currentUser" + JSON.stringify(currentUser))
    const [user, setUser] = useState<IUserInfo | null>(currentUser);
    const value: UserContextType = { user, setUser };

    return (
        <UserContext.Provider value={value} >
            {children}
        </UserContext.Provider>
    );
};

export const useContextUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};