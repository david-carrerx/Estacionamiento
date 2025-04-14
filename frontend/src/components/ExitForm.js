import React, { useState } from 'react';
import { registerExit } from '../services/api';
import { Button, Form } from 'react-bootstrap';

const ExitForm = () => {
  const [licensePlate, setLicensePlate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await registerExit(licensePlate);
    setMessage(response.message || 'Error al registrar la salida');
  };

  return (
    <div className="container mt-5">
      <h2>Registrar Salida de Vehículo</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Placa</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese la placa"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" className="mt-3">Registrar Salida</Button>
      </Form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default ExitForm;
