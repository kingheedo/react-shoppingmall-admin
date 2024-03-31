import { useQuery } from '@tanstack/react-query';
import apis from 'apis/index';
import { GetUserRes } from 'apis/user/schema';
import SignInModal from 'components/modal/SignInModal';
import { PropsWithChildren, createContext, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UserState } from 'store';
import axios from 'axios';
const AuthContext = createContext<GetUserRes | null>(null);
const AuthProvider = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const [getUserState, setLoginState] = useRecoilState(UserState);
  const { data: getUser } = useQuery({
    queryKey: ['getUser', location.pathname],
    queryFn: async() => {
      try {
        return await apis.User.getUser();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setLoginState(null);
        }
      }
    }
  });

  const userInfo = useMemo(() => {
    return getUser || null;
  },[getUser]);
  
  return (
    <AuthContext.Provider value={userInfo}>
      {!getUserState?.id && <SignInModal />}
      {children}
    </AuthContext.Provider>
  );
};

export const getUser = () => useContext(AuthContext);

export default AuthProvider;
