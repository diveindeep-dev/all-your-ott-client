const getErrorMessage = (status: number) => {
  switch (status) {
    case 400:
      return {
        text: 'BAD REQUEST',
        message: '잘못된 요청입니다.',
      };
    case 401:
      return {
        text: 'UNAUTHORIZED',
        message: '아이디 혹은 비밀번호를 정확하게 입력하세요.',
      };
    case 403:
      return {
        text: 'FORBIDDEN',
        message: '권한이 없습니다.',
      };
    case 409:
      return {
        text: 'CONFLICT',
        message: '이미 존재하는',
      };
    case 500:
    default:
      return {
        text: 'SERVER ERROR',
        message: '새로고침을 하거나 잠시 후 다시 접속해 주시기 바랍니다.',
      };
  }
};

export default getErrorMessage;
