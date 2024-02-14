import request from 'apis/request';
import { GetUserRes, PostLoginReq, PostLoginRes } from './schema';

/** 유저정보 가져오기 */
const getUser = () => {
  return request.get<GetUserRes>('/admin/user').then(res => res.data);
};

/** 로그인 */
const postLogIn = (data: PostLoginReq) => {
  return request.post<PostLoginRes>('/admin/user/login', data).then(res => res.data);
};

/** 로그아웃 */
const postLogout = () => {
  return request.post('/admin/user/logout').then(res => res.data);
};

export default {
  getUser,
  postLogIn,
  postLogout
};