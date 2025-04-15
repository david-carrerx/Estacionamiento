import React, { useState } from 'react';
import { registerEntry } from '../services/api';
import { Button, Form, Card, Container, Alert } from 'react-bootstrap';

const EntryForm = () => {
  const [licensePlate, setLicensePlate] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);

    try {
      const response = await registerEntry(licensePlate, vehicleType);
      setMessage(response.message || 'Entrada registrada correctamente');
      setIsSuccess(true);
      setLicensePlate('');
      setVehicleType('');
    } catch (err) {
      setMessage(err.message || 'Error al registrar entrada');
      setIsSuccess(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card style={{ width: '100%', maxWidth: '500px' }} className="shadow p-4">
        <h3 className="text-center mb-4">Registrar Entrada</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Placa del Vehículo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej. ABC-123"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Vehículo</Form.Label>
            <Form.Select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
            >
              <option value="">Seleccione...</option>
              <option value="residente">Residente</option>
              <option value="no_residente">No Residente</option>
              <option value="oficial">Oficial</option>
            </Form.Select>
          </Form.Group>
          <div className="d-grid">
            <Button type="submit" variant="primary">
              Registrar Entrada
            </Button>
          </div>
        </Form>
        {message && (
          <Alert className="mt-4" variant={isSuccess ? 'success' : 'danger'}>
            {message}
          </Alert>
        )}
      </Card>
    </Container>
  );
};

export default EntryForm;
