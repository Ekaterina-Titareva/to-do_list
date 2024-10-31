import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import ToDoList from "./pages/to-do_list/ToDoList";
import Authentication from "./pages/authentication/Authentication";
import AuthNavigateProvider from "./providers/AuthNavigateProvider";
import { AUTH_PAGE, MAIN_PAGE } from "./utilities/constants";

const App: React.FC = () => {
  return (
    <Router>
      <Provider store={store}>
        <AuthNavigateProvider>
          <Routes>
            <Route path={MAIN_PAGE} element={<ToDoList />} />
            <Route path={AUTH_PAGE} element={<Authentication />} />
          </Routes>
        </AuthNavigateProvider>
      </Provider>
    </Router>
  );
};

export default App;
