import Login from './components/pages/Login';
import Events from './components/pages/Events';
import TourDates from './components/pages/TourDates';
import JudgeInfo from './components/pages/JudgeInfo';
import Scoring from './components/pages/Scoring';

const routes = [
  { path: '/', exact: true, private: false, component: Login },
  { path: '/events', exact: true, private: true, component: Events },
  {
    path: '/tour-dates',
    exact: true,
    private: true,
    component: TourDates,
  },
  { path: '/judge-info', exact: true, private: true, component: JudgeInfo },
  { path: '/scoring', exact: true, private: true, component: Scoring },
];

export { routes };
