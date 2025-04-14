// src/components/ReportForm.js
import React, { useState } from 'react';
import { getReport } from '../services/api';
import { Button, Form } from 'react-bootstrap';

const ReportForm = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [report, setReport] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await getReport(from, to);
    setReport(response);
  };

  return (
    <div className="container mt-5">
      <h2>Generar Reporte de Estacionamiento</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Desde</Form.Label>
          <Form.Control
            type="datetime-local"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Hasta</Form.Label>
          <Form.Control
            type="datetime-local"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" className="mt-3">Generar Reporte</Button>
      </Form>

      {report.length > 0 && (
        <div className="mt-5">
          <h3>Reporte</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Placa</th>
                <th>Tiempo Estacionado</th>
                <th>Tipo</th>
                <th>Cantidad a Pagar</th>
              </tr>
            </thead>
            <tbody>
              {report.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.license_plate}</td>
                  <td>{entry.total_time_minutes} minutos</td>
                  <td>{entry.vehicle_type}</td>
                  <td>${entry.total_amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReportForm;
