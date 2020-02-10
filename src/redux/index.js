import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import loginReducer from "./loginReducer";
import eventsReducer from "./eventsReducer";
import tourDatesReducer from "./tourDatesReducer";
import judgeInfoReducer from "./judgeInfoReducer";
import judgeDropdownReducer from "./judgeDropdownReducer";
import scoringReducer from "./scoringReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  events: eventsReducer,
  tourDates: tourDatesReducer,
  judgeInfo: judgeInfoReducer,
  judgeDropdown: judgeDropdownReducer,
  scoring: scoringReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
