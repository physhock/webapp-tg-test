import { type FC } from 'react';
// import { useInitData } from '@tma.js/sdk-react';
import { Calendar } from 'react-calendar';

import { MiniApp } from '@tma.js/sdk';
import { Page } from '~/components/Page/Page.tsx';

import './IndexPage.css';
import { useMiniApp } from '@tma.js/sdk-react';


type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const miniApp: MiniApp = useMiniApp();

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
  // const [value, onChange] = useState<Value>(new Date());

  // const userRows = useMemo<Register | undefined>(() => {
  //   return initData && initData.user ? getUserRows(initData.user) : undefined;
  // }, [initData]);

  

  function onChange(value: Value) {
    console.log(value);
    miniApp.sendData('Hello from MiniApp!')
  }

  return (
    <Page title="Home Page">
      <p>
        This page is a home page in this boilerplate. You can use the links below to visit other
        pages with their own functionality.
      </p>
      <Calendar onChange={onChange} />
    </Page>
  );
};
