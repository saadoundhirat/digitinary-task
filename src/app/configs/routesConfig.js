import DigitinaryUtils from '@digitinary/utils';
import { Navigate } from 'react-router-dom';
import pagesConfigs from '../main/pages/pagesConfig';
import settingsConfig from './settingsConfig';

const routeConfigs = [...pagesConfigs];

const routes = [
  ...DigitinaryUtils.generateRoutesFromConfigs(routeConfigs, settingsConfig.defaultAuth),
  {
    path: '/',
    element: <Navigate to="/posts" />,
    auth: settingsConfig.defaultAuth,
  },
  {
    path: 'loading',
    element: <></>,
  },
  {
    path: '*',
    element: <Navigate to="pages/error/404" />,
  },
];

export default routes;
