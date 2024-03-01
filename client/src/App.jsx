import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Homepage from "./pages/Homepage";
import Stores from "./pages/Stores";
import Authentication from "./pages/Authentication";
import Store from "./pages/Store";
import Mystore from "./pages/Mystore";
export default function App() {
  return (
    <Provider store={store}>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{ duration: 7500 }}
      />
      <Router>
        <Routes>
          <Route path="/" Component={Homepage} />
          <Route path="/authentication" Component={Authentication} />
          <Route path="/stores/:category" Component={Stores} />
          <Route path="/store/:_id" Component={Store} />
          <Route path="/stores/mystore/:_id" Component={Mystore} />
        </Routes>
      </Router>
    </Provider>
  );
}
