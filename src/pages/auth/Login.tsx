import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import useForm from '../../hooks/useForm';
import { loginApi } from '../../features/auth/api';
import styled from '@emotion/styled';
import { AuthError, LabelInput, PrimaryButton } from '../../styles/Common';
import { flexCenter, media } from '../../styles/Mixin';

const Item = styled.label`
  ${LabelInput}
  padding: 10px 0;
  font-size: 0.8rem;
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

const initialValues: LoginValues = {
  profileId: '',
  password: '',
};

function Login() {
  const { values, handleChange, error, setError } = useForm({ initialValues });

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginMutate } = useMutation(
    (loginUser: LoginValues) => loginApi(loginUser),
    {
      onSuccess: ({ status, data }) => {
        if (status === 200) {
          setError('');
          localStorage.setItem('token', data.token);
          queryClient.refetchQueries(['user']);
          navigate('/');
        }
      },
      onError: ({ response }) => {
        setError(
          response.data.message || `서버가 불안정합니다. 다시 시도해주세요.`,
        );
      },
    },
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!values.profileId || !values.password) {
      return setError('모든 항목을 입력하세요.');
    }

    const loginUser: LoginValues = values;
    loginMutate(loginUser);
  };

  return (
    <Div>
      <h1>로그인</h1>
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
            />
          </Item>
          <Item>
            비밀번호
            <input
              type="password"
              name="password"
              value={values.password}
              placeholder="비밀번호를 입력해주세요."
              onChange={handleChange}
            />
          </Item>
        </div>
        <Container>
          <AuthError>{error}</AuthError>
          <Button type="submit">로그인</Button>
        </Container>
      </Form>
    </Div>
  );
}

export default Login;
