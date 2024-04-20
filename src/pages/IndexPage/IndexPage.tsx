import { type FC, useMemo, useState } from 'react';
import { useInitData } from '@tma.js/sdk-react';
import { Calendar } from 'react-calendar';

import { User, postEvent } from '@tma.js/sdk';
import { Page } from '~/components/Page/Page.tsx';

import './IndexPage.css';


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface Register {
  id: string;
  name: string;
  phone: string;
  date: string;
}

function getUserRows(user: User): Register {
  return {
    id: user.id.toString(),
    name: user.firstName + ' ' + user.lastName,
    phone: '',
    date: ''
  }
}

export const IndexPage: FC = () => {
  const initData = useInitData();
  const [value, onChange] = useState<Value>(new Date());

  const userRows = useMemo<Register | undefined>(() => {
    return initData && initData.user ? getUserRows(initData.user) : undefined;
  }, [initData]);


  postEvent('web_app_send_data', "123");

  return (
    <Page title="Home Page">
      <p>
        This page is a home page in this boilerplate. You can use the links below to visit other
        pages with their own functionality.
      </p>
      <Calendar onChange={onChange} value={value} />
    </Page>
  );
};
