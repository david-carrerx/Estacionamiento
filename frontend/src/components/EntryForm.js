// src/components/EntryForm.js
import React, { useState } from 'react';
import { registerEntry } from '../services/api';
import { Button, Form } from 'react-bootstrap';

const EntryForm = () => {
  const [licensePlate, setLicensePlate] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await registerEntry(licensePlate, vehicleType);
    setMessage(response.message || 'Error al registrar la entrada');
  };

  return (
    <div className="container mt-5">
      <h2>Registrar Entrada de Vehículo</h2>
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
        <Form.Group>
          <Form.Label>Tipo de Vehículo</Form.Label>
          <Form.Control
            as="select"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
          >
            <option value="">Seleccione...</option>
            <option value="residente">Residente</option>
            <option value="no_residente">No Residente</option>
            <option value="oficial">Oficial</option>
          </Form.Control>
        </Form.Group>
        <Button type="submit" className="mt-3">Registrar Entrada</Button>
      </Form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default EntryForm;
