import { LogIn } from "./LogIn";
import { Validation } from "./Validation";
import { SignUp } from "./SignUp";
import { combineReducers, createStore } from "redux";
import { DropDown } from "./DropDown";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const rootReducer = combineReducers({
  DropDown,
  SignUp,
  Validation,
  LogIn,
});

const persistConfig = {
  key: "islogin",
  storage,
  whitelist: ["LogIn"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export function configureStore() {
  const store = createStore(persistedReducer);
  const persistor = persistStore(store);
  return { store, persistor };
}

export type RootState = ReturnType<typeof rootReducer>;
