import React from 'react';
import { Route, Link } from 'react-router-dom';
import AppointmentForm from './components/AppointmentForm';
import CalendarView from './components/CalendarView';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        (Dis)Appointment app
      </header>
      <Link to='create-appt'>Book an appointment</Link>
      <Route exact path='/' component={CalendarView} />
      <Route exact path='/create-appt' component={AppointmentForm} />
    </div>
  );
}

export default App;
