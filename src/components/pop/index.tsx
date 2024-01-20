import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { COLOR } from '../../styles/Variables';
import { SlideDown, SlideUp } from '../../styles/keyframes';

const Div = styled.div`
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  background-color: ${COLOR.subBg};
  transform: translateY(100%);

  &.slide-down {
    animation: ${SlideDown} 0.5s ease-in-out forwards;
  }

  &.slide-up {
    animation: ${SlideUp} 0.5s ease-out forwards;
  }
`;

interface PopProps {
  children: ReactNode;
  animationClass: string;
}

function Pop({ children, animationClass }: PopProps) {
  return (
    <Div id="pop" className={animationClass}>
      {children}
    </Div>
  );
}

export default Pop;
