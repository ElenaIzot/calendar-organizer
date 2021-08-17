import React from 'react';
import 'react-calendar/dist/Calendar.css';
import './style/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';
import MyCalendar from './Components/Calendar';
import Holiday from './Components/Holiday';
import Event from './Components/Event';
import Note from './Components/Note';
import { Header } from './Components/Header';

function App() {

  return (<>
    <Router>
      <Header />
      <Switch>
        <Route exact path='/' component={MyCalendar} />
        <Route exact path='/holiday' component={Holiday} />
        <Route exact path='/event' component={Event} />
        <Route exact path='/note' component={Note} />
      </Switch>
    </Router>
  </>
  );
}

export default App;
