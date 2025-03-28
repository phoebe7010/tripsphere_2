import React, { useState } from 'react';
import { useAuthForm } from '../../hooks/useAuthForm';
import InputField from '../../components/common/InputField';
import { useSignupMutation } from '../../hooks/useAuthData';
import { validateForm } from '../../utils/validation';

const EmailPassword = ({ onNext, showToast }) => {
  const [state, dispatch] = useAuthForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const mutation = useSignupMutation(showToast);

  const handleRegister = (e) => {
    if (e) e.preventDefault();

    // 폼 유효성 검사
    const errors = validateForm(state, 'emailPassword');

    // 에러 상태 설정
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', payload: errors });
      return;
    }

    mutation.mutate({
      email: state.email,
      password: state.password,
      username: state.username,
      nickname: state.nickname,
      phone: state.phone,
    });

    onNext();
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST">
          {/* 이메일 */}
          <InputField
            label="이메일"
            type="email"
            value={state.email}
            placeholder={state.placeholder.email}
            onChange={(e) =>
              dispatch({ type: 'SET_EMAIL', payload: e.target.value })
            }
            error={state.errors.email}
          />

          {/* 비밀번호 */}
          <InputField
            label="비밀번호"
            type="password"
            value={state.password}
            placeholder={state.placeholder.password}
            onChange={(e) =>
              dispatch({ type: 'SET_PASSWORD', payload: e.target.value })
            }
            error={state.errors.password}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />

          {/* 비밀번호 확인 */}
          <InputField
            label="비밀번호 확인"
            type="password"
            value={state.passwordConfirm}
            placeholder={state.placeholder.passwordConfirm}
            onChange={(e) =>
              dispatch({ type: 'SET_PASSWORDCONFIRM', payload: e.target.value })
            }
            error={state.errors.passwordConfirm}
            showPassword={showPasswordConfirm}
            onTogglePassword={() =>
              setShowPasswordConfirm(!showPasswordConfirm)
            }
          />

          {/* 버튼 영역 */}
          <div>
            <button
              type="button"
              onClick={handleRegister}
              className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-indigo-600">
              다음
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailPassword;
