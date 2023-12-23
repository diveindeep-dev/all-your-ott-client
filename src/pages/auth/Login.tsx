import { FormEvent, useState } from 'react';
import useForm from '../../hooks/useForm';

const initialValues: LogInValue = {
  profileId: '',
  password: '',
};

function Login() {
  const { values, handleChange } = useForm({ initialValues });
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.profileId || !values.password) {
      return setError('모든 항목을 입력하세요.');
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            아아디
            <input
              type="text"
              name="profileId"
              value={values.profileId}
              placeholder="아이디를 입력해주세요."
              onChange={handleChange}
            />
          </label>
          <label>
            비밀번호
            <input
              type="password"
              name="password"
              value={values.password}
              placeholder="비밀번호를 입력해주세요."
              onChange={handleChange}
            />
          </label>
        </div>
        <div>{error}</div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

export default Login;
