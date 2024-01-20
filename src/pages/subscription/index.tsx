import { useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { loginUserState } from '../../features/state';
import { useRecoilValue } from 'recoil';
import NewSubscription from './New';
import Pop from '../../components/pop';

function Subscription() {
  const loginUser = useRecoilValue(loginUserState);
  const [animationClass, setAnimationClass] = useState<string>('');

  return (
    <div>
      <h1>구독</h1>
      <div onClick={() => setAnimationClass('slide-up')}>
        <GoPlus />
        새로운 구독 등록하기
      </div>
      <Pop animationClass={animationClass}>
        {loginUser ? (
          <NewSubscription setAnimationClass={setAnimationClass} />
        ) : (
          <div>로그인을 하시면 구독을 관리할 수 있습니다.</div>
        )}
      </Pop>
    </div>
  );
}

export default Subscription;
