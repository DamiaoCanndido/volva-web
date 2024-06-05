'use client';
import { User } from '@/entities/user';
import { getCookie } from 'cookies-next';
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
} from 'react';

export interface childrenType {
  children: ReactNode;
}

interface ContextProps {
  token?: string;
  setToken: Dispatch<SetStateAction<string | undefined>>;
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
}

const AuthContext = createContext<ContextProps>({
  token: undefined,
  setToken: (): string => '',
  user: undefined,
  setUser: (): User | undefined => undefined,
});

export const AuthContextProvider = (props: childrenType) => {
  const [token, setToken] = useState(getCookie('token'));
  const [user, setUser] = useState<User | undefined>(
    JSON.parse(localStorage.getItem('user-data')!)
  );

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const AuthContextGlobal = () => {
  return useContext(AuthContext);
};
