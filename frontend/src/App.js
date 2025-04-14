import React from 'react';
import EntryForm from './components/EntryForm';
import ExitForm from './components/ExitForm';
import ReportForm from './components/ReportForm';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Container>
      <h1 className="text-center mt-5">Sistema de Estacionamiento</h1>
      <EntryForm />
      <ExitForm />
      <ReportForm />
    </Container>
  );
}

export default App;
