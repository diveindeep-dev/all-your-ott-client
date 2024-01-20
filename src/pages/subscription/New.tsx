import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import dayjs from 'dayjs';
import { useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { loginUserState } from '../../features/state';
import { addSubscriptionApi } from '../../features/auth/api';
import useForm from '../../hooks/useForm';
import DatePicker from '../../components/calendar/DatePicker';
import { toast } from '../../components/toast';

interface NewSubscriptionProps {
  setAnimationClass: Dispatch<SetStateAction<string>>;
}

const initialValues: SubscriptionInputValues = {
  service: '',
  plan: '',
  price: '',
  startDate: dayjs().format('YYYY-MM-DD'),
};

function NewSubscription({ setAnimationClass }: NewSubscriptionProps) {
  const [option, setOption] = useState('');
  const [date, setDate] = useState(dayjs());
  const { values, handleChange, setValues, resetValues } = useForm({
    initialValues,
  });

  useEffect(() => {
    setValues({ ...values, startDate: date.format('YYYY-MM-DD') });
  }, [date]);

  const setLoginUserState = useSetRecoilState(loginUserState);
  const { mutate: addSubscriptionMutate } = useMutation(
    (newSubscription: SubscriptionInputValues) =>
      addSubscriptionApi(newSubscription),
    {
      onSuccess: ({ data }) => {
        setLoginUserState((prev) => ({
          ...prev!,
          subscription: data.subscription,
        }));
        toast.success('등록되었습니다');
        resetValues();
      },
      onError: ({ response }) => {
        toast.error(response.data.message);
      },
    },
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { service, price, startDate } = values;

    if (!service || !price || !startDate) {
      return toast.error('모든 항목을 입력해주세요.');
    }

    const newSubscription: SubscriptionInputValues = {
      ...values,
    };

    addSubscriptionMutate(newSubscription);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label onClick={() => setOption('service')}>
          <div>
            <div>Service & Plan</div>
            <div>
              {values.service}/{values.plan}
            </div>
          </div>
          {option === 'service' && (
            <>
              <input
                type="text"
                name="service"
                value={values.service}
                placeholder="Service"
                onChange={handleChange}
              />
              <input
                type="text"
                name="plan"
                value={values.plan}
                placeholder="Plan"
                onChange={handleChange}
              />
              <input
                type="number"
                name="price"
                value={values.price}
                placeholder="₩"
                onChange={handleChange}
              />
            </>
          )}
        </label>
        <label onClick={() => setOption('date')}>
          <div>
            <div>First Billing Date</div>
            <div>{date.format('YYYY-MM-DD')}</div>
          </div>
          {option === 'date' && (
            <DatePicker selectedDate={date} setSelectedDate={setDate} />
          )}
        </label>
        <div onClick={() => setAnimationClass('slide-down')}>CANCLE</div>
        <button>SUBMIT</button>
      </form>
    </div>
  );
}

export default NewSubscription;
