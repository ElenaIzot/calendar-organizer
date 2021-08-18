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
  </>
  );
}

export default App;
