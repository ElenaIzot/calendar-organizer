import React from 'react';
import 'react-calendar/dist/Calendar.css';
import './style/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyCalendar from './Components/Calendar';
import { Header } from './Components/Header';

function App() {

  return (<>
    
      <Header />
      <MyCalendar/>
      {/* <Switch>
        <Route exact path='/' component={MyCalendar} />
        <Route exact path='/holiday' component={Holiday} />
        <Route exact path='/event' component={Event} />
        <Route exact path='/note' component={Note} />
      </Switch> */}
    
  </>
  );
}

export default App;
