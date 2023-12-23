import { FocusEvent, FormEvent, useState } from 'react';
import useForm from '../../hooks/useForm';
import { validation } from '../../utils/regex';

const initialValues: SignUpValue = {
  profileId: '',
  name: '',
  password: '',
  passwordConfirm: '',
};

function Signup() {
  const { values, handleChange } = useForm({ initialValues });
  const [errors, setErrors] = useState<SignUpValue>(initialValues);

  const checkSamePassword = (): string => {
    const { password, passwordConfirm } = values;
    if (password !== passwordConfirm) {
      return '비밀번호와 비밀번호 확인 항목이 서로 일치하지 않습니다.';
    } else {
      return '';
    }
  };

  const checkErrors = () => {
    let newErrors: any = {};

    for (let key in values) {
      const value = values[key as keyof typeof values];
      if (!value) {
        newErrors[key] = '필수 항목입니다.';
      }
    }
    setErrors({ ...errors, ...newErrors });
  };

  const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (!value) {
      return setErrors({ ...errors, [name]: '필수 항목입니다.' });
    }

    if (name === 'passwordConfirm') {
      return setErrors({ ...errors, [name]: checkSamePassword() });
    }

    const message = validation[name as keyof typeof validation](value);
    if (message) {
      if (name === 'password' && values.passwordConfirm) {
        return setErrors({
          ...errors,
          [name]: message,
          passwordConfirm: checkSamePassword(),
        });
      }
      setErrors({ ...errors, [name]: message });
    } else {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (let key in values) {
      const value = values[key as keyof typeof values];
      if (!value) {
        return checkErrors();
      }
    }
  };

  return (
    <div>
      <h1>AYO 시작하기</h1>
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
              onBlur={handleOnBlur}
            />
            <div>{errors.profileId}</div>
          </label>
          <label>
            프로필 이름
            <input
              type="text"
              name="name"
              value={values.name}
              placeholder="프로필로 사용할 이름을 입력해주세요."
              onChange={handleChange}
              onBlur={handleOnBlur}
            />
            <div>{errors.name}</div>
          </label>
          <label>
            비밀번호
            <input
              type="password"
              name="password"
              value={values.password}
              placeholder="비밀번호를 입력해주세요."
              onChange={handleChange}
              onBlur={handleOnBlur}
            />
            <div>{errors.password}</div>
          </label>
          <label>
            비밀번호 확인
            <input
              type="password"
              name="passwordConfirm"
              value={values.passwordConfirm}
              placeholder="위의 비밀번호와 일치해야 합니다."
              onChange={handleChange}
              onBlur={handleOnBlur}
            />
            <div>{errors.passwordConfirm}</div>
          </label>
        </div>
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}

export default Signup;
