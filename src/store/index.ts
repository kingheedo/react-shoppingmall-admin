import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

type UserStateType = {
  id: number;
  email: string;
  name: string;
  level: number;
}

const { persistAtom } = recoilPersist({
  key: 'userinfo'
});

export const UserState = atom<UserStateType | null>({
  key: 'UserState',
  default: null,
  effects_UNSTABLE: [persistAtom]
});