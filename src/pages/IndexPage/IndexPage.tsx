import { useState, type FC } from 'react';
import { Calendar } from 'react-calendar';

import { Page } from '~/components/Page/Page.tsx';

import './IndexPage.css';
import { useMiniApp, } from '@tma.js/sdk-react';



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

function isSameDay(dDate: string, date: Date): boolean {
  return new Date(dDate).getDate() === date.getDate() && new Date(dDate).getMonth() === date.getMonth() && new Date(dDate).getFullYear() === date.getFullYear();
}

export const IndexPage: FC = () => {
  const [userRegister, setRegister] = useState<Register | null>(null);
  const [chosenFighter, setChosenFighter] = useState<string>('');
  const [date, onChange] = useState<Value>(new Date());
  const miniApp = useMiniApp();
  console.log('index' + miniApp.isRequestingPhoneAccess);

  miniApp.requestContact().then((contact) => {
    let user: Register = {
      id: contact.contact.userId.toString(),
      name: contact.contact.firstName + contact.contact.lastName,
      phone: contact.contact.phoneNumber,
      date: '',
      fighter: ''
    }
    setRegister(user);
  });

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
        Hello, {userRegister?.name}, welcome to the Barbershop! Choose a fighter to book an appointment with:
      </p>
      <div>
        {createButton()}
        {chosenFighter !== '' ? (
          <>
            <Calendar onChange={onChange} value={date} tileDisabled={tileDisabled} />
            <button onClick={() => {

              if (date && userRegister) { // Add null check for userRows
                userRegister.fighter = chosenFighter;
                userRegister.date = date.toString();
                miniApp.sendData(JSON.stringify(userRegister)); // Convert userRows to JSON string
              }
            }}>'Book an appointment'</button>
          </>
        ) : null}
      </div>
    </Page>
  );
};


