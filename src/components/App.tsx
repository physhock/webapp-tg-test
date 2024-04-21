import {
  createNavigator,
  useBackButtonIntegration,
  useNavigatorIntegration,
} from '@tma.js/react-router-integration';
import { useBackButton, useInitData, useInitDataRaw } from '@tma.js/sdk-react';
import { type FC, useMemo } from 'react';
import {
  Navigate,
  Route,
  Router,
  Routes,
} from 'react-router-dom';

import { routes } from '~/navigation/routes.tsx';

export const App: FC = () => {
  const tmaNavigator = useMemo(createNavigator, []);
  const [location, navigator] = useNavigatorIntegration(tmaNavigator);
  const backButton = useBackButton();

  useBackButtonIntegration(tmaNavigator, backButton);

  const initData = useInitData();
  const initDataRaw = useInitDataRaw();

  console.log('initData: ' + initData + ' initDataRaw: ' + initDataRaw);

  return (
    <Router location={location} navigator={navigator}>
      <Routes>
        {routes.map((route) => <Route key={route.path} {...route} />)}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
