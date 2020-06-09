import Login from './components/pages/Login';
import Events from './components/pages/Events';
import TourDates from './components/pages/TourDates';
import JudgeInfo from './components/pages/JudgeInfo';
import Scoring from './components/pages/Scoring';

export default [
  {
    path: `${process.env.PUBLIC_URL}/`,
    exact: true,
    privateRoute: false,
    component: Login,
  },
  { path: '/events', exact: true, privateRoute: true, component: Events },
  {
    path: '/tour-dates',
    exact: true,
    privateRoute: true,
    component: TourDates,
  },
  {
    path: '/judge-info',
    exact: true,
    privateRoute: true,
    component: JudgeInfo,
  },
  { path: '/scoring', exact: true, privateRoute: true, component: Scoring },
];
