import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(store);

const root = createRoot(document.getElementById("root"));
root.render(<Provider store={store}><PersistGate loading={null} persistor={persistor}><App /></PersistGate></Provider>);
