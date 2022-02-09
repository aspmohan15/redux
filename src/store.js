import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const midleware = [thunk];
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...midleware))
);

export default store;
