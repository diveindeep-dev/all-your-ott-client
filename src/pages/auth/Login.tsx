import { FormEvent, useState } from 'react';
import useForm from '../../hooks/useForm';
import styled from '@emotion/styled';
import { AuthError, LabelInput, PrimaryButton } from '../../styles/Common';
import { media } from '../../styles/Mixin';

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
  display: flex;
  flex-direction: column;
  align-items: center;
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
