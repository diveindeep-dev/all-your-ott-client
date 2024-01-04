import { FocusEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import useForm from '../../hooks/useForm';
import { validation } from '../../utils/regex';
import { checkDuplicateId, signUpApi } from '../../features/auth/api';
import styled from '@emotion/styled';
import { LabelInput, PrimaryButton, AuthError } from '../../styles/Common';
import { flexCenter, media } from '../../styles/Mixin';

const Item = styled.label`
  ${LabelInput}
  padding: 10px 0;
  font-size: 0.8rem;
  div {
    text-align: right;
  }
`;

const Button = styled.button`
  ${PrimaryButton}
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;

  ${media.mobile} {
    width: 100%;
  }

  div {
    width: 100%;
  }
`;

const Container = styled.div`
  ${flexCenter}
  flex-direction: column;
  text-align: center;
  margin-top: 20px;
  font-size: 0.9rem;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 20px;

  ${media.mobile} {
    flex-direction: column;
    width: 100%;
  }
`;

const initialValues: SignUpValues = {
  profileId: '',
  name: '',
  password: '',
  passwordConfirm: '',
};

function Signup() {
  const { values, handleChange, error, setError } = useForm({
    initialValues,
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState<SignUpValues>(initialValues);
  const [checked, setChecked] = useState<CheckRes | null>(null);

  const { mutate: signUpMutate } = useMutation(
    (newUser: AuthValues) => signUpApi(newUser),
    {
      onSuccess: ({ status }) => {
        if (status === 201) {
          navigate('/login');
        }
      },
      onError: () => {
        setError(`서버가 불안정합니다. 다시 시도해주세요.`);
      },
    },
  );

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

  const handleOnBlur = async (e: FocusEvent<HTMLInputElement>) => {
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
      if (name === 'profileId') {
        setChecked(null);
      }
      setErrors({ ...errors, [name]: message });
    } else {
      if (name === 'profileId') {
        const response: AxiosResponse<CheckRes> = await checkDuplicateId(
          values.profileId,
        );
        if (response) {
          setChecked(response.data);
        }
      }
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (let key in values) {
      const value = values[key as keyof typeof values];
      if (!value) {
        return checkErrors();
      }
    }
    if (!checked || !checked.isPass) {
      return setErrors({
        ...errors,
        profileId: '아이디를 중복체크해주세요.',
      });
    }

    const newUser: AuthValues = {
      profileId: values.profileId,
      name: values.name,
      password: values.password,
    };

    signUpMutate(newUser);
  };

  return (
    <Div>
      <h1>AYO 시작하기</h1>
      <Form onSubmit={handleSubmit}>
        <div>
          <Item>
            아아디
            <input
              type="text"
              name="profileId"
              value={values.profileId}
              placeholder="아이디를 입력해주세요."
              onChange={handleChange}
              onBlur={handleOnBlur}
            />
            <AuthError isPass={checked ? checked.isPass : false}>
              {errors.profileId || checked?.message}
            </AuthError>
          </Item>
          <Item>
            프로필 이름
            <input
              type="text"
              name="name"
              value={values.name}
              placeholder="프로필로 사용할 이름을 입력해주세요."
              onChange={handleChange}
              onBlur={handleOnBlur}
            />
            <AuthError>{errors.name}</AuthError>
          </Item>
          <Item>
            비밀번호
            <input
              type="password"
              name="password"
              value={values.password}
              placeholder="비밀번호를 입력해주세요."
              onChange={handleChange}
              onBlur={handleOnBlur}
            />
            <AuthError>{errors.password}</AuthError>
          </Item>
          <Item>
            비밀번호 확인
            <input
              type="password"
              name="passwordConfirm"
              value={values.passwordConfirm}
              placeholder="위의 비밀번호와 일치해야 합니다."
              onChange={handleChange}
              onBlur={handleOnBlur}
            />
            <AuthError>{errors.passwordConfirm}</AuthError>
          </Item>
        </div>
        <Container>
          <AuthError>{error}</AuthError>
          <Button type="submit">가입하기</Button>
        </Container>
      </Form>
    </Div>
  );
}

export default Signup;
