import LoginPage from './components/LoginPage';
import EventPage from './components/EventPage';
import TourDatesPage from './components/TourDatesPage';
import JudgeInfo from './components/JudgeInfo';
import Scoring from './components/Scoring';

export default [
  { path: '/', exact: true, private: false, component: LoginPage },
  { path: '/events', exact: true, private: true, component: EventPage },
  {
    path: '/tour-dates',
    exact: true,
    private: true,
    component: TourDatesPage,
  },
  { path: '/judge-info', exact: true, private: true, component: JudgeInfo },
  { path: '/scoring', exact: true, private: true, component: Scoring },
];
