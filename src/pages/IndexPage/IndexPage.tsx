import { useMemo, useState, type FC } from 'react';
import { Calendar } from 'react-calendar';

import { Page } from '~/components/Page/Page.tsx';

import './IndexPage.css';
import { useInitData, useMiniApp } from '@tma.js/sdk-react';
import { User } from '@tma.js/sdk';



type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const mapFighterToDates: Map<string, Array<string>> = new Map([
  ['Conor McGregor', ['2024-04-20', '2024-04-19', '2024-04-15']],
  ['Khabib Nurmagomed', ['2024-04-23', '2024-04-17', '2024-04-11']],
  ['Fedor Emelianenko', ['2024-04-24', '2024-04-14', '2024-04-13']]
])

interface Register {
  id: string;
  name: string;
  phone: string;
  date: string;
  fighter: string;
}

function getUserRows(user: User): Register {
  return {
    id: user.id.toString(),
    name: user.firstName + ' ' + user.lastName,
    phone: '',
    date: '',
    fighter: ''
  }
}

function isSameDay(dDate: string, date: Date): boolean {
  return new Date(dDate).getDate() === date.getDate() && new Date(dDate).getMonth() === date.getMonth() && new Date(dDate).getFullYear() === date.getFullYear();
}


export const IndexPage: FC = () => {
  const initData = useInitData();
  const [chosenFighter, setChosenFighter] = useState<string>('');
  const [date, onChange] = useState<Value>(new Date());
  const miniApp = useMiniApp();
  console.log('index' + miniApp.isRequestingPhoneAccess);


  const userRows = useMemo<Register | undefined>(() => {
    return initData && initData.user ? getUserRows(initData.user) : undefined;
  }, [initData]);

  function createButton() {
    const fighters = Array.from(mapFighterToDates.keys());
    return fighters.map((fighter) => {
      return (
        <button onClick={() => setChosenFighter(fighter)}>{fighter}</button>
      )
    })
  }

  function tileDisabled({ date, view }: { date: Date, view: string }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar matches with the date in the map
      return mapFighterToDates.get(chosenFighter)?.some((dDate) => isSameDay(dDate, date)) ? false : true;
    }
    return false;
  }



  return (
    <Page title="Barbershop">
      <p>
        Hello, {userRows?.name}, welcome to the Barbershop! Choose a fighter to book an appointment with:
      </p>
      <div>
        {createButton()}
        {chosenFighter !== '' ? (
          <>
            <Calendar onChange={onChange} value={date} tileDisabled={tileDisabled} />
            <button onClick={() => {
              if (date && userRows) { // Add null check for userRows
                userRows.fighter = chosenFighter;
                userRows.date = date.toString();
                miniApp.sendData(JSON.stringify(userRows)); // Convert userRows to JSON string
              }
            }}>'Book an appointment'</button>
          </>
        ) : null}
      </div>
    </Page>
  );
};


