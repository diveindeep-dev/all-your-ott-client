import { useState } from 'react';
import {
  IoIosCheckmarkCircle,
  IoIosClose,
  IoIosCloseCircle,
  IoIosInformationCircle,
  IoIosWarning,
} from 'react-icons/io';
import styled from '@emotion/styled';
import { COLOR, FONT } from '../../styles/Variables';
import { flexCenter } from '../../styles/Mixin';

const Icon = styled.div<ToastBoxStyleProps>`
  ${flexCenter}
  font-size: 1.5rem;
  color: ${({ type }) => COLOR.type[type]};
`;

const Message = styled.div`
  padding: 0 10px;
  font-size: 0.9rem;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
`;

const ProgressBar = styled.div<ToastBoxStyleProps>`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 5px;
  width: 100%;
  background-color: ${({ type }) => COLOR.type[type]};
  animation: progressBar 3s linear forwards;
  transform-origin: left;
  animation-play-state: ${({ isPaused }) => (isPaused ? 'paused' : 'running')};

  @keyframes progressBar {
    0% {
      transform: scaleX(1);
    }
    100% {
      transform: scaleX(0);
    }
  }
`;

const Div = styled.div<ToastBoxStyleProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  width: 70%;
  font-family: ${FONT.body};
  background-color: ${({ type }) => COLOR.taostBg.type[type]};
  border: 1px solid ${({ type }) => COLOR.type[type]};
  margin: 5px;
  border-radius: 10px;
  overflow: hidden;
`;

interface ToastBoxStyleProps {
  type: Toast;
  progress?: number;
  isPaused?: boolean;
}

interface ToastItemProps {
  item: ToastItem;
  handleDelete: () => void;
}

function ToastItem({ item, handleDelete }: ToastItemProps) {
  const { message, type } = item;
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <IoIosCheckmarkCircle />;
      case 'error':
        return <IoIosCloseCircle />;
      case 'warning':
        return <IoIosWarning />;
      case 'info':
      default:
        return <IoIosInformationCircle />;
    }
  };

  const handleExitingAnimationEnd = () => {
    handleDelete();
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <Div
      type={type}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Content>
        <Icon type={type}>{getIcon()}</Icon>
        <Message>{message}</Message>
      </Content>
      <Icon type={type} onClick={handleDelete}>
        <IoIosClose />
      </Icon>
      <ProgressBar
        type={type}
        onAnimationEnd={handleExitingAnimationEnd}
        isPaused={isPaused}
      />
    </Div>
  );
}

export default ToastItem;
