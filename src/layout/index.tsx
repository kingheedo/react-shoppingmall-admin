import MenuIcon from '@mui/icons-material/Menu';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PostAddIcon from '@mui/icons-material/PostAdd';
import './index.scss';
import { NavLink, Outlet } from 'react-router-dom';
import { useRef } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apis from 'apis/index';
import { useRecoilState } from 'recoil';
import { UserState } from 'store/index';
const MainPageLayout = () => {
  const layoutRef = useRef<HTMLDivElement | null>(null);
  const [getUserState, setUserState] = useRecoilState(UserState);
  const queryClient = useQueryClient();
  const { mutate: logout } = useMutation({
    mutationFn: () => apis.User.postLogout(),
    onSuccess: () => {
      setUserState(null);
      queryClient.invalidateQueries({
        queryKey: ['getUser']
      });
    }
  });
  
  const onClickFoldBtn = () => {
    layoutRef.current?.classList.toggle('folded');
  };

  /** 로그아웃 버튼 클릭 시 */
  const onClickLogout = () => {
    logout();
  };

  return (
    <div ref={layoutRef} className="main-layout">
      <div className="appbar">
        <button className="fold-btn" onClick={onClickFoldBtn}>
          <MenuIcon fontSize="large" />
        </button>
        <span className="user-name">
          {getUserState?.name}
        </span>
      </div>
      <div className="drawer">
        <div className="blank" />
        <ul className="link-wrap">
          <li>
            <NavLink to={'/'}>
              <LocalMallIcon />
              <span>
                  Products
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to={'/add'}>
              <PostAddIcon />
              <span>
                  Add Product
              </span>
            </NavLink>
          </li>
        </ul>
        <button onClick={onClickLogout} className="logout-btn">
          <LogoutIcon />
          Logout
        </button>
      </div>
      <section className="content">
        <Outlet />
      </section>
    </div>

  );
};

export default MainPageLayout;
