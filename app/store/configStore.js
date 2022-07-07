import AsyncStorage from "@react-native-community/async-storage";

import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import { globalInputSettings } from "./reducers/globalInputSettings";
import { userSettings, generateRandomString } from "./reducers/userSettings";
import { domainFormMappings } from "./reducers/domainFormMappings";

import { persistStore, persistReducer } from "redux-persist"
var reducers = combineReducers({
    globalInputSettings: globalInputSettings.reducer,
    userSettings: userSettings.reducer,
    domainFormMappings: domainFormMappings.reducer
});
const appliedMiddleWare = applyMiddleware(thunk);

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};
const persistedReducer = persistReducer(persistConfig, reducers);
export default function configStore(onCompletion) {

    const store = createStore(persistedReducer, appliedMiddleWare);
    persistor = persistStore(store, null, onCompletion);
    return { store, persistor };
}
export { generateRandomString };
