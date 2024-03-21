import { useQuery } from '@tanstack/react-query';
import apis from 'apis/index';
import { GetUserRes } from 'apis/user/schema';
import SignInModal from 'components/modal/SignInModal';
import { PropsWithChildren, createContext, useContext, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UserState } from 'store';

const AuthContext = createContext<GetUserRes | null>(null);
const AuthProvider = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const [getUserState, setLoginState] = useRecoilState(UserState);
  const { data: getUser, isError, isRefetchError } = useQuery({
    queryKey: ['getUser', location.pathname],
    queryFn: () => apis.User.getUser()
  });

  const userInfo = useMemo(() => {
    return getUser || null;
  },[getUser]);

  useEffect(() => {
    if ((isError || isRefetchError) && !userInfo?.id) {
      setLoginState(null);

    }
  }, [isError,isRefetchError, userInfo]);
  
  return (
    <AuthContext.Provider value={userInfo}>
      {!getUserState?.id && <SignInModal />}
      {children}
    </AuthContext.Provider>
  );
};

export const getUser = () => useContext(AuthContext);

export default AuthProvider;
