import React from 'react';
import './App.css';
import 'react-calendar/dist/Calendar.css';
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom';
import MyCalendar from './Components/Calendar';
import HolidayPage from './Components/HolidayPage';
import EventPage from './Components/EventPage';
import NotePage from './Components/NotePage';

function App() {

  return (<>
    <Router>
      <header><h3>Календарь</h3></header>
      <Switch>
        <Route exact path='/' component={MyCalendar} />
        <Route exact path='/add/holiday' component={HolidayPage} />
        <Route exact path='/add/event' component={EventPage} />
        <Route exact path='/add/note' component={NotePage} />
      </Switch>
    </Router>
  </>
  );
}

export default App;
