import React, { useState } from 'react';
import './index.scss';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import apis from 'apis/index';
import { useSetRecoilState } from 'recoil';
import { UserState } from 'store/index';

type InputValType = {
  email: string;
  password: string;
}

const SignInModal = () => {
  const [inputVal, setInputVal] = useState<InputValType>({
    email: '',
    password: ''
  });
  const setLoginState = useSetRecoilState(UserState);

  const queryClient = useQueryClient();

  const { mutate: postLogin } = useMutation({
    mutationFn: () => apis.User.postLogIn(inputVal),
    onSuccess: (data) => {
      alert('로그인 성공');
      queryClient.invalidateQueries({
        queryKey: ['getUser']
      });
      setLoginState(data);
    },
    onError: () => {
      alert('로그인 실패');
    }
  });

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //로그인 post 요청 api
    postLogin();
  };

  /** input value 핸들러 */
  const onChangeInputVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal({
      ...inputVal,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg">
      <div className="content">
        <div className="logo" />
        <form onSubmit={onSubmitHandler}>
          <div className="input-wrap">
            <label htmlFor="email">
              이메일
            </label>
            <input 
              id="email"
              name="email"
              value={inputVal.email}
              onChange={onChangeInputVal}
              type="emailasd" 
            />
          </div>
          <div className="input-wrap">
            <label htmlFor="password">
              비밀번호
            </label>
            <input 
              id="password"
              name="password"
              value={inputVal.password}
              onChange={onChangeInputVal}
              type="password" 
            />
          </div>
          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  );
};

export default SignInModal;