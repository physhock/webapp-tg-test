import {
  createNavigator,
  useBackButtonIntegration,
  useNavigatorIntegration,
} from '@tma.js/react-router-integration';
import { useBackButton, useMiniApp } from '@tma.js/sdk-react';
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
  const miniApp = useMiniApp();
  console.log('app' + miniApp.isBotInline);

  useBackButtonIntegration(tmaNavigator, backButton);

  return (
    <Router location={location} navigator={navigator}>
      <Routes>
        {routes.map((route) => <Route key={route.path} {...route} />)}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
