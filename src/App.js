import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { CoinPage, DashboardPage, TradesPage } from './pages';
import styles from "./App.scss";
import { Header, Sidebar } from './shared/layout';

function App() {
  return (
    <Router>
      <main className={styles.main}>
        <Sidebar />
        <div className={styles.pageWrapper}>
          <Header />
          {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
          <Switch>
            <Route exact path="/">
              <DashboardPage />
            </Route>
            <Route path="/trades">
              <TradesPage />
            </Route>
            <Route path="/coin">
              <CoinPage />
            </Route>
          </Switch>
        </div>
      </main>
    </Router>
  );
}

export default App;
