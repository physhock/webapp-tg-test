import { type FC, useState } from 'react';
// import { useInitData } from '@tma.js/sdk-react';
import { Calendar } from 'react-calendar';

import { MiniApp } from '@tma.js/sdk';
import { Page } from '~/components/Page/Page.tsx';

import './IndexPage.css';


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const miniApp = new MiniApp({
  backgroundColor: '#000040',
  headerColor: '#000040',
  botInline: false,
  version: '7.0.0',
  postEvent: (event: string, data: any) => {
    console.log(event, data);
  },
  createRequestId: () => {
    return '123';
  }
});

// interface Register {
//   id: string;
//   name: string;
//   phone: string;
//   date: string;
// }

// function getUserRows(user: User): Register {
//   return {
//     id: user.id.toString(),
//     name: user.firstName + ' ' + user.lastName,
//     phone: '',
//     date: ''
//   }
// }

export const IndexPage: FC = () => {
  // const initData = useInitData();
  const [value, onChange] = useState<Value>(new Date());

  // const userRows = useMemo<Register | undefined>(() => {
  //   return initData && initData.user ? getUserRows(initData.user) : undefined;
  // }, [initData]);

  miniApp.sendData('hello');

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
