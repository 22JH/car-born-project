import { combineReducers } from "redux";
import { loginReducer } from "../modules/loginModule";
import { idCheckReducer } from "./idcheckModule";
import { termsofuseReducer } from "./termsOfUseModule";

// 타입 지정
// export type RootState = ReturnType<typeof rootReducer>

export type RootState = {
  termsofuse: {
    privacy: string;
    website: string;
  };
};

const rootReducer = combineReducers({
  login: loginReducer,
  termsofuse: termsofuseReducer,
  useridcheck: idCheckReducer,
});

export default rootReducer;