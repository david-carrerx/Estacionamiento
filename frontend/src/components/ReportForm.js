import React, { useState } from 'react';
import { getReport } from '../services/api';
import { Button, Form, Card, Container, Row, Col, Table, Alert } from 'react-bootstrap';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ReportForm = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [report, setReport] = useState([]);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); 
    try {
      const response = await getReport(from, to);
      if (response.length === 0) {
        setMessage('No records for the selected dates were found');
      } else {
        setReport(response);
      }
    } catch (error) {
      setMessage('Error al obtener el reporte');
    }
  };

  const handleDownloadExcel = () => {
    if (report.length === 0) {
      alert('No hay datos para generar el archivo Excel');
      return;
    }

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(
      report.map((entry) => ({
        'Placa': entry.license_plate,
        'Hora de Entrada': entry.entry_time,
        'Hora de Salida': entry.exit_time,
        'Tiempo Estacionado (min)': entry.total_time_minutes,
        'Tipo': entry.vehicle_type,
        'Cantidad a Pagar ($)': entry.total_amount,
      }))
    );

    XLSX.utils.book_append_sheet(wb, ws, 'Reporte Estacionamiento');
    XLSX.writeFile(wb, 'reporte_estacionamiento.xlsx');
  };

  const handleDownloadPDF = () => {
    if (report.length === 0) {
      alert('No hay datos para generar el PDF');
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Reporte de Estacionamiento', 14, 20);

    const tableColumn = ['Placa', 'Entrada', 'Salida', 'Tiempo (min)', 'Tipo', 'Total ($)'];
    const tableRows = report.map((entry) => [
      entry.license_plate,
      entry.entry_time,
      entry.exit_time,
      entry.total_time_minutes,
      entry.vehicle_type,
      entry.total_amount,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save('reporte_estacionamiento.pdf');
  };

  return (
    <Container className="d-flex justify-content-center align-items-start mt-5">
      <Card style={{ width: '100%', maxWidth: '800px' }} className="shadow p-4">
        <h3 className="text-center mb-4">Generar Reporte de Estacionamiento</h3>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Desde</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group>
                <Form.Label>Hasta</Form.Label>
                <Form.Control
                  type="datetime-local"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="d-grid gap-2">
            <Button type="submit" variant="primary">
              Generar Reporte
            </Button>
          </div>
        </Form>

        {message && (
          <Alert className="mt-4" variant="warning">
            {message}
          </Alert>
        )}

        {report.length > 0 && (
          <div className="mt-5">
            <h4 className="mb-3">Resultados</h4>
            <div style={{ overflowX: 'auto' }}>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Placa</th>
                    <th>Entrada</th>
                    <th>Salida</th>
                    <th>Tiempo</th>
                    <th>Tipo</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {report.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.license_plate}</td>
                      <td>{entry.entry_time}</td>
                      <td>{entry.exit_time}</td>
                      <td>{entry.total_time_minutes} min</td>
                      <td>{entry.vehicle_type}</td>
                      <td>${entry.total_amount}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <Button variant="success" className="me-2" onClick={handleDownloadExcel}>
                Descargar Excel
              </Button>
              <Button variant="danger" onClick={handleDownloadPDF}>
                Descargar PDF
              </Button>
            </div>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default ReportForm;
