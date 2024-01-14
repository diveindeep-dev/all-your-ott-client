import { Dispatch, SetStateAction } from 'react';
import { randomId } from '../../utils/random';
import getErrorMessage from '../../utils/getErrorMessgae';

type SetToastList = Dispatch<SetStateAction<Map<any, any>>>;

class Toaster {
  setToastList: SetToastList = () => {
    return;
  };

  constructor(setState: SetToastList | null) {
    if (setState) this.setToastList = setState;
  }

  add = (item: ToastItem) => {
    this.setToastList((prev) => new Map(prev).set(item.id, item));
  };

  delete = (id: string) => {
    this.setToastList((prev) => {
      const newItems = new Map(prev);
      newItems.delete(id);
      return newItems;
    });
  };

  success(message: ToastItem['message']): void {
    const id = randomId();
    const newItem: ToastItem = {
      type: 'success',
      id,
      message,
    };
    this.add(newItem);
  }
  error(status: ToastItem['message'] | number): void {
    const statusText: string =
      typeof status === 'number' ? getErrorMessage(status).message : status;
    const id = randomId();
    const newItem: ToastItem = {
      type: 'error',
      id,
      message: statusText,
    };
    this.add(newItem);
  }
  warning(message: ToastItem['message']): void {
    const id = randomId();
    const newItem: ToastItem = {
      type: 'warning',
      id,
      message,
    };
    this.add(newItem);
  }
  info(message: ToastItem['message']): void {
    const id = randomId();
    const newItem: ToastItem = {
      type: 'info',
      id,
      message,
    };
    this.add(newItem);
  }
}

export default Toaster;
