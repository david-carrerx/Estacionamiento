import React, { useState } from 'react';
import { registerExit } from '../services/api';
import { Button, Form, Card, Container, Alert } from 'react-bootstrap';

const ExitForm = () => {
  const [licensePlate, setLicensePlate] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSuccess(false);

    try {
      const response = await registerExit(licensePlate);
      setMessage(response.message || 'Salida registrada con éxito');
      setIsSuccess(true);
      setLicensePlate('');
    } catch (error) {
      setMessage(error.message || 'Error al registrar la salida');
      setIsSuccess(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card style={{ width: '100%', maxWidth: '500px' }} className="shadow p-4">
        <h3 className="text-center mb-4">Registrar Salida</h3>
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
          <div className="d-grid">
            <Button type="submit" variant="danger">
              Registrar Salida
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

export default ExitForm;
